const formulario =
    document.getElementById("formCandidatura");

const mensagem =
    document.getElementById("mensagemSucesso");


formulario.addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();


        mensagem.innerHTML = `

            <div class="sucesso-candidatura">

                <h2>
                    ✅ Candidatura registrada!
                </h2>

                <p>
                    Seus dados foram preenchidos
                    com sucesso.
                </p>

                <p>
                    Em uma versão futura do Jovem+,
                    esses dados poderão ser enviados
                    para o sistema da empresa.
                </p>

            </div>

        `;


        formulario.reset();

    }
);
