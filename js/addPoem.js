window.onload = () => {

    if (!isUserLoggedIn()) {
        disableUI();
        attachListenersToButtons();
        presentDialog();
    }
}

function isUserLoggedIn() {
    return localStorage.getItem('tk') !== null;
}

function attachListenersToButtons() {
    var loginBtn = document.querySelector("#loginBtn");
    var signupBtn = document.querySelector("#signupBtn");

    loginBtn.onclick = function() {
        location.href = 'login.html';
    }

    signupBtn.onclick = function() {
        location.href = 'signup.html';
    }
}

function disableUI() {
    var poemTitleInput = document.querySelector("#poem-title-input");
    var poemTextArea = document.querySelector("#poem-content-textarea")
    poemTitleInput.setAttribute("disabled", "disabled");
    poemTextArea.setAttribute("disabled", "disabled");
}

function presentDialog() {
    $('#myModal').modal('show');
}