const PARAGRAPH = 0;
const HEADER1 = 1;
const HEADER2 = 2;
const HEADER3 = 3;
const IMG = 4;
const LINK = 5;
const HEADER4 = 6;
const HEADER5 = 7;
const HEADER6 = 8;
const TEXT = 9;
const CHECKBOX = 10;
const TEXTBOX = 11;
const NEWLINE = 12;

const textTagNames = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "text"];

class Style {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.color = "black";
        this.size = 0;
        this.fontSize = undefined;
        this.height = 0;
        this.opacity = 0;
        this.backgroundColor = "white";
        this.margin = 1;
        this.topMargin = 20;
        this.botMargin = 20;
        this.lineGap = 10;
        this.underlined = false;
    }
    setAttrOfStr(str, val) {
        if (str == "fontsz") {
            this.fontSize = val;
        }
        else if (str == "color") {
            this.color = val;
        }
        else if (str == "lineGap") {
            this.lineGap = val;
        }
        else if (str == "backgroundColor") {
            this.backgroundColor = val;
        }
        else if (str == "width") {
            this.width = val;
        }
        else if (str == "height") {
            this.height = val;
        }
    }
}

class Page {
    constructor() {
        this.tags = [];
        this.pageNum = 0;
        this.header = [];
        this.footer = [];
        this.style = 0;
    }
}

class Tag {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

class TextTag extends Tag {
    constructor(id, text) {
        super(id, text);
        this.isBold = false;
        this.isUnderlined = false;
        this.isStrikethrough = false;
        this.isItalicied = false;
    }
}

class TextLine {
    constructor(line) {
        this.elements = line;
        this.lineOfText = true;
    }
}