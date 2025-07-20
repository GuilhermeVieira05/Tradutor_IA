# Tradutor Web

## 📋 Descrição

Este projeto é uma aplicação web para tradução de textos entre diferentes idiomas. Feito em React, ele conta com uma interface moderna, responsiva e fácil de usar — funcionando perfeitamente em computadores, tablets e celulares.

## ✨ Funcionalidades

- Tradução de textos diretamente no navegador.
- Seleção intuitiva de idioma de origem e destino.
- Layout bonito, leve e 100% responsivo.
- Feedback visual para carregamento e exibição do resultado.

## 🚀 Tecnologias Utilizadas

- [React](https://react.dev/)
- CSS3 com gradientes, sombras e responsividade
- Integração com APIs de backend
- LangChain
- FastApi
- SQLite

## 🛠️ Como rodar o projeto localmente

### 1. Clone este repositório

```bash
git clone https://github.com/GuilhermeVieira05/Tradutor_IA.git
cd TradutorIA
```

## 🛠️ Instalação das Dependências

### Frontend (React)

Para instalar as dependências do frontend, rode, a partir da pasta principal:

```bash
cd tradutorIA
npm install
npm run dev
```

### Backend (Python)

#### Requisitos: 

- Python deve estar instalado na sua máquina.

Para instalar as dependências do backend, rode, a partir da pasta principal:

```bash
cd backend
python -m venv .venv
pip install requirements.txt
cd src/
python -m uvicorn main:app --reload
```

> **Observação:**  
> Para que o projeto funcione corretamente, você precisará informar a sua própria chave de API.  
> Crie um arquivo chamado `.env` na raiz do backend e inclua sua chave da seguinte forma:
>
> ```
> GEMINI_API_KEY=sua_chave_aqui
> ```
> 
> Substitua `sua_chave_aqui` pela chave fornecida pelo Gemini.
> 
>> Caso não possua essa chave, você pode obtê-la de graça:
>> Entre no site: [Google AI Studio](https://aistudio.google.com/app/apikey)
>> Crie uma conta (caso não tenha) e clique em **Criar Chave de API**
> 
> Sem essa configuração, algumas funcionalidades podem não funcionar corretamente.

## 📱 Responsividade

O layout do projeto é totalmente responsivo e se adapta automaticamente a diferentes tamanhos de tela, como computadores, tablets e celulares.  
Você pode acessar e utilizar todas as funcionalidades confortavelmente em qualquer dispositivo.

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas!  
Se você tem sugestões, encontrou algum bug ou gostaria de adicionar uma nova funcionalidade, sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.  
Juntos, podemos melhorar ainda mais este projeto! 🚀

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.  
Consulte o arquivo [LICENSE](LICENSE) para mais informações.
