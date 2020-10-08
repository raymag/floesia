window.onload = () => {
    if (!isUserLoggedIn()) {
        disableUI();
        presentDialog();
    }
}

function isUserLoggedIn() {
    return localStorage.getItem('tk') !== null;
}

function disableUI() {
    var poemTitleInput = document.querySelector("#poem-title-input");
    var poemTextArea = document.querySelector("#poem-content-textarea")
    poemTitleInput.setAttribute("disabled", "disabled");
    poemTextArea.setAttribute("disabled", "disabled");
}