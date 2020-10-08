let textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.style.height = '';
    textarea.style.height = textarea.scrollHeight + "px";
});

let bclick = document.querySelector('button').addEventListener('click',()=>{
    document.getElementById('poems').classList.toggle('dark')
    document.querySelector('body').classList.toggle('dark')
    let ele = document.querySelectorAll('article')
    ele.forEach(ele => {
        ele.classList.toggle('dark')
        ele.children[0].classList.toggle('dark')
        ele.children[1].children[0].classList.toggle('dark')
        ele.children[1].children[1].classList.toggle('dark')
    })
})