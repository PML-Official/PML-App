const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

var fileLines = [];
var fileInput = undefined;
var filePath = "";

function writeToFile(data) {
    fs.writeFileSync(filePath, data, (err) => {
        if (err) {
            alert("some weird random error happened");
        }
    });
}

function setFileData(input) {
    toggleAndHide(['display-pdf', 'textoveriframe'], ['errors', 'textovererrors']);
    if (input == undefined) {
        const content = fs.readFileSync(filePath, 'utf8');
        fileLines = content.split("\n");
        parseData();
    }
    else {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                if (!file.name.endsWith(".pml")) {
                    alert("A non-pml file was selected");
                    window.location.href = "index.html";
                }
                else {
                    var block = document.getElementById('opening-screen');
                    block.style.display = block.style.display === 'none' ? 'block' : 'none';
                    document.getElementById('main-page') .style.display = 'block';
                    document.getElementById('appversion-information').style.display = "none"; 
                    fileLines = reader.result.split("\n");
                    document.getElementById("editor").innerText = reader.result;
                    parseData();
                }

            });
            reader.readAsText(file);
            filePath = file.path;
        }
        else {
            alert("invalid file selected");
            window.location.href = "index.html";
        }
    }
}

function getIdFromTagName(s) {
    let tags = ["p", "h1", "h2", "h3", "img", "link", "h4", "h5", "h6", "text", "sel-check", "sel-text"];
    return tags.indexOf(s);
}


function getStyleFromId(id) {
    const styles = [pStyle, h1Style, h2Style, h3Style, imgStyle, linkStyle, h4Style, h5Style, h6Style, textStyle, checkboxStyle, textboxStyle];
    return styles[id];
}

// checks all the undefined styles in main and overwrites them with sub
function mergeStyle(main, sub) {
    var ret = structuredClone(main);
    if (ret.fontSize == undefined) {
        ret.fontSize = sub.fontSize;
    }
    if (ret.lineGap == undefined) {
        ret.lineGap = sub.lineGap;
    }
    return ret;
}

function placeText(d, text, style, opt) {
    d.fontSize(style.fontSize).lineGap(style.lineGap).fillColor(style.color.name).text(text, options=opt);
}

// thanks internet
function getAllIndexes(str, substring) {
    const indexes = [];
    let index = str.indexOf(substring);
    while (index !== -1) {
        indexes.push(index);
        index = str.indexOf(substring, index + 1);
    }
    return indexes;
}

function setPageNumberVariable(string, num) {
    for (let x = 0; x < string.length; x ++) {
        if (string.substring(x, x+11) == "@pageNumber") {
            return string.substring(0, x) + num + string.substring(x+11);
        }
    }
    return string;
}

// returns the index of the next char seen at an index
function nextOccurance(str, ind, c) {
    for (let x = ind; x < str.length; x ++) {
        if (str[x] == c) {
            return x;
        }
    }
}

// nextOccurance, but relative position
function nextOccuranceRelative(str, ind, c) {
    return nextOccurance(str, ind, c) - ind;
}

// removes all blank spaces at the beginning of a string
function trim(str) {
    let ret = 0;
    for (let x = 0; x < str.length; x ++) {
        if (str[x] != " ") {
            return str.substring(x);
        } 
    }
    return str;
}

function between(str, c1, c2) {
    let buff;
    for (let x = 0; x < str.length; x ++) {
        if (str.substring(x, x + c1.length) == c1) {
            x += c1.length-1;
            buff = "";
        }
        else if (buff != undefined) {
            if (str.substring(x, x + c2.length) == c2) {
                return buff;
            }
            buff += str[x];
        }
    }
    return undefined;
}

function nextChar(str, ind) {
    for (let x = ind; x < str.length; x ++) {
        if (str[x] != " ") {
            return str[x];
        }
    }
}

function isHttps(str) {
    return str.substring(0, 7) == "https://" || str.substring(0, 6) == "http://";
}

function directoryOfFile(str) {
    if (isHttps(str)) {
        return str;
    }
    let ret = "";
    let buffer = "";
    str.split("").forEach(char => {
        buffer += char;
        if (char == "\\") {
            ret += buffer;
            buffer = "";
        }
    });
    return ret;
}

function parseData() {
    const doc = new PDFDocument();
    doc.info.Producer = "PDF Markup Language (PML)";
    doc.initForm();

    var currentPage = 0;
    var pageStyle = new Style();
    var allPages = [];
    pageStyle.margin = 40;

    let buffer = "";

    let pthScope = 0;
    let brktScope = 0;
    let brcsScope = 0;
    let inComment = false;
    let parsingStyle = false;
    let inHeader = false;
    let inFooter = false;
    let headerTags = [];
    let footerTags = [];
    let styleString = "";
    let styleTagName = "";
    let styleTagContent = "";
    for (let x = 0; x < fileLines.length; x ++) {
        for (let y = 0; y < fileLines[x].length; y ++) {
            if (fileLines[x][y] == '~') {
                inComment = !inComment;
            }
            if (!inComment) {
                if (fileLines[x][y] == ']') {
                    brktScope --;
                }
                if (fileLines[x][y] == '}') {
                    brcsScope --;
                    /*if (inHeader && brcsScope == 0) {
                        inHeader = false;
                    }
                    else if (inFooter && brcsScope == 0) {
                        inFooter = false;
                    }*/
                }
                if (fileLines[x][y] == ')') {
                    pthScope --;
                }
                if (fileLines[x].substring(y, y+5) == "style") {
                    parsingStyle = true;
                }
                else if (fileLines[x].substring(y, y+6) == "header") {
                    inHeader = true;
                }
                else if (fileLines[x].substring(y, y+6) == "footer" && (nextChar(fileLines[x], y+7) == "{")) {
                    inFooter = true;
                }
                else if (parsingStyle) {
                    parsingStyle = false;
                    if (pthScope != 0) {
                        styleString += fileLines[x][y];
                    }
                    else {
                        if (styleString != "") {
                            // parse style here
                            for (let s = 0; s < styleString.length; s ++) {
                                pthScope = 0;
                                brcsScope = 0;
                                if (styleString[s] == '{') {
                                    brcsScope ++;
                                }
                                else if (styleString[s] == '(') {
                                    pthScope ++;
                                }
                                if (styleString[s] == '}') {
                                    brcsScope --;
                                }
                                else if (styleString[s] == ')') {
                                    pthScope --;
                                }
                                if (brcsScope == 0 && styleString[s] != " ") {
                                    styleTagName += styleString[s];
                                }
                                else if (brcsScope == 1) {
                                    /*alert(styleTagName);
                                    if (pthScope >= 2) {
                                        styleTagContent += styleString[s];
                                    }
                                    else if (styleTagContent != "") {
                                        alert(styleTagContent);
                                        parsingStyle = false;
                                    }*/
                                } 
                            }
                        }
                    }
                }
                else if (brktScope >= 1 || (brcsScope >= 1)) {
                    buffer += fileLines[x][y];
                }
                else {
                    if (buffer != "") {
                        if (fileLines[x][y] == '}') {
                            if (!inHeader) {
                                if (buffer.split("Page").length != 1) {
                                    if (currentPage != 0) {
                                        allPages.push(currentPage);
                                    }
                                    currentPage = new Page();
                                }
                            }
                            inHeader = false;
                        }
                        else {
                            if (buffer.split(":").length == 1) {
                                if (buffer == "nl") {
                                    currentPage.tags.push(new NewLine(1));
                                }
                                else {
                                    alert("error at " + parseInt(x) + ":" + parseInt(y));
                                }
                            }
                            else {
                                let tagName = trim(buffer.split(":")[0]);
                                let tagContent = trim(buffer.split(":")[1]);
                                for (let z = 1; z < buffer.split(":").length-1; z ++) {
                                    tagContent += ":" + buffer.split(":")[z+1];
                                }
                                if (tagName == "meta-name") {
                                    doc.info.Title = tagContent;
                                }
                                else if (tagName == "meta-author") {
                                    doc.info.Author = tagContent;
                                }
                                else if (tagName == "meta-description") {
                                    doc.info.Subject = tagContent;
                                }
                                else if (tagName == "meta-keywords") {
                                    doc.info.Keywords = tagContent;
                                }
                                else if (currentPage == 0) {
                                    alert("page not created yet");
                                }
                                else {
                                    if (textTagNames.includes(tagName)) {
                                        var line = [];
                                        var linkPoses = getAllIndexes(tagContent, "link(");
                                        var textBuffer = "";
                                        var linkBuffer = "";
                                        var pushToTag = 0;
                                        for (let z = 0; z < tagContent.length; z ++) {
                                            if (linkPoses.includes(z)) {
                                                line.push(new TextTag(getIdFromTagName(tagName), textBuffer));
                                                linkBuffer = tagContent.substring(z+5, nextOccurance(tagContent, z+5, ")"));
                                                line.push(new Link(linkBuffer.split(", ")[0], linkBuffer.split(", ")[1]));
                                                textBuffer = "";
                                                z += nextOccuranceRelative(tagContent, z, ")");
                                            }
                                            else {
                                                textBuffer += tagContent[z];
                                            }
                                        }
                                        if (textBuffer != "") {
                                            line.push(new TextTag(getIdFromTagName(tagName), textBuffer));
                                        }
                                        pushToTag = new TextLine(line);
                                    }
                                    else if (tagName == "sel-check") {
                                        pushToTag = new Checkbox(tagContent);
                                    }
                                    else if (tagName == "sel-text") {
                                        pushToTag = new Textbox(tagContent);
                                    }
                                    else if (tagName == "img") {
                                        pushToTag = new Img(between(tagContent, "local(", ")"), (between(tagContent, "alt(", ")") == undefined ? "image" : between(tagContent, "alt(", ")")));
                                    }
                                    else if (tagName == "nl") {
                                        pushToTag = new NewLine(tagContent);
                                    }
                                    if (inHeader) {
                                        currentPage.header.push(pushToTag);
                                    }
                                    else if (inFooter) {
                                        currentPage.footer.push(pushToTag);
                                    }
                                    else {
                                        currentPage.tags.push(pushToTag);
                                    }
                                }
                            }
                        }
                        buffer = "";
                    }
                    else {

                    }
                }
                if (fileLines[x][y] == '[') {
                    brktScope ++;
                }
                if (fileLines[x][y] == '(') {
                    pthScope ++;
                }
                if (fileLines[x][y] == '{') {
                    brcsScope ++;
                }
            }
        }
    }
    allPages.push(currentPage);
    for (let x = 0; x < allPages.length; x ++) {
        allPages[x].tags = allPages[x].header.concat(allPages[x].tags);
        allPages[x].tags = allPages[x].tags.concat(allPages[x].footer);
        for (let y = 0; y < allPages[x].tags.length; y ++) {
            let currTag = allPages[x].tags[y];
            if (currTag.lineOfText) {
                let overrideId = undefined;
                for (let z = 0; z < currTag.elements.length; z ++) {
                    let s = new Style();
                    const options = {
                        link: null,
                        continued: z != (currTag.elements.length - 1),
                        underline: false
                    };
                    if (currTag.elements[z].id == LINK) {
                        options.link = currTag.elements[z].hyperlink;
                        s = mergeStyle(linkStyle, (overrideId == undefined ? pStyle : getStyleFromId(overrideId)));
                    }
                    else {
                        overrideId = currTag.elements[z].id;
                        s = getStyleFromId(currTag.elements[z].id);
                    }
                    options.underline = s.underlined;
                    placeText(doc, setPageNumberVariable(currTag.elements[z].text, x+1), s, options);
                }
            }
            else {
                currTag.text = setPageNumberVariable(currTag.text);
                if (currTag.id == IMG) {
                    if (fs.existsSync(directoryOfFile(filePath) + currTag.text)) {
                        doc.image(directoryOfFile(filePath) + currTag.text, doc.x, doc.y, { width: 200, alt: currTag.alt });
                    }
                    else {
                        alert("invalid img selected");
                    }
                }
                else if (currTag.id == CHECKBOX) {
                    doc.fontSize(checkboxStyle.fontSize).lineGap(checkboxStyle.lineGap).text(currTag.text, doc.x, doc.y, {continued: false});
                    doc.x += doc.widthOfString(currTag.text) + 10;
                    doc.y -= doc.heightOfString(currTag.text);
                    doc.formCheckbox(currTag.text, doc.x, doc.y, checkboxStyle.width, checkboxStyle.height);
                    doc.y += 20;
                    doc.x -= doc.widthOfString(currTag.text) + 10;
                }
                else if (currTag.id == TEXTBOX) {
                    doc.fontSize(textboxStyle.fontSize).lineGap(textboxStyle.lineGap).text(currTag.text, doc.x, doc.y, {continued: false});
                    doc.x += doc.widthOfString(currTag.text) + 10;
                    doc.y -= doc.heightOfString(currTag.text);
                    doc.formText(currTag.text, doc.x, doc.y, textboxStyle.width, textboxStyle.height, {multiline: true});
                    doc.y += 20;
                    doc.x -= doc.widthOfString(currTag.text) + 10;
                }
                else if (currTag.id == NEWLINE) {
                    for (let x = 0; x < currTag.amt; x ++) {
                        doc.moveDown();
                   }
                }
            }
        }
        if (x != allPages.length - 1) {
            doc.addPage({ margin: pageStyle.margin });
            pageY = pageStyle.topMargin;
        }
    }

    const writeStream = fs.createWriteStream('output.pdf');
    doc.pipe(writeStream);
    doc.end();

    writeStream.addListener('finish', () => {
        document.getElementById("display-pdf").remove();
        const iframe = document.createElement('iframe');
        iframe.id = "display-pdf";
        iframe.src = "output.pdf";
        document.getElementsByClassName("iframe-contain")[0].appendChild(iframe);
    });
}