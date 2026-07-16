# ⚽ Álbum Copa 2026

App (PWA) para o Luan controlar as figurinhas da Copa 2026 — rápido, leve e
igual ao tracker de bolinhas que ele já usava, mas **salvando sozinho** e
funcionando **offline** como um aplicativo de verdade.

## Como usar

- **Toque numa bolinha vazia** → figurinha **colada** (fica verde).
- **Toque de novo** → adiciona **+1 repetida** (aparece o número laranja).
- **Segure** a bolinha → **zera** aquela figurinha.
- No topo: total coladas / 980, porcentagem e quantas repetidas.
- **Filtrar**: digite o código ou nome do país (ex.: `BRA`, `Brasil`).
- **Índice**: toque num escudo para pular para o time.
- **⚙️ Menu**: instalar o app, baixar/restaurar backup, copiar a lista e
  recarregar a lista do Luan.

CC (extras) não contam no total de 980, igual ao álbum.

## Os dados não somem

1. Cada toque é salvo na hora no aparelho (localStorage + uma cópia de
   segurança). Não tem botão de salvar.
2. No **Menu → Baixar backup** dá pra guardar o álbum inteiro num arquivo e
   restaurar depois (celular novo, navegador limpo).
3. Depois de abrir uma vez, funciona **sem internet** (service worker).

## Publicar na Vercel

Projeto Vite estático — a Vercel detecta sozinho.

1. Suba o repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. Framework **Vite** (build `npm run build`, saída `dist`). Deploy.

Depois é só abrir no celular e **Adicionar à Tela de Início** para instalar.

## Rodar localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build de produção em dist/
npm run preview   # testar o build
```

## Atualizar a lista do Luan

- `src/data/album.ts` — times, ordem, quantidade de figurinhas por página e o
  objeto `INITIAL` com a coleção atual do Luan. É só colar a lista nova ali.

## Tech

Vite · React · TypeScript · `vite-plugin-pwa` (Workbox). Sem imagens externas:
só emojis e bolinhas, para ficar bem leve no celular.
