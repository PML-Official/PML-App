// this is the script for the settings. includes all funtionality and button clicks ect.



//script for active buttons
function toggleButton(button, showElements, hideElements) {
    var buttons = document.querySelectorAll('.sidebar-buttons');
    buttons.forEach(function(btn) {
        btn.classList. remove('active-buttons');
    });

    button.classList.add('active-buttons');

    toggleAndHideSections(showElements, hideElements);
}
// script for switching tabs
function toggleAndHideSections(showElements, hideElements) {
    visibilityOn(showElements);
    hideElements.forEach(function(id) {
        if (id !== 'leftnav') {
            var element = document.getElementById(id);
            element.classList.add('hidden');
        }
    });
}
function visibilityOn(elementIds) {
    elementIds.forEach(function(id) {
        var element = document.getElementById(id);
        element.classList.remove('hidden');
    });
}
function hideElements(elementIds) {
    elementIds.forEach(function(id) {
        var element = document.getElementById(id);
        element.classList.add('hidden');
    });
};


// for opening settings tab

document.getElementById('settings-text').addEventListener('click', 
function() { 
    var block = document.getElementById('settings'); 
    block.style.display = block.style.display === 'none' ? 'block' : 'none'; 
    if (block.style.display === 'block') { 
        block.classList.remove('reverse'); 
        block.classList.add('animate');
    } else { 
        block.classList.remove('animate');
        block.classList.add('reverse');
    }});
    
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('close').addEventListener('click', function() {
        var block = document.getElementById('settings'); 
        block.style.display = 'none'; 
        block.classList.remove('animate'); 
        block.classList.add('reverse');
    });
});



function restoreToDefaults () {
    alert("Restore Clicked");
    console.log("Settings Restored to Default");
};

function settingsSaveButton () {
    alert("Save bttn clicked!");
    console.log("Settings Saved");
};

// Tooltip code for Undo Button

document.addEventListener('DOMContentLoaded', () => {
    const undoHover = document.getElementById('undo');
    const hoverExplain = document.getElementById('restore-text');
    let tooltipTimeout;

    function showTooltip() {
        tooltipTimeout = setTimeout(() => {
            hoverExplain.style.opacity = '0'; 
            hoverExplain.style.display = 'block'; 
            setTimeout(() => {
                hoverExplain.style.opacity = '1'; 
            }, 50); 
        }, 600); 
    }

    function hideTooltip() {
        clearTimeout(tooltipTimeout);
        hoverExplain.style.opacity = '0'; 
        setTimeout(() => {
            hoverExplain.style.display = 'none';
        }, 300); 
    }

    undoHover.addEventListener('mouseenter', showTooltip);
    undoHover.addEventListener('mouseleave', hideTooltip);
});

