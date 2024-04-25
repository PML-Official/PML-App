"use strict";
// text editor scroll
const textEditorScroll = document.getElementById('editor');
textEditorScroll.addEventListener('scroll', function () {
    if (textEditorScroll.scrollTop > 0) {
        textEditorScroll.style.borderTop = '1px solid grey';
    }
    else {
        textEditorScroll.style.borderTop = 'none';
    }
});
// width change
window.onresize = function () {
    const container = document.querySelector('.resizeable');
    const contents = container.querySelectorAll('.container');
    contents.forEach(function (content) {
        const containerWidth = container.offsetWidth;
        const contentWidth = content.offsetWidth;
        const newContentWidth = containerWidth * (contentWidth / containerWidth);
        content.style.width = newContentWidth + 'px';
    });
};
// switching tabs between Preview and Errors
// Window onload
window.onload = () => {
    // Get references to the buttons and set initial properties
    const previewButton = document.getElementById('previewbutton');
    const errorsButton = document.getElementById('errorsbutton');
    previewButton.disabled = true;
    previewButton.style.opacity = '0.7';
    previewButton.style.cursor = 'default';
    errorsButton.disabled = false;
    errorsButton.style.opacity = '1';
    errorsButton.style.cursor = 'pointer';
    // Add event listener for preview button click
    previewButton.addEventListener('click', () => {
        toggleAndHide(['display-pdf', 'textoveriframe'], ['errors', 'textovererrors']);
        toggleButtonState('previewbutton', 'errorsbutton');
    });
    // Add event listener for errors button click
    errorsButton.addEventListener('click', () => {
        toggleAndHide(['errors', 'textovererrors'], ['display-pdf', 'textoveriframe']);
        toggleButtonState('errorsbutton', 'previewbutton');
    });
};
// Disabling buttons
let lastClickedButtonId = null;
function toggleButtonState(clickedButtonId, otherButtonId) {
    if (lastClickedButtonId === clickedButtonId) {
        return;
    }
    const clickedButton = document.getElementById(clickedButtonId);
    const otherButton = document.getElementById(otherButtonId);
    clickedButton.disabled = true;
    clickedButton.style.opacity = '0.7';
    clickedButton.style.cursor = 'default';
    otherButton.disabled = false;
    otherButton.style.opacity = '1';
    otherButton.style.cursor = 'pointer';
    lastClickedButtonId = clickedButtonId;
}
// Showing and hiding elements
function toggleAndHide(elementsToShow, elementsToHide) {
    toggleVisibility(elementsToShow);
    hideElements(elementsToHide);
}
function toggleVisibility(elementIds) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('hidden');
        }
    });
}
function hideElements(elementIds) {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
        }
    });
}
;
// Pressing Enter
function getCaretCharacterOffsetWithin(element) {
    return 0;
}
function handleKeyDown(event) {
    var _a;
    if (event.key === 'Enter') {
        const selection = window.getSelection();
        const range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
        if (range) {
            const br = document.createElement('br');
            range.insertNode(br);
            range.setStartAfter(br);
            range.setEndAfter(br);
            range.collapse(false);
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
            event.preventDefault();
        }
    }
    if (event.key === 'Backspace') {
        const selection = window.getSelection();
        const range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
        if (range) {
            const currentLineText = range.startContainer.textContent;
            const currentLineOffset = range.startOffset;
            if (436 === getCaretCharacterOffsetWithin(range.startContainer)) {
                const prevNode = range.startContainer.previousSibling;
                if (prevNode) {
                    (_a = prevNode.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(prevNode);
                    event.preventDefault();
                }
            }
        }
    }
}
function handleInput(event) {
    const inputEvent = event;
    const content = inputEvent.target.textContent;
    if ((content === null || content === void 0 ? void 0 : content.endsWith('<br>')) || (content === null || content === void 0 ? void 0 : content.endsWith('<br><br>'))) {
        const range = document.createRange();
        const selection = window.getSelection();
        if (selection) {
            range.selectNodeContents(inputEvent.target);
            range.collapse(false);
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        }
    }
}
const contentDiv = document.getElementById('contentDiv');
if (contentDiv) {
    contentDiv.addEventListener('keydown', handleKeyDown);
    contentDiv.addEventListener('input', handleInput);
};

// Preventing automatically adding the period after sentences

document.getElementById('editor').addEventListener('keydown', function(event) {
    if (event.key === ' ' && event.getModifierState('Shift')) {
        event.preventDefault();
    }
});

// Adding closing parenthasy automatically
/*
document.getElementById('editor').addEventListener('input', function(event) {
    const selection = window.getSelection();
    const cursorPos = selection.anchorOffset;
    const text = this.textContent;

    if (event.data === '(') {
        event.preventDefault();
        const beforeCursor = text.slice(0, cursorPos);
        const afterCursor = text.slice(cursorPos);
        this.textContent = beforeCursor + '()' + afterCursor;
        selection.collapse(this.firstChild, cursorPos + 1);
    }
});
*/