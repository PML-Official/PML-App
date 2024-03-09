const PDFDocument = require('pdfkit');
const fs = require('fs');

var fileLines = [];
var allPages = [];

function setFileData(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            fileLines = reader.result.split("\n");
            parseData();
        });
        reader.readAsText(file);
    }
}

function setTextEditor() {
    fileLines = document.getElementById("runbutton").value.split("\n");
    parseData();
}

function parseData() {
    var currentPage = 0;
    var pageStyle = new Style();
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
                                if (brcsScope == 0 && styleString[s] != " ") {
                                    styleTagName += styleString[s];
                                }
                                else if (brcsScope == 1) {
                                    alert(styleTagName);
                                } 
                            }
                            parsingStyle = false;
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
                                
                                if (currentPage == 0) {
                                    alert("page not created yet");
                                }
                                else {
                                    if (tagName == "h1") {
                                        currentPage.tags.push(new Header1(tagContent));
                                        
                                    }
                                    else if (tagName == "p") {
                                        currentPage.tags.push(new P(tagContent));
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
        for (let y = 0; y < allPages[x].tags.length; y ++) {
            let currTag = allPages[x].tags[y];
            if (currTag.isText) {
                doc.lineGap(currTag.style.lineGap).fontSize(currTag.style.fontSize).text(currTag.text);
            }
        }
        if (x != allPages.length - 1) {
            doc.addPage({ margin: pageStyle.margin });
            pageY = pageStyle.topMargin;
        }
    }
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.end();

    document.getElementById("display-pdf").style.display = "block";
}