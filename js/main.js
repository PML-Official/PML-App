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

function parseData() {
    var currentPage = 0;

    let buffer = "";
    let scope = 0;
    let inComment = false;
    for (let x = 0; x < fileLines.length; x ++) {
        for (let y = 0; y < fileLines[x].length; y ++) {
            if (fileLines[x][y] == '~') {
                inComment = !inComment;
            }
            if (!inComment) {
                if (fileLines[x][y] == '{' && scope == 0) {
                    buffer = "";
                    scope ++;
                }
                if (fileLines[x][y] == ']' || fileLines[x][y] == '}') {
                    scope --;
                }
                if (scope >= 1) {
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
    
                                if (tagName == "h1") {
                                    if (currentPage == 0) {
                                        alert("page not created yet");
                                    }
                                    else {
                                        currentPage.tags.push(new Header1(tagContent));
                                    }
                                }
                            }
                        }
                        buffer = "";
                    }
                }
                if (fileLines[x][y] == '[') {
                    scope ++;
                }
            }
        }
    }
    allPages.push(currentPage);
    alert(allPages[0].tags[0].text);
}