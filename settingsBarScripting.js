// this is the script for the settings. includes all funtionality and button clicks ect.

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