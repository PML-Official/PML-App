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

class Img extends Tag {
    constructor(url) {
        super(IMG, url);
        this.isImg = true;
    }
}