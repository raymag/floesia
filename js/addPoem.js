const base_api = "https://floesia-api.herokuapp.com";

var poemTitleInput = document.querySelector("#poem-title-input");
var poemTextArea = document.querySelector("#poem-content-textarea");
var submitPoemBtn = document.querySelector("#sendPoemBtn");

window.onload = () => {

    if (!isUserLoggedIn()) {
        disableUI();
        attachListenersToButtons();
        presentDialog();
    } else {
        addListenerToSubmitButton();
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
    poemTitleInput.setAttribute("disabled", "disabled");
    poemTextArea.setAttribute("disabled", "disabled");
    submitPoemBtn.setAttribute("disabled", true);
}

function presentDialog() {
    $('#myModal').modal('show');
}

function addListenerToSubmitButton() {
    submitPoemBtn.onclick = function() {
        fetch( `${base_api}/poems`, getPostDataForPoemAddition(poemTitleInput.value, poemTextArea.value) )
            .then( data => {
                if (data.status === 404) {
                    redAlert('Incorrect credentials')
                } else {
                    data
                        .json()
                        .then(data => {
                            location.href = '/';
                        })
                }
            } )
            .catch((err) => {
                console.log(err);
                redAlert("Saving Poem failed.");
            })
        }
}

function getPostDataForPoemAddition(poemTitle, poemBody) {
    return {
        method: 'POST',
        body: JSON.stringify({title: poemTitle, body: poemBody}, null, 2),
        headers: getHeaders(),
        mode: 'cors'        
    };
}

function getHeaders() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-access-token', getToken());
    return myHeaders;
}

function getToken() {
    return localStorage.getItem('tk');
}