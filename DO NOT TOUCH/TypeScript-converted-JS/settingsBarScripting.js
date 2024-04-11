"use strict";
// this is the script for the settings. includes all funtionality and button clicks ect.
var _a;
//script for active buttons
function toggleButton(button, showElements, hideElements) {
    var buttons = document.querySelectorAll('.sidebar-buttons');
    buttons.forEach(function (btn) {
        btn.classList.remove('active-buttons');
    });
    button.classList.add('active-buttons');
    toggleAndHideSections(showElements, hideElements);
}
// script for switching tabs
function toggleAndHideSections(showElements, hideElements) {
    visibilityOn(showElements);
    hideElements.forEach(function (id) {
        if (id !== 'leftnav') {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('hidden');
            }
        }
    });
}
function visibilityOn(elementIds) {
    elementIds.forEach(function (id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('hidden');
        }
    });
}
function hideElements(elementIds) {
    elementIds.forEach(function (id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
        }
    });
}
;
// for opening settings tab
(_a = document.getElementById('settings-text')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const block = document.getElementById('settings');
    if (block) {
        block.style.display = block.style.display === 'none' ? 'block' : 'none';
        if (block.style.display === 'block') {
            block.classList.add('animate');
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    (_a = document.getElementById('close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const block = document.getElementById('settings');
        if (block) {
            block.style.display = 'none';
        }
    });
});
function restoreToDefaults() {
    alert("Restore Clicked TESt TET AGAIN");
    console.log("Settings Restored to Default");
}
;
function settingsSaveButton() {
    alert("Save bttn clicked!");
    console.log("Settings Saved");
}
;
