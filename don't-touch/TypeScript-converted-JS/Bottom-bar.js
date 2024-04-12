"use strict";
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    const appversionElements = document.querySelectorAll('#appversion-text, #appversion-icon');
    appversionElements.forEach(appversionElement => {
        appversionElement.addEventListener('click', () => {
            const block = document.getElementById('appversion-information');
            if (block) {
                block.style.display = block.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
    (_a = document.getElementById('close-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const block = document.getElementById('appversion-information');
        if (block) {
            block.style.display = 'none';
        }
    });
});
// icon clicking code
//home icon
const homeButton = document.getElementById('home-icon');
homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});
//developer icon
const developerIcon = document.getElementById('developer-icon');
developerIcon.addEventListener('click', () => {
    location.href = 'https://PML-Official.github.io';
});
