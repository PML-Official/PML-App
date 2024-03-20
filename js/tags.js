class Header1 extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 30;
        this.style.lineGap = 10;
        this.elementName = "h1";
    }
}

class Header2 extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 28;
        this.style.lineGap = 10;
        this.elementName = "h2";
    }
}

class Header3 extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 26;
        this.style.lineGap = 10;
        this.elementName = "h3";
    }
}

class P extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 16;
        this.elementName = "p";
    }
}