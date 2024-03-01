# Pet Info

## Descrição

Pet Info é uma plataforma que oferece informações sobre cuidados gerais com animais domésticos em formato de blog, abrangendo dicas, eventos e curiosidades. Os usuários podem acessar conteúdos ao se cadastrar e fazer login, interagindo em um contexto de autenticação.

## Features

- **Login e Cadastro:**
  - Formulários interativos para autenticação e registro.
  - Verificação de credenciais e interação com a API.
  - Página de cadastro com botão de retorno para o login, inputs para nome, email, foto de perfil e senha, e botão para envio de informações.
  - Notificação visual (toast) e redirecionamento para a página de login após o cadastro bem-sucedido.

- **Navbar e Perfil:**
  - Foto de perfil com menu estilo dropdown contendo nome do usuário e botão de logout.

- **Feed e Postagens:**
  - Renderização de postagens contidas na API.
  - Exibição de até 2 linhas do conteúdo de cada postagem no feed.
  - Link para modal com o conteúdo completo de cada postagem.
  - Botão de criar publicação para abrir modal com formulário.
  - Botão editar: abre modal de edição com título em input e conteúdo em textarea. Envio de dados para a API via método PATCH.
  - Botão excluir: abre modal de confirmação. Confirmação deleta a postagem via método DELETE na API. Notificação visual (toast) para deleção bem-sucedida.

## Demonstração
[Acesse o Projeto](https://redesigned-chainsaw-p1yknnk.pages.github.io/)
