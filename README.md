# React + Vite

## HTML estático de produção

`npm run build` compila o cliente e pré-renderiza início, blog e privacidade
em `dist/index.html`, `dist/blog.html` e `dist/privacy.html`. O React hidrata
esse HTML no navegador para ativar menus, idiomas e formulários.
O HTML inicial é em português; a preferência de idioma é aplicada após a hidratação.
As ferramentas de sorteio e suas bases de dados não fazem parte deste site público.
Os antigos endereços de sorteio e `/data/` retornam HTTP 410 no Nginx.

Após o build, `npm run test:ssg` verifica o conteúdo e as metatags nos arquivos gerados.

O hero usa imagem estática por padrão. O vídeo MP4 (H.264, 1280×720, 24 fps,
sem áudio, cerca de 310 KB) só é carregado acima de 935 px e sem preferência por
movimento reduzido. A reprodução usa loop nativo e pausa fora da tela ou em aba
oculta. `prefers-reduced-motion` também desativa animações de entrada e contadores.
O teste do build exige vídeo menor que 1 MB e ausência de vídeo no HTML inicial.

O build também gera canonical, Open Graph e Twitter Card para as páginas públicas.
A origem padrão é `https://deborapaiva.adv.br`; use `SITE_URL=https://seu-dominio npm run build`
para outra origem. O Dockerfile já executa esse mesmo build; não é necessário Node no servidor final.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
