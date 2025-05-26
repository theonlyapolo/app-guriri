# App Guriri 🏖️

Um webapp turístico responsivo para a Praia de Guriri com mapas integrados, informações locais e serviços úteis.
https://app-guriri-ocq2n4i9k-paolas-projects-2e3c5e3b.vercel.app

## 📱 Sobre o Projeto

O **App Guriri** é um guia turístico completo da Praia de Guriri em São Mateus, ES. O aplicativo oferece:

- 🗺️ **Mapas Interativos** - Visualização da área urbana de Guriri com Google Maps
- 🏨 **Estabelecimentos** - Hotéis, pousadas e restaurantes locais
- 🛣️ **Roteiros** - Sugestões de itinerários turísticos
- 🚨 **Emergências** - Contatos de emergência e formulário de denúncias
- 📱 **PWA** - Instalável como aplicativo nativo no dispositivo

## 🚀 Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Estilização**: Tailwind CSS + shadcn/ui
- **Mapas**: Google Maps API
- **Roteamento**: Wouter
- **Formulários**: React Hook Form + Zod
- **Estado**: TanStack Query

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/app-guriri.git
cd app-guriri
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
VITE_GOOGLE_MAPS_API_KEY=sua_chave_do_google_maps
```

4. Execute o projeto:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5000`

## 🌐 Deploy

Este projeto está otimizado para deploy no Replit, mas pode ser implantado em qualquer plataforma que suporte Node.js.

## 📁 Estrutura do Projeto

```
app-guriri/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── lib/            # Utilitários e configurações
│   │   └── hooks/          # Custom hooks
│   ├── public/             # Arquivos estáticos
│   └── index.html          # Entrada do app
├── server/                 # Backend Express
│   ├── index.ts           # Servidor principal
│   ├── routes.ts          # Rotas da API
│   └── storage.ts         # Camada de dados
├── shared/                # Tipos e schemas compartilhados
└── README.md
```

## 🗺️ Funcionalidades

### Mapa Interativo
- Visualização da área urbana de Guriri
- Marcadores para hotéis e restaurantes
- Integração com Google Maps

### Estabelecimentos
- Lista de hotéis e restaurantes
- Informações detalhadas (telefone, endereço, avaliações)
- Visualização no mapa

### Roteiros Turísticos
- Sugestões de itinerários de 1 a 3 dias
- Diferentes níveis de dificuldade
- Atividades recomendadas

### Sistema de Emergência
- Contatos de emergência (Polícia, Bombeiros, SAMU)
- Formulário para denúncias ambientais
- Interface intuitiva para situações críticas

## 📱 PWA (Progressive Web App)

O App Guriri é um PWA completo que oferece:

- ✅ Instalação na tela inicial
- ✅ Funcionamento offline básico
- ✅ Ícone personalizado
- ✅ Splash screen
- ✅ Interface nativa no mobile

## 🔑 API Key

Para utilizar os mapas, você precisa de uma chave da Google Maps API:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a Maps JavaScript API
4. Crie uma chave de API
5. Configure as restrições adequadas
6. Adicione a chave no arquivo `.env`

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Desenvolvido para promover o turismo sustentável em Guriri, ES.

---

**App Guriri** - Descobrindo o paraíso capixaba! 🌊
