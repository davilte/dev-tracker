# DevTracker

Aplicativo mobile desenvolvido com React Native e Expo para buscar e visualizar informações de usuários e repositórios do GitHub.

## 📱 Sobre o projeto

O DevTracker é uma aplicação mobile multiplataforma (iOS e Android) que permite aos usuários buscar desenvolvedores no GitHub, visualizar seus perfis, listar seus repositórios e acessar detalhes completos de cada repositório. O projeto foi desenvolvido utilizando as melhores práticas de desenvolvimento mobile com Expo, TypeScript e React Native.

### Principais características técnicas:
- **Framework**: Expo SDK 54 com React Native 0.81.5
- **Linguagem**: TypeScript com strict mode
- **Roteamento**: Expo Router (file-based routing)
- **Gerenciamento de Estado**: Redux Toolkit
- **Estilização**: NativeWind (Tailwind CSS para React Native)
- **Arquitetura**: Nova arquitetura do React Native habilitada
- **Tema**: Suporte completo a modo claro/escuro com detecção automática

## ✨ Funcionalidades

### 🔍 Busca de Usuários
- Busca em tempo real de usuários do GitHub
- Sugestões automáticas enquanto digita (debounce implementado)
- Lista de resultados com avatar e informações básicas
- Navegação direta para o perfil do usuário

### 👤 Perfil de Usuário
- Visualização completa do perfil do desenvolvedor
- Avatar em destaque
- Informações pessoais (nome, email, bio)
- Estatísticas de seguidores e seguindo
- Navegação para lista de repositórios

### 📦 Lista de Repositórios
- Lista todos os repositórios de um usuário
- Ordenação por:
  - Mais estrelas
  - Menos estrelas
  - Nome A-Z
  - Nome Z-A
- Interface otimizada com FlatList para performance
- Navegação para detalhes do repositório

### 📄 Detalhes do Repositório
- Informações completas do repositório
- Estatísticas (estrelas, forks, linguagem)
- Descrição do projeto
- Link para abrir no navegador
- Status do repositório (aberto/fechado)

### 🎨 Interface e UX
- Modo escuro/claro com detecção automática do sistema
- Menu lateral para configurações
- Navegação intuitiva com botões de voltar
- Loading states e tratamento de erros
- Safe Area handling para diferentes dispositivos
- Animações suaves e feedback háptico

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── api/              # Cliente Axios configurado para GitHub API
├── app/              # Rotas do Expo Router (file-based routing)
│   ├── index.tsx     # Rota inicial (redireciona para /search)
│   ├── search.tsx    # Tela de busca
│   ├── user/         # Rotas de usuário
│   │   └── [username].tsx
│   ├── repos/        # Rotas de repositórios
│   │   └── [username].tsx
│   └── repo/         # Rotas de detalhes de repositório
│       └── [fullname].tsx
├── components/       # Componentes reutilizáveis
│   ├── ui/           # Componentes de UI base
│   │   ├── Avatar.tsx
│   │   ├── Button.tsx
│   │   ├── CircularButton.tsx
│   │   ├── SafeAreaContainer.tsx
│   │   └── SearchInput.tsx
│   ├── RepoItem.tsx
│   ├── ReposSortSelector.tsx
│   ├── SearchForm.tsx
│   ├── SearchHeader.tsx
│   ├── SideMenu.tsx
│   ├── UserCard.tsx
│   ├── UserListItem.tsx
│   └── UserSuggestionsList.tsx
├── contexts/         # Contextos React
│   └── ThemeContext.tsx
├── hooks/            # Custom hooks
│   ├── useDebouncedValue.ts
│   ├── useGithubSearch.ts
│   ├── useRepoDetails.ts
│   ├── useRepos.ts
│   └── useUserDetails.ts
├── services/         # Serviços de API
│   └── githubService.ts
├── store/            # Redux store e slices
│   ├── index.ts
│   ├── reposSlice.ts
│   └── userSlice.ts
└── types/            # Definições TypeScript
    └── github.d.ts
```

### Fluxo de Dados

1. **API Layer**: Cliente Axios configurado em `src/api/github.ts`
2. **Service Layer**: Funções de serviço em `src/services/githubService.ts`
3. **State Management**: Redux Toolkit para estado global
4. **Custom Hooks**: Hooks personalizados para lógica de negócio
5. **Components**: Componentes funcionais com TypeScript

### Tecnologias e Bibliotecas

#### Core
- **Expo SDK 54**: Framework para desenvolvimento mobile
- **React Native 0.81.5**: Framework base
- **React 19.1.0**: Biblioteca UI
- **TypeScript 5.9.2**: Tipagem estática

#### Navegação e Roteamento
- **Expo Router 6.0.14**: Roteamento baseado em arquivos
- **React Navigation 7.1.8**: Navegação nativa

#### Estado e Dados
- **Redux Toolkit 2.10.1**: Gerenciamento de estado
- **React Redux 9.2.0**: Bindings React para Redux
- **Axios 1.13.2**: Cliente HTTP

#### UI e Estilização
- **NativeWind 4.2.1**: Tailwind CSS para React Native
- **Tailwind CSS 3.4.17**: Framework de utilitários CSS
- **Expo Vector Icons**: Ícones


## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI (instalado globalmente ou via npx)
- Para desenvolvimento iOS: Xcode (apenas macOS)
- Para desenvolvimento Android: Android Studio

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd DevTracker
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

   Ou use os comandos específicos:
   ```bash
   npm run android    # Para Android
   npm run ios        # Para iOS (apenas macOS)
   ```

### Executando em Dispositivos

#### Android
- Conecte um dispositivo Android via USB com depuração USB habilitada, ou
- Abra um emulador Android no Android Studio
- Execute `npm run android` ou pressione `a` no terminal do Expo

#### iOS
- Abra o Simulador do iOS (apenas macOS)
- Execute `npm run ios` ou pressione `i` no terminal do Expo


### Scripts Disponíveis

```bash
npm start          # Inicia o servidor Expo
npm run android    # Executa no Android
npm run ios        # Executa no iOS
npm run web        # Executa no navegador
npm run lint       # Executa o linter
npm test           # Executa os testes
```

## 🌿 Fluxo de GitFlow usado

O projeto utiliza o **GitFlow** como estratégia de gerenciamento de branches. O fluxo está estruturado da seguinte forma:

### Branches Principais

- **`master`**: Branch de produção, contém apenas código estável e testado
- **`develop`**: Branch de desenvolvimento, onde as features são integradas antes de ir para produção

### Branches de Feature

Todas as novas funcionalidades são desenvolvidas em branches separadas seguindo o padrão:
```
feature/nome-da-feature
```

**Exemplo de branches criadas:**
- `feature/structure` - Estrutura inicial do projeto
- `feature/redux` - Configuração do Redux store
- `feature/search` - Tela de busca e modo escuro
- `feature/user-detail` - Tela de detalhes do usuário
- `feature/repos` - Lista de repositórios com ordenação
- `feature/repo-details` - Tela de detalhes do repositório


### Padrão de Commits

O projeto segue o padrão de commits convencionais:

```
tipo(escopo): descrição curta

tipo: feat, fix, chore, docs, style, refactor, test
escopo: api, store, components, hooks, etc.
```

**Exemplos de commits do projeto:**
- `feat(structure): add project architecture and expo-router layout`
- `feat(api): add GitHub axios client and TS types`
- `feat(store): configure Redux store and user/repos slices`
- `feat(search): implement search screen with suggestions and dark mode`
- `feat(user-detail): implement user details screen`
- `feat(repos): implement user repos flatlist with sorting`
- `feat(repo-details): implement repo details screen`

## 📝 Outras Informações Importantes

### Configuração do Projeto

- **Package Name (Android)**: `com.davilte.DevTracker`
- **Bundle Identifier**: Configurado no `app.json`
- **Nova Arquitetura**: Habilitada (`newArchEnabled: true`)
- **React Compiler**: Habilitado experimentalmente
- **Typed Routes**: Habilitado para type-safety nas rotas



### Linting e Formatação

O projeto utiliza ESLint e Prettier para manter a qualidade do código:

```bash
npm run lint
```

### Estrutura de Componentes

Os componentes seguem uma arquitetura modular:
- **UI Components**: Componentes base reutilizáveis em `components/ui/`
- **Feature Components**: Componentes específicos de funcionalidades
- **TypeScript**: Todos os componentes são tipados
- **Functional Components**: Uso exclusivo de componentes funcionais

### Performance

- **FlatList**: Utilizado para listas longas (repositórios)
- **Image Optimization**: Expo Image para carregamento otimizado
- **Debounce**: Implementado na busca para reduzir requisições
- **Memoization**: Componentes memoizados quando necessário

### Acessibilidade

- Suporte a Safe Area em todos os dispositivos
- Suporte a modo escuro/claro
- Componentes acessíveis com props nativas do React Native

## 📚 Recursos e Documentação

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [GitHub API Documentation](https://docs.github.com/en/rest)


---
