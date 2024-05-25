// I restructured everything, here's where you can edit the styles. I accidentally overwrote
// the fontsizes, so you'll have to retweak those.

const h1Style = new Style();
h1Style.fontSize = 30;
h1Style.lineGap = 10;

const h2Style = new Style();
h2Style.fontSize = 28;
h2Style.lineGap = 10;

const h3Style = new Style();
h3Style.fontSize = 26;
h3Style.lineGap = 10;

const h4Style = new Style();
h4Style.fontSize = 24;
h4Style.lineGap = 10;

const h5Style = new Style();
h5Style.fontSize = 22;
h5Style.lineGap = 10;

const h6Style = new Style();
h6Style.fontSize = 20;
h6Style.lineGap = 10;

const pStyle = new Style();
pStyle.fontSize = 16;
pStyle.lineGap = 5;

const imgStyle = new Style();
imgStyle.color = "blue";

const linkStyle = new Style();
linkStyle.color = "blue";
linkStyle.underlined = true;

const textStyle = new Style();
textStyle.fontSize = 16;
textStyle.lineGap = 5;

const checkboxStyle = new Style();
checkboxStyle.fontSize = 16;
checkboxStyle.lineGap = 5;
checkboxStyle.width = 20;
checkboxStyle.height = 20;

const textboxStyle = new Style();
textboxStyle.fontSize = 16;
textboxStyle.lineGap = 5;
textboxStyle.width = 200;
textboxStyle.height = 20;

const pageStyle = new Style();
pageStyle.margin = 40;
pageStyle.backgroundColor = "white";

function stringToStyle(str) {
    if (str == "h1") {
        return h1Style;
    }
    if (str == "h2") {
        return h2Style;
    }
    if (str == "h3") {
        return h3Style;
    }
    if (str == "h4") {
        return h4Style;
    }
    if (str == "h5") {
        return h5Style;
    }
    if (str == "h6") {
        return h6Style;
    }
    if (str == "p") {
        return pStyle;
    }
    if (str == "page") {
        return pageStyle;
    }
}
const styleStringList = {"h1": h1Style, "h2": h2Style, "h3": h3Style, "h4": h4Style, "h5": h5Style, "h6": h6Style, "p": pStyle};