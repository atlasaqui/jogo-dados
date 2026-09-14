'use client'; // esse componente usa useState/eventos, então precisa rodar no navegador

import { useState } from 'react';
import Dado from './Dado';

const TOTAL_RODADAS = 5;

// sorteia um número inteiro entre 1 e 6
function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function JogoDados() {
  // --- ESTADOS (a "memória" do componente) ---

  const [rodadaAtual, setRodadaAtual] = useState(1);

  // os 2 dados de cada jogador. null = ainda não jogado nessa rodada
  const [dadosJogador1, setDadosJogador1] = useState([null, null]);
  const [dadosJogador2, setDadosJogador2] = useState([null, null]);

  // de quem é a vez de jogar dentro da rodada atual:
  // 1 = vez do Jogador 1 | 2 = vez do Jogador 2 | 0 = rodada concluída (ninguém joga, só avançar)
  const [vezDoJogador, setVezDoJogador] = useState(1);

  const [resultadoRodada, setResultadoRodada] = useState('');

  // placar acumulado da partida inteira
  const [placar, setPlacar] = useState({ jogador1: 0, jogador2: 0, empates: 0 });

  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState('');

  // --- FUNÇÕES ---

  function jogarJogador1() {
    // se a rodada anterior já tinha um resultado, esse clique é o que "abre"
    // a rodada seguinte (não existe um botão "avançar" separado no desenho)
    if (resultadoRodada !== '' && !jogoFinalizado) {
      iniciarProximaRodada();
    }

    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador1(novosDados); // sobrescreve o [null, null] que iniciarProximaRodada acabou de agendar
    setVezDoJogador(2); // passa a vez pro Jogador 2
  }

  function jogarJogador2() {
    const novosDadosJ2 = [rolarDado(), rolarDado()];
    setDadosJogador2(novosDadosJ2);

    // como os dados do Jogador 1 já estão no estado, dá pra comparar agora
    const somaJ1 = dadosJogador1[0] + dadosJogador1[1];
    const somaJ2 = novosDadosJ2[0] + novosDadosJ2[1];

    let mensagem;
    const novoPlacar = { ...placar };

    if (somaJ1 > somaJ2) {
      mensagem = 'Jogador 1 venceu';
      novoPlacar.jogador1 += 1;
    } else if (somaJ2 > somaJ1) {
      mensagem = 'Jogador 2 venceu';
      novoPlacar.jogador2 += 1;
    } else {
      mensagem = 'Empate';
      novoPlacar.empates += 1;
    }

    setResultadoRodada(mensagem);
    setPlacar(novoPlacar);

    // era a última rodada? decide o resultado geral e acaba o jogo aqui mesmo,
    // sem trocar de tela: o quadro do professor não tem uma tela separada,
    // então a MENSAGEM e o botão "Jogar novamente" aparecem dentro do mesmo container.
    if (rodadaAtual === TOTAL_RODADAS) {
      let mensagemFinal;
      if (novoPlacar.jogador1 > novoPlacar.jogador2) {
        mensagemFinal = 'Jogador 1 venceu o jogo';
      } else if (novoPlacar.jogador2 > novoPlacar.jogador1) {
        mensagemFinal = 'Jogador 2 venceu o jogo';
      } else {
        mensagemFinal = 'Empate Geral';
      }
      setResultadoFinal(mensagemFinal);
      setJogoFinalizado(true);
      setVezDoJogador(0); // trava os botões de vez, só resta "Jogar novamente"
    } else {
      // não era a última: já deixa tudo pronto pra próxima rodada.
      // não existe botão "avançar" no desenho do quadro, então o próprio
      // clique em "Jogar Jogador 1" da rodada seguinte já dispara tudo.
      setVezDoJogador(1);
    }
  }

  function iniciarProximaRodada() {
    setRodadaAtual((r) => r + 1);
    setDadosJogador1([null, null]);
    setDadosJogador2([null, null]);
    setResultadoRodada('');
  }

  function jogarNovamente() {
    setRodadaAtual(1);
    setDadosJogador1([null, null]);
    setDadosJogador2([null, null]);
    setVezDoJogador(1);
    setResultadoRodada('');
    setPlacar({ jogador1: 0, jogador2: 0, empates: 0 });
    setJogoFinalizado(false);
    setResultadoFinal('');
  }

  // --- TELA ÚNICA, igual ao quadro: título, rodada, os 2 jogadores lado a lado
  // (com um botão "Jogar" dentro de cada coluna), uma caixa "MENSAGEM" central
  // que mostra o resultado da rodada (ou o resultado final), e o botão
  // "Jogar novamente" que só aparece quando o jogo termina.
  const mensagemAtual = jogoFinalizado ? resultadoFinal : resultadoRodada;

  return (
    <div className="jogo-container">
      <h1 className="titulo-app">Dice Game</h1>

      <p className="rodada-info">
        Rodada {rodadaAtual}/{TOTAL_RODADAS}
      </p>

      <div className="area-jogadores">
        <div className={`card-jogador ${vezDoJogador === 1 ? 'vez-ativa' : ''}`}>
          <p className="nome-jogador">Jogador 1</p>
          <div className="dados-jogador">
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </div>
          <button
            className="btn-jogador1"
            onClick={jogarJogador1}
            disabled={vezDoJogador !== 1}
          >
            Jogar
          </button>
        </div>

        {/* linha vertical entre as duas colunas, igual ao traço do quadro */}
        <div className="divisoria" />

        <div className={`card-jogador ${vezDoJogador === 2 ? 'vez-ativa' : ''}`}>
          <p className="nome-jogador">Jogador 2</p>
          <div className="dados-jogador">
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>
          <button
            className="btn-jogador2"
            onClick={jogarJogador2}
            disabled={vezDoJogador !== 2}
          >
            Jogar
          </button>
        </div>
      </div>

      <div className="placar">
        <span>Jogador 1: {placar.jogador1}</span>
        <span>Empates: {placar.empates}</span>
        <span>Jogador 2: {placar.jogador2}</span>
      </div>

      <div className="mensagem-box">
        {mensagemAtual || 'MENSAGEM'}
      </div>

      {jogoFinalizado && (
        <button className="btn-reiniciar" onClick={jogarNovamente}>
          Jogar novamente
        </button>
      )}
    </div>
  );
}
