const detalhesVaga = document.getElementById("detalhesVaga");

// Pega o ID da vaga na URL
const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));

// Carregar a vaga
async function carregarVaga() {

    try {

        // Mostra uma mensagem enquanto carrega
        detalhesVaga.innerHTML = `
            <div class="carregando">
                <p>Carregando detalhes da vaga...</p>
            </div>
        `;

        const resposta = await fetch("./vagas.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar vagas.json");
        }

        const vagas = await resposta.json();

        const vaga = vagas.find(item => Number(item.id) === id);

        if (!vaga) {

            detalhesVaga.innerHTML = `
                <div class="vaga-nao-encontrada">

                    <h1>Vaga não encontrada</h1>

                    <p>
                        Essa oportunidade não existe
                        ou não está mais disponível.
                    </p>

                    <a href="index.html#vagas" class="botao-principal">
                        Ver outras vagas
                    </a>

                </div>
            `;

            return;
        }

        mostrarVaga(vaga);

    } catch (erro) {

        console.error("Erro:", erro);

        detalhesVaga.innerHTML = `
            <div class="vaga-nao-encontrada">

                <h1>Erro ao carregar a vaga</h1>

                <p>
                    Não foi possível carregar os detalhes.
                </p>

                <a href="index.html#vagas" class="botao-principal">
                    Voltar para vagas
                </a>

            </div>
        `;
    }
}


// Mostrar os detalhes
function mostrarVaga(vaga) {

    const requisitos = vaga.requisitos
        .map(requisito => `<li>${requisito}</li>`)
        .join("");

    detalhesVaga.innerHTML = `

        <div class="vaga-cabecalho">

            <div class="empresa-logo grande">
                ${vaga.empresa.charAt(0)}
            </div>

            <div>

                <span class="vaga-tipo">
                    ${vaga.tipo}
                </span>

                <h1>
                    ${vaga.titulo}
                </h1>

                <p class="empresa">
                    🏢 ${vaga.empresa}
                </p>

                <p class="local">
                    📍 ${vaga.cidade} - ${vaga.estado}
                </p>

            </div>

        </div>


        <div class="vaga-layout">

            <div class="vaga-conteudo">

                <section>

                    <h2>Sobre a vaga</h2>

                    <p>
                        ${vaga.descricao}
                    </p>

                </section>


                <section>

                    <h2>Requisitos</h2>

                    <ul class="requisitos">
                        ${requisitos}
                    </ul>

                </section>

            </div>


            <aside class="vaga-sidebar">

                <h2>Informações</h2>

                <div class="informacao">

                    <span>Área</span>

                    <strong>
                        ${vaga.area}
                    </strong>

                </div>


                <div class="informacao">

                    <span>Período</span>

                    <strong>
                        ${vaga.periodo}
                    </strong>

                </div>


                <div class="informacao">

                    <span>Localização</span>

                    <strong>
                        ${vaga.cidade} - ${vaga.estado}
                    </strong>

                </div>


                <button
                    class="botao-candidatura"
                    onclick="candidatar()">

                    Quero me candidatar

                </button>

            </aside>

        </div>

    `;
}


// Botão de candidatura
function candidatar() {

    alert(
        "A candidatura será implementada na próxima etapa!"
    );

}


// Iniciar
carregarVaga();
