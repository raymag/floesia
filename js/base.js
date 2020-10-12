if (isLogged()) {
    removeLoginBtn();
} else {
    removeLogoutBtn();
}

function isLogged() {
    return localStorage.getItem("tk");
}

function removeLoginBtn() {
    const loginBtn = document.querySelector("#login");
    loginBtn.remove();
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