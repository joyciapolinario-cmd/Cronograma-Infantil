# Cronograma Infantil

App em React para montar e imprimir a rotina semanal das crianças.

## Como rodar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Validação contínua

O GitHub Actions valida cada `push` e `pull_request` com Node.js 24,
executando `npm ci` e `npm run build`. O `package-lock.json` versionado
mantém a instalação reproduzível. Para executar a mesma validação localmente:

```bash
npm ci
npm run build
```
