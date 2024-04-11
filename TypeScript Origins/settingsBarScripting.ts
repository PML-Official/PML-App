// this is the script for the settings. includes all funtionality and button clicks ect.



//script for active buttons
function toggleButton(button: HTMLElement, showElements: string[], hideElements: string[]) {
    var buttons = document.querySelectorAll('.sidebar-buttons');
    buttons.forEach(function(btn) {
        btn.classList. remove('active-buttons');
    });

    button.classList.add('active-buttons');

    toggleAndHideSections(showElements, hideElements);
}
// script for switching tabs
function toggleAndHideSections(showElements: string[], hideElements: string[]) {
    visibilityOn(showElements);
    hideElements.forEach(function(id: string) {
        if (id !== 'leftnav') {
            const element = document.getElementById(id);
            if (element) {
            element.classList.add('hidden');
            }
        }
    });
}
function visibilityOn(elementIds: string[]) {
    elementIds.forEach(function(id) {
        const element = document.getElementById(id);
        if (element) {
        element.classList.remove('hidden');
        }
    });
}
function hideElements(elementIds: string[]) {
    elementIds.forEach(function(id) {
        const element = document.getElementById(id);
        if (element) {
        element.classList.add('hidden');
        }
    });
};


// for opening settings tab

document.getElementById('settings-text')?.addEventListener('click', () => {
    const block = document.getElementById('settings');
    if (block) {
        block.style.display = block.style.display === 'none' ? 'block' : 'none'; 
    if (block.style.display === 'block') { 
        block.classList.remove('reverse'); 
        block.classList.add('animate');
    } else { 
        block.classList.remove('animate');
        block.classList.add('reverse');
        }
    }
});
    
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('close')?.addEventListener('click', () => {
        const block = document.getElementById('settings'); 
            if (block) {
                block.style.display = 'none'; 
                block.classList.remove('animate'); 
                block.classList.add('reverse');
            }
        });
    });



function restoreToDefaults () {
    alert("Restore Clicked TESt TET AGAIN");
    console.log("Settings Restored to Default");
};

function settingsSaveButton () {
    alert("Save bttn clicked!");
    console.log("Settings Saved");
};



