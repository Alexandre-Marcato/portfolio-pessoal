# Especificações Técnicas - Portfólio Pessoal

## Visão Geral
Este projeto é um portfólio pessoal desenvolvido com tecnologias modernas para apresentar informações profissionais, habilidades e projetos de um desenvolvedor full stack. O site foi construído com foco em design responsivo, animações sutis e experiência de usuário agradável.

## Stack Tecnológica

### Frontend
- **Framework**: Next.js 15.3.2
- **Linguagem**: TypeScript 5+
- **Biblioteca de UI**: React 19.0.0
- **Estilização**: Tailwind CSS 4
- **Animações**: Framer Motion 12.11.3

### Características Técnicas
- Aplicação de página única (SPA)
- Design responsivo para diferentes dispositivos
- Modo claro/escuro
- Animações suaves e interativas
- Otimização para SEO

## Estrutura do Projeto

```
portfolio-pessoal/
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globais
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Página inicial
│   └── components/
│       ├── Header.tsx       # Barra de navegação
│       ├── Hero.tsx         # Seção principal (banner)
│       ├── About.tsx        # Seção "Sobre mim"
│       ├── Projects.tsx     # Portfólio de projetos
│       ├── Contact.tsx      # Formulário de contato
│       ├── Footer.tsx       # Rodapé
│       └── ThemeToggle.tsx  # Alternador de tema
└── public/
    └── [recursos estáticos]
```

## Componentes Principais

### Header
Barra de navegação responsiva com links para as diferentes seções do site.

### Hero
Seção inicial com apresentação do desenvolvedor e chamada para ação.

### About
Apresentação detalhada do desenvolvedor, incluindo habilidades técnicas representadas visualmente.

### Projects
Galeria de projetos com sistema de filtragem por categorias (web, app, design).

### Contact
Formulário de contato para comunicação direta.

### Footer
Rodapé com informações de copyright e links para redes sociais.

## Funcionalidades

- **Navegação Suave**: Rolagem automática para seções ao clicar nos links do menu
- **Alternância de Tema**: Suporte para modo claro e escuro
- **Animações**: Efeitos de entrada e saída dos componentes utilizando Framer Motion
- **Filtragem de Projetos**: Possibilidade de filtrar projetos por categoria
- **Formulário de Contato**: Interface para envio de mensagens

## Requisitos do Sistema

- Node.js 18.0.0 ou superior
- NPM 8.0.0 ou superior

## Comandos Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com Turbopack
- `npm run build`: Cria uma versão otimizada para produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa verificação de qualidade de código

## Acessibilidade
O projeto foi desenvolvido seguindo boas práticas de acessibilidade, incluindo:
- Estrutura semântica HTML
- Contraste adequado entre texto e fundo
- Suporte para navegação por teclado
- Textos alternativos para imagens

## Performance
- Otimização de imagens
- Carregamento sob demanda (lazy loading)
- Minimização de CSS e JavaScript
- Divisão de código (code splitting) 