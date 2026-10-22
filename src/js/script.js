const video = document.getElementById("video-fundo");

const telaViajante = document.getElementById("tela-viajante");
const telaNome = document.getElementById("tela-nome");

let viajanteEscolhido = "";
let pausaAtual = 0;

// Começa a cutscene
function iniciarCutscene() {
    video.currentTime = 0;
    video.play();
}

// Verifica o tempo do vídeo
video.addEventListener("timeupdate", () => {

    // Primeira pausa: 00:50
    if (video.currentTime >= 50 && pausaAtual === 0) {
        video.pause();
        video.currentTime = 50;
        pausaAtual = 1;
        telaViajante.style.display = "flex";
    }

    // Segunda pausa: 00:58
    if (video.currentTime >= 58 && pausaAtual === 2) {
        video.pause();
        video.currentTime = 58;
        pausaAtual = 3;
        telaNome.style.display = "flex";
    }
});

// Escolher Lumine ou Aether
function escolherViajante(nome) {
    viajanteEscolhido = nome;

    telaViajante.style.display = "none";

    // Continua até a próxima pausa
    pausaAtual = 2;
    video.currentTime = 50;
    video.play();
}

// Confirmar o nome
function continuarJornada() {
    const nome = document.getElementById("nome-jogador").value.trim();

    if (nome === "") {
        alert("Digite seu nome, viajante!");
        return;
    }

    localStorage.setItem("nomeJogador", nome);
    localStorage.setItem("viajanteEscolhido", viajanteEscolhido);

    telaNome.style.display = "none";

    // Retoma a cutscene a partir de 01:09
    pausaAtual = 4;
    video.currentTime = 69;
    video.play();

}


function comecarJogo() {
    window.location.href = "jornada1.html";
}


video.addEventListener("ended", () => {
    document.getElementById("tela-final").style.display = "flex";
});


