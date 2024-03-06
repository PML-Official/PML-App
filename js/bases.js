class Style {
    constructor() {
        this.width = 0;
        this.color = black;
        this.size = 0;
        this.fontSize = 0;
        this.height = 0;
        this.opacity = 0;
        this.backgroundColor = white;
        this.margin = 10;
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
    }
}

class TextTag {
    constructor() {
        this.style = new Style();
        this.text = "";
        this.hyperlink = ""
    }
}