const listaCandidaturas =
    document.getElementById("listaCandidaturas");

const contadorCandidaturas =
    document.getElementById("contadorCandidaturas");


// CARREGAR CANDIDATURAS

function carregarCandidaturas() {

    const candidaturas =
        JSON.parse(
            localStorage.getItem("candidaturas")
        ) || [];


    // Atualizar contador

    contadorCandidaturas.textContent =
        candidaturas.length +
        (
            candidaturas.length === 1
                ? " candidatura"
                : " candidaturas"
        );


    // Nenhuma candidatura

    if (candidaturas.length === 0) {

        listaCandidaturas.innerHTML = `

            <div class="sem-candidaturas">

                <h2>
                    Nenhuma candidatura encontrada
                </h2>

                <p>
                    Você ainda não enviou nenhuma candidatura.
                </p>

                <a
                    href="index.html#vagas"
                    class="botao-principal">

                    Ver vagas

                </a>

            </div>

        `;

        return;
    }


    // Mostrar candidaturas

    listaCandidaturas.innerHTML = "";


    candidaturas.forEach(function(candidatura, index) {

        const card =
            document.createElement("article");

        card.className =
            "candidatura-card";


        card.innerHTML = `

            <div class="candidatura-cabecalho">

                <div>

                    <span class="vaga-tipo">
                        Candidatura enviada
                    </span>

                    <h2>
                        ${candidatura.vaga}
                    </h2>

                    <p class="empresa">
                        🏢 ${candidatura.empresa}
                    </p>

                </div>

            </div>


            <div class="candidatura-info">

                <p>
                    <strong>Nome:</strong>
                    ${candidatura.nome}
                </p>

                <p>
                    <strong>E-mail:</strong>
                    ${candidatura.email}
                </p>

                <p>
                    <strong>Telefone:</strong>
                    ${candidatura.telefone}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${candidatura.data}
                </p>

            </div>


            <div class="candidatura-mensagem">

                <strong>
                    Apresentação:
                </strong>

                <p>
                    ${candidatura.mensagem}
                </p>

            </div>


            <button
                class="botao-excluir"
                onclick="excluirCandidatura(${index})">

                Excluir candidatura

            </button>

        `;


        listaCandidaturas.appendChild(card);

    });

}


// EXCLUIR CANDIDATURA

function excluirCandidatura(index) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta candidatura?"
        );


    if (!confirmar) {
        return;
    }


    let candidaturas =
        JSON.parse(
            localStorage.getItem("candidaturas")
        ) || [];


    candidaturas.splice(index, 1);


    localStorage.setItem(
        "candidaturas",
        JSON.stringify(candidaturas)
    );


    carregarCandidaturas();

}


// INICIAR

carregarCandidaturas();
