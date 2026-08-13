const busca = document.getElementById("busca");
const cidade = document.getElementById("cidade");
const buscarBtn = document.getElementById("buscarBtn");

const vagas = document.querySelectorAll(".vaga-card");
const contador = document.getElementById("contador");

buscarBtn.addEventListener("click", function () {

    const termo = busca.value.toLowerCase().trim();
    const localizacao = cidade.value.toLowerCase().trim();

    let encontradas = 0;

    vagas.forEach(function (vaga) {

        const textoVaga = vaga.textContent.toLowerCase();

        const encontrouTermo =
            termo === "" || textoVaga.includes(termo);

        const encontrouCidade =
            localizacao === "" || textoVaga.includes(localizacao);

        if (encontrouTermo && encontrouCidade) {

            vaga.style.display = "flex";

            encontradas++;

        } else {

            vaga.style.display = "none";

        }

    });

    contador.textContent =
        encontradas + (encontradas === 1 ? " vaga" : " vagas");

});
