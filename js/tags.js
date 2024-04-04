class Header1 extends TextTag {
    constructor(text) {
        super(HEADER1, text);
    }
}

class Header2 extends TextTag {
    constructor(text) {
        super(HEADER2, text);
    }
}

class Header3 extends TextTag {
    constructor(text) {
        super(HEADER3, text);
    }
}

class Header4 extends TextTag {
    constructor(text) {
        super(HEADER4, text);
    }
}

class Header5 extends TextTag {
    constructor(text) {
        super(HEADER5, text);
    }
}

class Header6 extends TextTag {
    constructor(text) {
        super(HEADER6, text);
    }
}

class P extends TextTag {
    constructor(text) {
        super(PARAGRAPH, text);
    }
}

class Link extends TextTag {
    constructor(hyperlink, nickname) {
        super(LINK, nickname);
        this.hyperlink = hyperlink;
    }
}

class Text extends TextTag {
    constructor(text) {
        super(TEXT, text);
    }
}

class Img extends Tag {
    constructor(url, alt) {
        super(IMG, url);
        this.isImg = true;
        this.alt = alt;
    }
}

class Checkbox extends Tag {
    constructor(label) {
        super(CHECKBOX, label);
    }
}

class Textbox extends Tag {
    constructor(label) {
        super(TEXTBOX, label);
    }
}