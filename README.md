# 🎲 Jogo de Dados (Next.js)

Jogo entre 2 jogadores, disputado em 5 rodadas. Em cada rodada, cada jogador
joga 2 dados; vence quem tiver a maior soma. Ao final das 5 rodadas, vence
quem tiver mais rodadas ganhas.

## Estrutura do projeto

```
jogo-dados/
├── app/
│   ├── layout.js      # layout raiz (HTML base + metadados)
│   ├── page.js         # página inicial, monta o JogoDados
│   └── globals.css     # estilos (tema vaporwave)
├── components/
│   ├── Dado.jsx         # recebe a prop "valor" (1-6) e mostra a imagem
│   └── JogoDados.jsx    # lógica do jogo (estado, rodadas, placar)
├── public/dados/         # imagens SVG dos dados (1 a 6 + vazio)
├── package.json
└── next.config.js
```

## Como rodar localmente

Pré-requisito: ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

```bash
# 1. entre na pasta do projeto
cd jogo-dados

# 2. instale as dependências (baixa Next.js, React etc a partir do package.json)
npm install

# 3. rode o servidor de desenvolvimento
npm run dev
```

Depois abra http://localhost:3000 no navegador.

## Como subir para o GitHub

```bash
git init
git add .
git commit -m "Jogo de dados - primeira versão"
```

Crie um repositório novo e VAZIO no GitHub (sem README, sem .gitignore — você já tem
os seus), copie a URL dele e rode:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/jogo-dados.git
git push -u origin main
```

## Como publicar na Vercel

1. Acesse https://vercel.com e faça login com sua conta do GitHub.
2. Clique em "Add New... > Project".
3. Selecione o repositório `jogo-dados` que você acabou de subir.
4. A Vercel detecta automaticamente que é um projeto Next.js — não precisa mudar
   nenhuma configuração. Clique em "Deploy".
5. Em ~1 minuto você recebe uma URL pública (algo como `jogo-dados.vercel.app`).

## Sobre o vídeo de demonstração

Grave a tela (até 30s) mostrando: uma partida sendo jogada, a mensagem final
de quem venceu, e o clique no botão "Jogar Novamente". Suba no YouTube como
"Não listado" ou "Público" (nunca "Privado").
