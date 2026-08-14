const listaVagas = document.getElementById("listaVagas");
const contador = document.getElementById("contador");

const busca = document.getElementById("busca");
const cidade = document.getElementById("cidade");
const buscarBtn = document.getElementById("buscarBtn");

let todasAsVagas = [];


/* CARREGAR VAGAS */

async function carregarVagas() {

    try {

        const resposta = await fetch("vagas.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o arquivo vagas.json");
        }

        todasAsVagas = await resposta.json();

        mostrarVagas(todasAsVagas);

    } catch (erro) {

        console.error(erro);

        listaVagas.innerHTML = `
            <p>
                Ocorreu um erro ao carregar as vagas.
            </p>
        `;

    }

}


/* MOSTRAR VAGAS */

function mostrarVagas(vagas) {

    listaVagas.innerHTML = "";

    contador.textContent =
        vagas.length +
        (vagas.length === 1 ? " vaga" : " vagas");


    if (vagas.length === 0) {

        listaVagas.innerHTML = `
            <p>
                Nenhuma vaga encontrada.
            </p>
        `;

        return;
    }


    vagas.forEach(function(vaga) {

        const card = document.createElement("article");

        card.className = "vaga-card";


        card.innerHTML = `

            <div class="empresa-logo">
                ${vaga.empresa.charAt(0)}
            </div>

            <div class="vaga-info">

                <span class="vaga-tipo">
                    ${vaga.tipo}
                </span>

                <h3>
                    ${vaga.titulo}
                </h3>

                <p class="empresa">
                    ${vaga.empresa}
                </p>

                <p class="local">
                    📍 ${vaga.cidade} - ${vaga.estado}
                </p>

                <div class="vaga-footer">

                    <span>
                        🕐 ${vaga.periodo}
                    </span>

                    <button
                        class="ver-vaga"
                        onclick="verVaga(${vaga.id})">
                        Ver vaga
                    </button>

                </div>

            </div>

        `;


        listaVagas.appendChild(card);

    });

}


/* PESQUISAR */

function pesquisarVagas() {

    const termo = busca.value
        .toLowerCase()
        .trim();

    const localizacao = cidade.value
        .toLowerCase()
        .trim();


    const resultado = todasAsVagas.filter(function(vaga) {

        const textoCompleto = `

            ${vaga.titulo}
            ${vaga.empresa}
            ${vaga.cidade}
            ${vaga.estado}
            ${vaga.area}
            ${vaga.tipo}

        `.toLowerCase();


        const encontrouTermo =
            termo === "" ||
            textoCompleto.includes(termo);


        const encontrouCidade =
            localizacao === "" ||
            `${vaga.cidade} ${vaga.estado}`
                .toLowerCase()
                .includes(localizacao);


        return encontrouTermo && encontrouCidade;

    });


    mostrarVagas(resultado);

}


/* BOTÃO DE PESQUISA */

buscarBtn.addEventListener(
    "click",
    pesquisarVagas
);


/* ENTER */

busca.addEventListener(
    "keydown",
    function(evento) {

        if (evento.key === "Enter") {
            pesquisarVagas();
        }

    }
);


cidade.addEventListener(
    "keydown",
    function(evento) {

        if (evento.key === "Enter") {
            pesquisarVagas();
        }

    }
);


/* VER VAGA */
 
function verVaga(id) {

    window.location.href =
        "vaga.html?id=" + id;

}
    
