const poems = [
    {
        title: "A Máquina do Mundo",
        content: `
E como eu palmilhasse vagamente
uma estrada de Minas, pedregosa,
e no fecho da tarde um sino rouco

se misturasse ao som de meus sapatos
que era pausado e seco; e aves pairassem
no céu de chumbo, e suas formas pretas

lentamente se fossem diluindo
na escuridão maior, vinda dos montes
e de meu próprio ser desenganado,

a máquina do mundo se entreabriu
para quem de a romper já se esquivava
e só de o ter pensado se carpia.

Abriu-se majestosa e circunspecta,
sem emitir um som que fosse impuro
nem um clarão maior que o tolerável

pelas pupilas gastas na inspeção
contínua e dolorosa do deserto,
e pela mente exausta de mentar

toda uma realidade que transcende
a própria imagem sua debuxada
no rosto do mistério, nos abismos.

Abriu-se em calma pura, e convidando
quantos sentidos e intuições restavam
a quem de os ter usado os já perdera

e nem desejaria recobrá-los,
se em vão e para sempre repetimos
os mesmos sem roteiro tristes périplos,

convidando-os a todos, em coorte, 
a se aplicarem sobre o pasto inédito
da natureza mítica das coisas.
        `,
        author: "Carlos Drummond de Andrade",
        lastupdate: new Date(2020,10,1)
    },
    {
        title: "Vou-me Embora pra Pasárgada",
        content: `
Vou-me embora pra Pasárgada
Lá sou amigo do rei
Lá tenho a mulher que eu quero
Na cama que escolherei

Vou-me embora pra Pasárgada
Vou-me embora pra Pasárgada
Aqui eu não sou feliz
Lá a existência é uma aventura
De tal modo inconseqüente
Que Joana a Louca de Espanha
Rainha e falsa demente
Vem a ser contraparente
Da nora que nunca tive

E como farei ginástica
Andarei de bicicleta
Montarei em burro brabo
Subirei no pau-de-sebo
Tomarei banhos de mar!
E quando estiver cansado
Deito na beira do rio
Mando chamar a mãe-d’água
Pra me contar as histórias
Que no tempo de eu menino
Rosa vinha me contar
Vou-me embora pra Pasárgada

Em Pasárgada tem tudo
É outra civilização
Tem um processo seguro
De impedir a concepção
Tem telefone automático
Tem alcaloide à vontade
Tem prostitutas bonitas
Para a gente namorar

E quando eu estiver mais triste
Mas triste de não ter jeito
Quando de noite me der
Vontade de me matar
— Lá sou amigo do rei —
Terei a mulher que eu quero
Na cama que escolherei
Vou-me embora pra Pasárgada.
        `,
        author: "Manuel Bandeira",
        lastupdate: new Date(2020,10,1)
    },
    {
        title: "Soneto da Fidelidade",
        content: `
De tudo, ao meu amor serei atento
Antes, e com tal zelo, e sempre, e tanto
Que mesmo em face do maior encanto
Dele se encante mais meu pensamento.

Quero vivê-lo em cada vão momento
E em louvor hei de espalhar meu canto
E rir meu riso e derramar meu pranto
Ao seu pesar ou seu contentamento.

E assim, quando mais tarde me procure
Quem sabe a morte, angústia de quem vive
Quem sabe a solidão, fim de quem ama

Eu possa me dizer do amor (que tive):
Que não seja imortal, posto que é chama
Mas que seja infinito enquanto dure.
        `,
        author: "Vinícius de Moraes",
        lastupdate: new Date(2020,10,1)
    },
    {
        title: "Via Láctea",
        content: `
“Ora (direis) ouvir estrelas! Certo
Perdeste o senso!” E eu vos direi, no entanto,
Que, para ouvi-las, muita vez desperto
E abro as janelas, pálido de espanto…

E conversamos toda a noite, enquanto
A Via Láctea, como um pálio aberto
Cintila. E, ao vir do sol, saudoso e em pranto,
Inda as procuro pelo céu deserto.

Direis agora: “Tresloucado amigo!
Que conversas com elas? Que sentido
Tem o que dizem, quando estão contigo?”

E eu vos direi: “Amai para entendê-las!
Pois só quem ama pode ter ouvido
Capaz de ouvir e de entender estrelas.
        `,
        author: "Olavo Bilac",
        lastupdate: new Date(2020,10,1)
    },
    {
        title: "Canção do Exílio",
        content: `
Minha terra tem palmeiras,
Onde canta o Sabiá;
As aves, que aqui gorjeiam,
Não gorjeiam como lá.

Nosso céu tem mais estrelas,
Nossas várzeas têm mais flores,
Nossos bosques têm mais vida,
Nossa vida mais amores.

Em cismar, sozinho, à noite,
Mais prazer encontro eu lá;
Minha terra tem palmeiras
Onde canta o Sabiá.

Minha terra tem primores,
Que tais não encontro eu cá;
Em cismar — sozinho, à noite —
Mais prazer encontro eu lá;
Minha terra tem palmeiras,
Onde canta o Sabiá.

Não permita Deus que eu morra,
Sem que eu volte para lá;
Sem que desfrute os primores
Que não encontro por cá;
Sem qu’inda aviste as palmeiras,
Onde canta o Sabiá.
        `,
        author: "Gonçalves Dias",
        lastupdate: new Date(2020,10,1)
    },
    {
        title: "Poema top",
        content: `
Imagina aqui
um poema bem louco
você vai achar incrível
de enxarcar os olhos
        `,
        author: "Magno404",
        lastupdate: new Date(2020,10,1)
    }
]

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
                <span class="lastupdate">${p.lastupdate.toDateString()}</span>
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

showPoems("poems_show",poems);