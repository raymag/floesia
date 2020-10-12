var page = 1;
var lastPage = 0;
var base_api = "https://floesia-api.herokuapp.com";

window.onload = function () {
    fetchPoems()
        .then(poems => {

            if (isLogged()) {
                fetchGivenHearts()
                    .then(hearts => getPoemIdFromHearts(hearts))
                    .then(poemIdFromHearts => showPoems("poems_show", poems, poemIdFromHearts));
            } else {
                showPoems("poems_show", poems);
            }
            addScrollListener();
        })
};

function fetchPoems() {
    return new Promise((resolve, reject) => {
        lastPage = page;
        fetch(`${base_api}/poems?page=${page}`)
            .then(res => res.text())
            .then(json => {
                poems = JSON.parse(json);   
                if (poems.poems.length !== 0) {
                    page++;
                }
                resolve(poems.poems);
            })
            .catch(err => {
                reject([]);
            })
    });
}

function fetchGivenHearts() {
    return new Promise((resolve, reject) => {
        fetch(`${base_api}/author/${getAuthorInfo("_id")}/hearts`)
            .then(res => res.text())
            .then(json => {
                hearts = JSON.parse(json);
                resolve(hearts);   
            })
            .catch(err => {
                reject([]);
            })
    });
}

function getPoemIdFromHearts(hearts) {
    return new Promise((resolve, reject) => {
        const poemIdFromHearts = [];
        hearts.forEach(heart => {
            poemIdFromHearts.push(heart.poem);
        });
        resolve(poemIdFromHearts);
    });
}

function addScrollListener() {
    window.addEventListener("scroll", () => {
        const d = document.documentElement;

        const scrollPosition = d.scrollTop + window.innerHeight;
        const scrollTarget = d.offsetHeight - 1000;

        if (scrollPosition >= scrollTarget) {
            if (page !== lastPage) {
                loadMore();
            }
        }
    })
}

function loadMore() {
    fetchPoems(page)
        .then(poems => showPoems("poems_show", poems));
}


function editPoem(i) {

    if (!document.querySelector(`#poem_${i}`).disabled) {
        const body = document.querySelector(`#poem_${i}`).value;
        const poemId = document.querySelector(`#poem_${i}_id`).value;
        updatePoem(body, poemId);
    }

    document.getElementById(`poem_${i}`).disabled = !document.getElementById(
        `poem_${i}`
    ).disabled;
    if (!document.getElementById(`poem_${i}`).disabled)
        document.getElementById(`poem_${i}`).focus();
    document.getElementById(
        `edit-btn-${i}`
    ).innerText = document.getElementById(`poem_${i}`).disabled
            ? "Editar"
            : "Concluido";
}

function updatePoem(body, id) {
    fetch( `${base_api}/poems/${id}`, genPostData({body:body}, "PUT") )
        .then( console.log('Poem edited') );
}

function genHeaders() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-access-token', localStorage.getItem('tk'));
    return myHeaders;
}

function genPostData(body, method) {
    const postData = {
        method: method,
        body: JSON.stringify(body, null, 2),
        headers: genHeaders(),
        mode: 'cors'
    }
    return postData;
}

function updatePoemHeartContainer(i, content){
    const heartContainer = document.querySelector(`#heart-container-${i}`);
    if (heartContainer) {
        heartContainer.innerHTML = content;
    }
}

function giveHeart(i, poemId, hearts) {
    fetch( `${base_api}/hearts/${poemId}`, genPostData({}, "POST") )
        .then(res => res.text())
        .then(json => {
            heart = JSON.parse(json);   
            updatePoemHeartContainer(i, takeBackHeartUI(i, poemId, hearts+1));
        });
}

function takeBackHeart(i, poemId, hearts) {
    console.log('give hate')
    console.log(poemId)
}

function showPoems(component_id, poems, poemIdFromHearts) {
    let result = "";
    poems.forEach((p, i) => {
        result += `
        <article class="poem">
            <div class="info">
                <span class="author">${p.author.username}</span>
                <span class="lastupdate">${new Date(
            p.updatedAt
        ).toDateString()}</span>`;

        if (getAuthorInfo("_id") === p.author._id) {
            result += `<div class="edit-btn" title="Edit poem" id="edit-btn-${i}" onclick="editPoem(${i})">Edit</div>`;
        } 
                
        result += `</div>
            <div class="body">
                <span class="title" title="Take a better look"><a href="/poem.html?p=${p._id}" class="no-decoration text-second">${p.title}</a></span>
                <textarea id="poem_${i}" spellcheck="false" class="text poem-textarea" disabled>${p.body}</textarea>       
                <input type="hidden" id="poem_${i}_id" value="${p._id}" />       
            </div><div id="heart-container-${i}">`;

        if (poemIdFromHearts) {
            if ( poemIdFromHearts.includes(p._id)) {
                result += takeBackHeartUI(i, p._id, p.hearts);
            } else {
                result += giveHeartUI(i, p._id, p.hearts);
            }
        } else {
            result += `<span class="float-right" title="Hearts" ><a href="/login.html" id="like" class="btn bg-transparent"><i class="far fa-heart fa-lg" style="color:red"></i> ${p.hearts}</a></span>`;
        }
        result += `</div></article>
        `;
    });
    document.getElementById(component_id).innerHTML += result;
    autosize(document.querySelectorAll("textarea.poem-textarea"));
}

function takeBackHeartUI(i, id, hearts){
    return `<span class="float-right" title="Take back heart" id="take-back-heart-btn" onClick="takeBackHeart(${i}, '${id}', ${hearts})"><button id="like" class="btn bg-transparent" onclick=""><i class="fas fa-heart fa-lg" style="color:red"></i> ${hearts}</button></span>`;
}

function giveHeartUI(i, id, hearts){
    return `<span class="float-right" title="Give heart" id="give-heart-btn" onClick="giveHeart(${i}, '${id}', ${hearts})"><button id="like" class="btn bg-transparent" onclick=""><i class="far fa-heart fa-lg" style="color:red"></i> ${hearts}</button></span>`;
}

function getAuthorInfo(key) {
    if (key === "username") {
        return localStorage.getItem("aun");
    }
    if (key === "_id") {
        return localStorage.getItem("aid");
    }
    if (key === "email") {
        return localStorage.getItem("aem");
    }
    else {
        return '';
    }
}