if (isLogged()) {
    removeLoginBtn();
    attachListenersToButton();
} else {
    removeLogoutBtn();
    hideAddPoemBtn();
}

function isLogged() {
    return localStorage.getItem("tk");
}

function removeLoginBtn() {
    const loginBtn = document.querySelector("#login");
    if(loginBtn != null){
        loginBtn.remove();
    }
}

function removeLogoutBtn() {
    const logoutBtn = document.querySelector("#logout");
    logoutBtn.remove();
}


let textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.style.height = '';
    textarea.style.height = textarea.scrollHeight + "px";
});

function hideAddPoemBtn(){
    const addPoemBtn = document.querySelector("#add-poem-btn");
    if(addPoemBtn != null){
        addPoemBtn.remove();
    }
}

function attachListenersToButton() {
    var addPoemBtn = document.querySelector("#add-poem-btn");

    if(addPoemBtn != null){
        addPoemBtn.onclick = function() {
            location.href = 'addPoem.html';
        }
    }
}
