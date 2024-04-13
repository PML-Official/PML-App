
//document.addEventListener('DOMContentLoaded', () => {

    const appversionElements = document.querySelectorAll('#appversion-text, #appversion-icon');

    appversionElements.forEach(appversionElement => {
        appversionElement.addEventListener('click', () => {
            const block = document.getElementById('appversion-information');
            if (block) {
                block.style.display = block.style.display === 'none' ? 'block' : 'none';
            }
        });
 //});

    document.getElementById('close-btn')?.addEventListener('click', () => {
        const block = document.getElementById('appversion-information');
        if (block) {
            block.style.display = 'none';
        }
    });
});

// icon clicking code
//home icon
const homeButton = document.getElementById('home-icon') as HTMLButtonElement;

homeButton.addEventListener('click', () => {
    window.location.href = 'index.html'
});

//developer icon
const developerIcon = document.getElementById('developer-icon') as HTMLButtonElement;

developerIcon.addEventListener('click', () => {
    location.href = 'https://PML-Official.github.io'
});



