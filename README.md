# Calculadora React

Pequena calculadora construída com Create React App. Este repositório contém uma versão com hot-reload (modo desenvolvimento) dentro de container e também uma configuração para build de produção com Nginx.

## Requisitos

- Docker e Docker Compose (para executar em containers), eu uso WSL2 com Docker Enginne
- Node.js (somente para desenvolvimento local sem Docker)

## Executando com Docker Compose

Incluí duas opções no `docker-compose.yml`:

- Desenvolvimento (usa o servidor de desenvolvimento do React para hot-reload)
- Build de produção com um `Dockerfile` multi-stage que serve via Nginx

### Levantar em modo desenvolvimento (hot-reload)

1. Certifique-se de que o Docker e o Docker Compose estão instalados.
2. No diretório do projeto, execute:

```bash
docker compose up --build
```

Isto cria um container que expõe a aplicação em `http://localhost:3000` com hot-reload habilitado. As alterações em `src/` e `public/` serão refletidas automaticamente.

## Scripts locais (sem Docker)

No diretório do projeto:

Instale dependências:

```bash
npm install
```

Executar em modo desenvolvimento:

```bash
npm start
```

Build de produção:

```bash
npm run build
```

### Build de produção (Nginx)

Se preferir rodar a versão de produção servida por Nginx, há um `Dockerfile` multi-stage que gera os arquivos estáticos e um `nginx.conf` para servir a aplicação.

Para criar a imagem de produção manualmente:

```bash
docker build -t calculadora-prod -f Dockerfile .
```

E para rodar um container baseado na imagem:

```bash
docker run --rm -p 3000:80 calculadora-prod
```

A aplicação ficará disponível em `http://localhost:3000`.

## Mapas rápidos de teclas (teclado)

A calculadora suporta entrada via teclado (teclas numéricas e numpad), operadores (`+ - * /`), `%`, Enter (para `=`), `Backspace` e `Escape` para limpar. Também há destaque visual do botão quando a tecla correspondente é pressionada.

- Números: 0-9 (principal e numpad)
- Operadores: `+`, `-`, `*` (multiplicação), `/` (divisão)
- `Enter` ou `=`: calcula
- `%`: porcentagem
- `.` ou `,`: decimal
- `Backspace` / `Escape`: limpar

## Observações e próximos passos

- O botão `+/-` inverte o sinal do número mostrado.
- A vírgula `,` é aceita como separador decimal e normalizada internamente.
- Backspace atualmente faz um clear total;


---
---

### 👨‍💻 Expert

<p>
<img 
      align="left" 
      style="margin: 10px; width: 80px; border-radius: 50%;" 
      src="https://avatars.githubusercontent.com/u/52001930?s=400&u=fb999c966c5c652a8357cbede4b1112e79cbfe18&v=4" 
/>
    <p style="padding-top:25px">&nbsp&nbsp&nbsp Wagner Andrade<br>
    &nbsp&nbsp&nbsp
    <a href="https://github.com/wsawebmaster">
    GitHub</a>&nbsp;|&nbsp;
    <a href="https://www.linkedin.com/in/
wsawebmaster">LinkedIn</a>
&nbsp;|&nbsp;
<a href="mailto:wsawebmaster@yahoo.com.br">
    Email</a>
  &nbsp;|&nbsp;
</p>
</p>