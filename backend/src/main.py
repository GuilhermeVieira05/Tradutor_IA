from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain_community.cache import SQLiteCache
from langchain.globals import set_llm_cache
import os
from dotenv import load_dotenv
load_dotenv()

GEMINI_KEY = os.environ['GEMINI_API_KEY'] 

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TraducaoRequest(BaseModel):
    texto: str
    idioma_destino: str  

class TraducaoResponse(BaseModel):
    texto_traduzido: str


@app.post("/traduzir", response_model=TraducaoResponse)
async def traduzir(req: TraducaoRequest):
    if not GEMINI_KEY:
        raise HTTPException(status_code=500, detail="Chave de API do Gemini não configurada.")

    model = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=GEMINI_KEY)
    set_llm_cache(
        SQLiteCache(database_path="openai_cache.db")
    )

    prompt = ChatPromptTemplate.from_messages([
        (
            "system",
            "Você é um tradutor profissional. Identifique o idioma e traduza para o {idioma_destino}, retornando APENAS o texto traduzido. Tente entender o contexto do texto para uma tradução mais precisa, mas nenhuma outra informação deve ser retornada. Tente identificar gírias e expressões idiomáticas"
        ),
        (
            "user",
            "Traduza para {idioma_destino}: {texto}"
        )
    ])
    chain = prompt | model
    try:
        output = await chain.ainvoke({
            "idioma_destino": req.idioma_destino,
            "texto": req.texto
        })
        texto_traduzido = output.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return TraducaoResponse(texto_traduzido=texto_traduzido)