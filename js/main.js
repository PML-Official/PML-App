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
                fileLines = reader.result.split("\n");
                document.getElementById("editor").innerText = reader.result;
                parseData();
            });
            reader.readAsText(file);
            filePath = file.path;
        }
        else {
            alert("invalid file selected");
        }
    }
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

function nextOccurance(str, ind, c) {
    for (let x = ind; x < str.length; x ++) {
        if (str[x] == c) {
            return x;
        }
    }
}

function parseData() {
    var currentPage = 0;
    var pageStyle = new Style();
    var allPages = [];

    pageStyle.margin = 40;
    const doc = new PDFDocument();

    let buffer = "";

    let pthScope = 0;
    let brktScope = 0;
    let brcsScope = 0;
    let inComment = false;
    let parsingStyle = false;
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
                }
                if (fileLines[x][y] == ')') {
                    pthScope --;
                }
                if (fileLines[x].substring(y, y+5) == "style") {
                    parsingStyle = true;
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
                else if (brktScope >= 1 || brcsScope >= 1) {
                    buffer += fileLines[x][y];
                }
                else {
                    if (buffer != "") {
                        if (fileLines[x][y] == '}') {
                            if (buffer.split("Page").length != 1) {
                                if (currentPage != 0) {
                                    allPages.push(currentPage);
                                }
                                currentPage = new Page();
                            }
                        }
                        else {
                            if (buffer.split(":").length == 1) {
                                alert("error at " + parseInt(x) + ":" + parseInt(y));
                            }
                            else {
                                let tagName = buffer.split(":")[0];
                                let tagContent = buffer.split(":")[1];
                                for (let z = 1; z < buffer.split(":").length-1; z ++) {
                                    tagContent += ":" + buffer.split(":")[z+1];
                                }
                                alert("cpmt: "+ tagContent)
                                
                                if (currentPage == 0) {
                                    alert("page not created yet");
                                }
                                else {
                                    let links = [];
                                    let linkBuffer = "";
                                    let pushTag = new Tag();
                                    if (tagContent.includes("link(")) {
                                        for (let s = 0; s < getAllIndexes(tagContent, "link(").length; s ++) {
                                            for (let z = getAllIndexes(tagContent, "link(")[s] + 5; z < tagContent.length; z ++) {
                                                if (tagContent[z] == ")") {
                                                    break;
                                                }
                                                linkBuffer += tagContent[z];
                                            }
                                            links.push(new Link(linkBuffer.substring(5).split(", ")[0], linkBuffer.substring(5).split(", ")[1], doc.x, doc.y));
                                            linkBuffer = "";
                                        }
                                    }
                                    if (tagName == "h1") {
                                        pushTag = new Header1(tagContent);
                                        pushTag.hyperlinks = links;
                                        pushTag.hyperlinkPoses = getAllIndexes(tagContent, "link(");
                                    }
                                    else if (tagName == "h2") {
                                        pushTag = new Header2(tagContent);
                                        pushTag.hyperlinks = links;
                                        pushTag.hyperlinkPoses = getAllIndexes(tagContent, "link(");
                                    }
                                    else if (tagName == "h3") {
                                        pushTag = new Header3(tagContent);
                                        pushTag.hyperlinks = links;
                                        pushTag.hyperlinkPoses = getAllIndexes(tagContent, "link(");
                                    }
                                    else if (tagName == "p") {
                                        pushTag = new P(tagContent);
                                        pushTag.hyperlinks = links;
                                        pushTag.hyperlinkPoses = getAllIndexes(tagContent, "link(");
                                    }
                                    currentPage.tags.push(pushTag);
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
        for (let y = 0; y < allPages[x].tags.length; y ++) {
            let currTag = allPages[x].tags[y];
            if (currTag.isText) {
                if (currTag.hyperlinks != []) {
                    for (let z = 0; z < currTag.hyperlinkPoses.length; z ++) {
                        //currTag.text = currTag.text.slice(0, currTag.hyperlinkPoses[z]) + currTag.hyperlinks[z].nickname + currTag.text.slice(nextOccurance(currTag.text, currTag.hyperlinkPoses[z], ")"))
                    }
                    let prevLinkPos = 0;
                    let lBreak = false;
                    doc.lineGap(currTag.style.lineGap).fontSize(currTag.style.fontSize).text("", {lineBreak: lBreak});
                    for (let s = 0; s < currTag.hyperlinks.length; s ++) {
                        //doc.lineGap(currTag.style.lineGap).fontSize(currTag.style.fontSize).text(currTag.text.substring(s == 0 ? 0 : currTag.hyperlinkPoses[s], s == currTag.hyperlinks.length ? currTag.text.length : currTag.hyperlinkPoses[s+1]));
                        doc.text(currTag.text.substring(prevLinkPos, currTag.hyperlinkPoses[s]), {lineBreak: s == currTag.hyperlinks.length-1 ? true : false});
                        doc.link(doc.x, doc.y, 50, 50, currTag.hyperlinks[s].content);
                        prevLinkPos = currTag.hyperlinkPoses[s];
                    }
                    doc.lineGap(currTag.style.lineGap).fontSize(currTag.style.fontSize).text(currTag.text.substring(prevLinkPos, currTag.text.length-1));
                }
                else {
                    alert("addin " + currTag.text);
                    doc.lineGap(currTag.style.lineGap).fontSize(currTag.style.fontSize).text(currTag.text);
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
        iframe.width = "800px";
        iframe.height = "600px";
        iframe.id = "display-pdf";
        iframe.src = "output.pdf";
        document.getElementsByClassName("iframe-contain")[0].appendChild(iframe);
    });
}