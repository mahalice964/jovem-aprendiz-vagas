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
    );
/* PÁGINA DA VAGA */

.pagina-vaga {
    padding: 50px 0 80px;
}

.voltar {
    display: inline-block;
    color: #2563eb;
    font-weight: 700;
    margin-bottom: 30px;
}

.detalhes-vaga {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    padding: 40px;
}

.vaga-cabecalho {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid #e5e7eb;
}

.empresa-logo.grande {
    width: 80px;
    height: 80px;
    min-width: 80px;
    font-size: 30px;
}

.vaga-cabecalho h1 {
    font-size: 38px;
    margin: 5px 0;
}

.vaga-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 50px;
    padding-top: 35px;
}

.vaga-conteudo section {
    margin-bottom: 35px;
}

.vaga-conteudo h2,
.vaga-sidebar h2 {
    margin-bottom: 15px;
    font-size: 24px;
}

.vaga-conteudo p {
    color: #64748b;
    font-size: 17px;
}

.requisitos {
    list-style: none;
    padding: 0;
}

.requisitos li {
    padding: 12px 0;
    color: #475569;
}

.requisitos li::before {
    content: "✓";
    color: #2563eb;
    font-weight: bold;
    margin-right: 10px;
}

.vaga-sidebar {
    background: #f8fafc;
    border-radius: 16px;
    padding: 25px;
    height: fit-content;
}

.informacao {
    padding: 15px 0;
    border-bottom: 1px solid #e5e7eb;
}

.informacao span {
    display: block;
    color: #64748b;
    font-size: 13px;
    margin-bottom: 4px;
}

.informacao strong {
    color: #172033;
}

.botao-candidatura {
    width: 100%;
    margin-top: 25px;
    padding: 16px;
    border: none;
    border-radius: 10px;
    background: #2563eb;
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
}

.botao-candidatura:hover {
    background: #1d4ed8;
}

.botao-principal {
    display: inline-block;
    margin-top: 20px;
    padding: 14px 20px;
    border-radius: 10px;
    background: #2563eb;
    color: white;
    font-weight: 700;
}

.vaga-nao-encontrada {
    text-align: center;
    padding: 70px 20px;
}


/* CELULAR */

@media (max-width: 800px) {

    .vaga-layout {
        grid-template-columns: 1fr;
    }

    .vaga-cabecalho {
        align-items: flex-start;
    }

    .vaga-cabecalho h1 {
        font-size: 28px;
    }

    .detalhes-vaga {
        padding: 25px;
    }

}
}


/* INICIAR SITE */

carregarVagas();
