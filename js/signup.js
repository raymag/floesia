const base_api = "https://floesia-api.herokuapp.com";

window.onload = () => {
    const signupBtn = document.querySelector("#signupBtn");
    signupBtn.addEventListener("click", () => {
        clearAlertBox();
        signup();
    })
}

function signup() {
    const data = getFormData();
    fetch( `${base_api}/signup`, genPostData(data) )
        .then( data => {

            console.log(data.status);

            if (data.status === 404) {
                redAlert('Incorrect nickname, email or password.')
            }
            if (data.status === 201) {
                data
                    .json()
                    .then(data => {
                        location.href = '/login.html';
                    })
            }
            else {
                redAlert('E-mail or username is already in use.');
            }
        } )
        .catch((err) => {
            console.log(err);
            redAlert("Signup failed.")
        })
}

function getFormData() {
    const nickname = document.querySelector("#nickname");
    const password = document.querySelector("#password");
    const email = document.querySelector("#email");

    const formData = {
        username: nickname.value,
        password: password.value,
        email: email.value
    }
    return formData;
}

function genPostData(data) {
    const postData = {
        method: 'POST',
        body: JSON.stringify(data, null, 2),
        headers: genHeaders(),
        mode: 'cors'
    }
    return postData;
}

function genHeaders() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return myHeaders;
}

function clearAlertBox() {
    document.querySelector("#alert-box").innerHTML = '';
}

function redAlert(message) {
    let alert = document.createElement('span');
    alert.className = "red-alert";
    alert.innerText = message;

    document.querySelector("#alert-box").appendChild(alert);
}
