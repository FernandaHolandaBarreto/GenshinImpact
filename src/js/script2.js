
const jogador = document.getElementById("jogador");
const cenario = document.getElementById("cenario");
const mensagem = document.getElementById("mensagem");

const teclas = {};
const botoes = {};

let x = 50;
let y = 0;
let velocidadeY = 0;
let noChao = true;
let olhandoDireita = true;
let tempoAtaque = 0;

const gravidade = 1600;
const forcaPulo = 620;
const velocidade = 260;

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

function pular() {
    if (noChao) {
        velocidadeY = forcaPulo;
        noChao = false;
        mostrarMensagem("Você pulou!");
    }
}

function atacar() {
    tempoAtaque = 0.3;
    jogador.classList.remove("atacando");

    // Reinicia a animação do ataque.
    void jogador.offsetWidth;

    jogador.classList.add("atacando");
    mostrarMensagem("Ataque elemental! ✦");
}

function executarAcao(acao) {
    if (acao === "pular") {
        pular();
    }

    if (acao === "atacar") {
        atacar();
    }
}

// Teclado
window.addEventListener("keydown", (evento) => {
    const tecla = evento.key.toLowerCase();

    if (["arrowleft", "arrowright", "arrowup", " ", "a", "d", "w", "j"].includes(tecla)) {
        evento.preventDefault();
    }

    teclas[tecla] = true;

    if (evento.repeat) return;

    if (tecla === " " || tecla === "arrowup" || tecla === "w") {
        executarAcao("pular");
    }

    if (tecla === "j") {
        executarAcao("atacar");
    }
});

window.addEventListener("keyup", (evento) => {
    teclas[evento.key.toLowerCase()] = false;
});

// Evita que uma tecla fique presa se a janela perder o foco.
window.addEventListener("blur", () => {
    Object.keys(teclas).forEach((tecla) => {
        teclas[tecla] = false;
    });

    Object.keys(botoes).forEach((botao) => {
        botoes[botao] = false;
    });
});

// Botões da tela: funcionam com mouse e toque.
document.querySelectorAll("[data-acao]").forEach((botao) => {
    const acao = botao.dataset.acao;

    botao.addEventListener("pointerdown", (evento) => {
        evento.preventDefault();
        botao.setPointerCapture(evento.pointerId);
        botao.classList.add("pressionado");

        if (acao === "esquerda" || acao === "direita") {
            botoes[acao] = true;
        } else {
            executarAcao(acao);
        }
    });

    function soltarBotao() {
        botoes[acao] = false;
        botao.classList.remove("pressionado");
    }

    botao.addEventListener("pointerup", soltarBotao);
    botao.addEventListener("pointercancel", soltarBotao);
    botao.addEventListener("lostpointercapture", soltarBotao);
});

let ultimoTempo = 0;

function atualizar(tempoAtual) {
    // Tempo entre os quadros, em segundos.
    const delta = Math.min((tempoAtual - ultimoTempo) / 1000 || 0, 0.03);
    ultimoTempo = tempoAtual;

    let direcao = 0;

    if (teclas["a"] || teclas["arrowleft"] || botoes.esquerda) {
        direcao -= 1;
    }

    if (teclas["d"] || teclas["arrowright"] || botoes.direita) {
        direcao += 1;
    }

    x += direcao * velocidade * delta;

    if (direcao < 0) {
        olhandoDireita = false;
    }

    if (direcao > 0) {
        olhandoDireita = true;
    }

    // Impede a personagem de sair pelas laterais.
    const limite = cenario.clientWidth - jogador.offsetWidth;
    x = Math.max(0, Math.min(x, limite));

    // Física do pulo e da gravidade.
    y += velocidadeY * delta;
    velocidadeY -= gravidade * delta;

    if (y <= 0) {
        y = 0;
        velocidadeY = 0;
        noChao = true;
    }

    // Atualiza a posição do personagem.
    jogador.style.left = `${x}px`;
    jogador.style.bottom = `${75 + y}px`;

    const arte = document.getElementById("arte-personagem");
    arte.style.transform = olhandoDireita ? "scaleX(1)" : "scaleX(-1)";

    // Termina o efeito de ataque.
    if (tempoAtaque > 0) {
        tempoAtaque -= delta;

        if (tempoAtaque <= 0) {
            jogador.classList.remove("atacando");
        }
    }

    requestAnimationFrame(atualizar);
}

requestAnimationFrame(atualizar);
