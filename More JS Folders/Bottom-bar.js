document.addEventListener('DOMContentLoaded', function() {
    function openLinkExternally(event) {
        event.preventDefault();
        const link = event.target.href;
        shell.openExternal(link);
    } 
    document.getElementById('app-version-text')?.addEventListener('click', function() {
        var block = document.getElementById('appversion-information');
        if (block) {
            block.style.display = block.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    document.getElementById('close-btn')?.addEventListener('click', function() {
        var block = document.getElementById('appversion-information');
        if (block) {
        block.style.display = 'none';
        }
    });
});
