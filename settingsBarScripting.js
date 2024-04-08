// this is the script for the settings. includes all funtionality and button clicks ect.

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
}