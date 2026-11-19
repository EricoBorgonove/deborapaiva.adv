# React + Vite

## HTML estático de produção

`npm run build` compila o cliente e pré-renderiza início, blog e privacidade
em 12 arquivos HTML: início, blog e privacidade em português, inglês, espanhol
e francês. O React hidrata esse HTML no navegador para ativar menus e formulários.
O idioma vem da URL, sem redirecionamento por navegador ou armazenamento local.
Português usa `/`, inglês `/en/`, espanhol `/es/` e francês `/fr/`.
Blog e privacidade mantêm seus nomes dentro de cada prefixo, como `/en/blog.html`.
Os seletores são links que preservam a página atual ao trocar de idioma.
As ferramentas de sorteio e suas bases de dados não fazem parte deste site público.
Os antigos endereços de sorteio e `/data/` retornam HTTP 410 no Nginx.

Após o build, `npm run test:ssg` verifica o conteúdo e as metatags nos arquivos gerados.

O hero usa imagem estática por padrão. O vídeo MP4 (H.264, 1280×720, 24 fps,
sem áudio, cerca de 310 KB) só é carregado acima de 935 px e sem preferência por
movimento reduzido. A reprodução usa loop nativo e pausa fora da tela ou em aba
oculta. `prefers-reduced-motion` também desativa animações de entrada e contadores.
O teste do build exige vídeo menor que 1 MB e ausência de vídeo no HTML inicial.

O build também gera canonical próprio, Open Graph, Twitter Card e hreflang
recíproco (pt-BR/en/es/fr e x-default apontando ao português) para cada página.
O sitemap inclui as 12 URLs canônicas. `src/siteRoutes.js` centraliza as rotas.
`npm run dev` aceita as URLs localizadas; para conferir o HTML estático use
`npm run build && npm run preview`.
A origem padrão é `https://deborapaiva.adv.br`; use `SITE_URL=https://seu-dominio npm run build`
para outra origem. O Dockerfile já executa esse mesmo build; não é necessário Node no servidor final.

## SEO local e entrega HTTP

O JSON-LD descreve LegalService e WebSite com telefone e área atendida (Manaus),
além de WebPage com o idioma e a URL da versão correspondente.
O atendimento é somente com hora marcada. Endereço físico e horários fixos foram
omitidos por decisão da proprietária; o schema não promete elegibilidade a rich results.

`public/robots.txt` é copiado para o build; o sitemap é gerado a partir das rotas,
com a origem ajustada por `SITE_URL`. A cópia em `public/sitemap.xml` documenta
as URLs padrão. O Nginx devolve 404 para caminhos inexistentes e 410 para
os antigos caminhos de sorteio. Não há fallback universal para a home.

O HTML usa `no-cache`; fotos e logos sem hash usam cache de uma hora com revalidação.
Bundles, fontes e mídias com hash de conteúdo usam `immutable` por um ano.
Arquivos legados sem hash continuam com cache de uma hora. Erros usam `no-store`.
Os cabeçalhos de segurança são aplicados também a erros. A CSP permite fontes e
estilos somente da própria origem. O proxy TLS deve sobrescrever `X-Forwarded-Proto`, manter o
contêiner privado e redirecionar HTTP para HTTPS; o HSTS depende desse sinal confiável.

Após `docker build -t site-deb:check .`, execute um contêiner na porta local 4180
e rode `node scripts/check-http.mjs`. Use `BASE_URL` para outra instância.
O resultado de `node scripts/audit-history.mjs` permanece não zero enquanto o GitHub
servir o commit antigo. O pedido ao suporte está em `docs/github-support-request.md`.

## Fonte local

A Manrope variável é empacotada em `src/assets/fonts/manrope-variable.woff2`.
O arquivo contém os pesos 200–800 e os caracteres da distribuição original,
incluindo os acentos usados em português, inglês, espanhol e francês.
O Vite gera um nome com hash e o Nginx usa cache imutável para esse arquivo.
`font-display: swap` mantém o texto visível durante o carregamento.

Origem: https://github.com/google/fonts/tree/main/ofl/manrope
O TTF original foi comprimido em WOFF2 com FontTools, sem subsetting.
A licença SIL OFL 1.1 está incluída em `public/licenses/manrope-OFL.txt`.
O navegador não depende da API ou do CDN do Google Fonts para carregar a fonte.

## Atualização de fotos, logos e vídeo

As mídias em uso estão em `src/assets/` e são importadas por `src/media.js`, pelo CSS
ou pelo HTML de entrada. Ao substituir um arquivo, o Vite gera uma URL diferente
com hash de conteúdo. Não é necessário escolher manualmente um novo nome.
O HTML, o CSS, o cliente React, o Open Graph e o JSON-LD usam os mesmos URLs emitidos.
Isso evita reutilizar a versão antiga mesmo em navegadores ou proxies que a guardem
por um ano. Os antigos URLs sem hash da foto e do vídeo não são mais publicados.
Depois da implantação, confira a URL que está no HTML novo, não a do arquivo antigo.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
