let textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.style.height = '';
    textarea.style.height = textarea.scrollHeight + "px";
});