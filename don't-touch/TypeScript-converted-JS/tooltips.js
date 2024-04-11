"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Tooltip code for Undo Button
    const undoHover = document.getElementById('undo');
    const hoverExplain = document.getElementById('restore-text');
    let tooltipTimeout;
    function showTooltip() {
        tooltipTimeout = setTimeout(() => {
            if (hoverExplain) {
                hoverExplain.style.opacity = '0';
                hoverExplain.style.display = 'block';
                setTimeout(() => {
                    hoverExplain.style.opacity = '1';
                }, 50);
            }
        }, 600);
    }
    function hideTooltip() {
        clearTimeout(tooltipTimeout);
        if (hoverExplain) {
            hoverExplain.style.opacity = '0';
            setTimeout(() => {
                hoverExplain.style.display = 'none';
            }, 300);
        }
    }
    if (undoHover) {
        undoHover.addEventListener('mouseenter', showTooltip);
        undoHover.addEventListener('mouseleave', hideTooltip);
    }
});
