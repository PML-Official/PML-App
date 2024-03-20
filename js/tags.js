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

class Header4 extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 23;
        this.style.lineGap = 10;
        this.elementName = "h4";
    }
}

class Header5 extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 20;
        this.style.lineGap = 10;
        this.elementName = "h5";
    }
}

class Header6 extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 18;
        this.style.lineGap = 10;
        this.elementName = "h6";
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

class Text extends TextTag {
    constructor(text) {
        super();
        this.text = text;
        this.style.fontSize = 16;
        this.elementName = "text"
    }
}