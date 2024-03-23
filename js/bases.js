const PARAGRAPH = 0;
const HEADER1 = 1;
const HEADER2 = 2;
const HEADER3 = 3;
const IMG = 4;
const LINK = 5;

const textTagNames = ["p", "h1", "h2", "h3"];

class Style {
    constructor() {
        this.width = 0;
        this.color = black;
        this.size = 0;
        this.fontSize = undefined;
        this.height = 0;
        this.opacity = 0;
        this.backgroundColor = white;
        this.margin = 1;
        this.topMargin = 20;
        this.botMargin = 20;
        this.lineGap = undefined;
        this.underlined = false;
    }
}

class Page {
    constructor() {
        this.tags = [];
        this.pageNum = 0;
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
    }
}

class TextLine {
    constructor(line) {
        this.elements = line;
        this.lineOfText = true;
    }
}