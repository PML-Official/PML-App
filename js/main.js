var fileData = "";
var allPages = []

function setFileData(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader()
        reader.addEventListener('loadend', () => {
            fileData = reader.result;
            parseData();
        });
        reader.readAsText(file);
    }
}

function parseData() {
    var tags = [];

    let buffer = "";
    let scope = 0;
    for (let x = 0; x < fileData.length; x ++) {
        if (fileData[x] == ']') {
            scope --;
        }
        if (scope >= 1) {
            buffer += fileData[x];
        }
        else {
            if (buffer != "") {
                tags.push(buffer);
                buffer = "";
            }
        }
        if (fileData[x] == '[') {
            scope ++;
        }
    }
    alert(tags)
}