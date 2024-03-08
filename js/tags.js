class Header1 extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 24;
        this.elementName = "h1";
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