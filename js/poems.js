var page = 1;
var lastPage = 0;
var base_api = "https://floesia-api.herokuapp.com";

window.onload = function () {
    fetchPoems()
        .then(poems => {
            showPoems("poems_show", poems);
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
    fetch( `${base_api}/poems/${id}`, genPostData(body) )
        .then( console.log('Poem edited') );
}

function genHeaders() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-access-token', localStorage.getItem('tk'));
    return myHeaders;
}

function genPostData(body) {
    const postData = {
        method: 'PUT',
        body: JSON.stringify({body:body}, null, 2),
        headers: genHeaders(),
        mode: 'cors'
    }
    return postData;
}


function showPoems(component_id, poems) {
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
            result += `<div class="edit-btn" id="edit-btn-${i}" onclick="editPoem(${i})">Editar</div>`;
        } 
                
        result += `</div>
            <div class="body">
                <input type="hidden" id="poem_${i}_id" value="${p._id}" />
                <span class="title"><a href="/poem.html?p=${p._id}" class="no-decoration text-second">${p.title}</a></span>
                <textarea id="poem_${i}" spellcheck="false" class="text poem-textarea" disabled>${p.body}</textarea>              
            </div>
            <span class="float-right"><button id="like" class="btn" onclick=""><i class="far fa-heart" style="color:red"></i> 25</button></span> 
        </article>
        `;
    });
    document.getElementById(component_id).innerHTML += result;
    autosize(document.querySelectorAll("textarea.poem-textarea"));
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