var poems = []

window.onload = function() {
    fetch("./js/data.json")
    .then(res => res.json())
    .then(json => {
        poems = json;
        showPoems("poems_show",poems);
    })
}


function editPoem(i){
    document.getElementById(`poem_${i}`).disabled = !document.getElementById(`poem_${i}`).disabled
    if(!document.getElementById(`poem_${i}`).disabled) document.getElementById(`poem_${i}`).focus();
    document.getElementById(`edit-btn-${i}`).innerText = document.getElementById(`poem_${i}`).disabled ? "Editar" : "Concluido"; 
}

function showPoems(component_id,poems){
    let result = "";
    poems.forEach((p,i)=>{
        result += `
        <article class="poem">
            <div class="info">
                <span class="author">${p.author}</span>
                <span class="lastupdate">${new Date(p.lastupdate).toDateString()}</span>
                <div class="edit-btn" id="edit-btn-${i}" onclick="editPoem(${i})">Editar</div>
            </div>
            
            <div class="body">
                <span class="title">${p.title}</span>
                <textarea id="poem_${i}" spellcheck="false" class="text poem-textarea" disabled>
                    ${p.content}
                </textarea>
            </div>
        </article>
        `;
    });
    document.getElementById(component_id).innerHTML = result;
    autosize(document.querySelectorAll('textarea.poem-textarea'));
}

