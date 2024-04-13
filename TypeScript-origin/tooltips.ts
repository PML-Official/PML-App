    // Tooltip code for Undo Button

    const undoHover = document.getElementById('undo');
    const hoverExplain = document.getElementById('restore-text');
    let tooltipTimeout: ReturnType<typeof setTimeout>;
    
    function showTooltip(event: MouseEvent) {
        tooltipTimeout = setTimeout(() => {
            if (hoverExplain) {
                // Update tooltip position
                updateTooltipPosition(event.pageX, event.pageY);
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
    
    // Method to update tooltip position
    function updateTooltipPosition(mouseX: number, mouseY: number) {
        if (hoverExplain) {
            hoverExplain.style.left = (mouseX + 200) + 'px';
            hoverExplain.style.top = (mouseY + 200) + 'px';
        }
    }
    
    if (undoHover) {
        undoHover.addEventListener('mouseenter', showTooltip);
        undoHover.addEventListener('mousemove', (event) => {
            updateTooltipPosition(event.pageX, event.pageY);
        });
        undoHover.addEventListener('mouseleave', hideTooltip);
    }
    




















