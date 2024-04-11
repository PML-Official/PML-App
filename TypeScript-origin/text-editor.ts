    // text editor scroll
    const textEditorScroll = document.getElementById('editor') as HTMLElement;

    textEditorScroll.addEventListener('scroll', function() {
        if (textEditorScroll.scrollTop > 0) {
            textEditorScroll.style.borderTop = '1px solid grey';
        } else {
            textEditorScroll.style.borderTop = 'none';
        }
    
    });
    // width change

    window.onresize = function() {
        const container = document.querySelector('.resizeable') as HTMLElement;
        const contents = container.querySelectorAll('.container') as NodeListOf<HTMLElement>;
    
        contents.forEach(function(content) {
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
        const previewButton = document.getElementById('previewbutton') as HTMLButtonElement;
        const errorsButton = document.getElementById('errorsbutton') as HTMLButtonElement;
        
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
    let lastClickedButtonId: string | null = null;

    function toggleButtonState(clickedButtonId: string, otherButtonId: string) {
        if (lastClickedButtonId === clickedButtonId) {
            return;
        }

        const clickedButton = document.getElementById(clickedButtonId) as HTMLButtonElement;
        const otherButton = document.getElementById(otherButtonId) as HTMLButtonElement;

        clickedButton.disabled = true;
        clickedButton.style.opacity = '0.7';
        clickedButton.style.cursor = 'default';

        otherButton.disabled = false;
        otherButton.style.opacity = '1';
        otherButton.style.cursor = 'pointer';

        lastClickedButtonId = clickedButtonId;
    }

    // Showing and hiding elements
    function toggleAndHide(elementsToShow: string[], elementsToHide: string[]) {
        toggleVisibility(elementsToShow);
        hideElements(elementsToHide);
    }

    function toggleVisibility(elementIds: string[]) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('hidden');
            }
        });
    }

    function hideElements(elementIds: string[]) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('hidden');
            }
        });
    };

    // Pressing Enter


    function getCaretCharacterOffsetWithin(element: Node): number {
        return 0;
    }
    
    function handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            if (range) {
                const br = document.createElement('br');
                range.insertNode(br);
                range.setStartAfter(br);
                range.setEndAfter(br);
                range.collapse(false);
                selection?.removeAllRanges();
                selection?.addRange(range);
                event.preventDefault();
            }
        }
        if (event.key === 'Backspace') {
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            if (range) {
                const currentLineText = range.startContainer.textContent;
                const currentLineOffset = range.startOffset;
                if (436 === getCaretCharacterOffsetWithin(range.startContainer)) {
                    const prevNode = range.startContainer.previousSibling;
                    if (prevNode) {
                        prevNode.parentNode?.removeChild(prevNode);
                        event.preventDefault();
                    }
                }
            }
        }
    }
    
    function handleInput(event: Event): void {
        const inputEvent = event as InputEvent;
        const content = (inputEvent.target as HTMLElement).textContent;
        if (content?.endsWith('<br>') || content?.endsWith('<br><br>')) {
            const range = document.createRange();
            const selection = window.getSelection();
            if (selection) {
                range.selectNodeContents(inputEvent.target as Node);
                range.collapse(false);
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }
    }
    
    const contentDiv = document.getElementById('contentDiv');

    if (contentDiv) {
        contentDiv.addEventListener('keydown', handleKeyDown);
        contentDiv.addEventListener('input', handleInput);
    }
