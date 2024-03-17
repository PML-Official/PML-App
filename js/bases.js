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
    constructor(name, content) {
        this.name = name;
        this.content = content;
        this.isText = false;
    }
}

class Link extends Tag {
    constructor(hyperlink, nickname, x, y) {
        super();
        this.name = "link";
        this.nickname = nickname;
        this.content = hyperlink;
        this.x = x;
        this.y = y;
        this.isLink = true;
        this.style = new Style();
        this.style.color = blue;
        this.style.underlined = true;
    }
}

class TextTag extends Tag {
    constructor() {
        super();
        this.style = new Style();
        this.text = "";
        this.isText = true;
        this.hyperlinks = [];
        this.hyperlinkPoses = [];
    }
}