import { useState } from 'react'
import styles from './Tradutor.module.css'

const idiomas = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'Inglês' },
  { value: 'es', label: 'Espanhol' },
  { value: 'fr', label: 'Francês' },
  { value: 'de', label: 'Alemão' },
  { value: 'it', label: 'Italiano' },
  { value: 'ja', label: 'Japonês' },
  { value: 'zh', label: 'Chinês' },
  { value: 'ru', label: 'Russo' },
  { value: 'ar', label: 'Árabe' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ko', label: 'Coreano' },
  { value: 'nl', label: 'Holandês' },
  { value: 'sv', label: 'Sueco' },
  { value: 'no', label: 'Norueguês' },
  { value: 'da', label: 'Dinamarquês' },
  { value: 'fi', label: 'Finlandês' },
  { value: 'pl', label: 'Polonês' },
  { value: 'tr', label: 'Turco' },
  { value: 'cs', label: 'Checo' },
  { value: 'el', label: 'Grego' },
  { value: 'hu', label: 'Húngaro' },
  { value: 'ro', label: 'Romeno' },
  { value: 'bg', label: 'Bulgaro' },
  { value: 'uk', label: 'Ucraniano' },
  { value: 'he', label: 'Hebraico' },
  { value: 'th', label: 'Tailandês' },
  { value: 'vi', label: 'Vietnamita' },
  { value: 'id', label: 'Indonésio' },
  { value: 'ms', label: 'Malaio' },
  { value: 'tl', label: 'Tagalo' },
  { value: 'sw', label: 'Suaíli' },
  { value: 'af', label: 'Africâner' },
  { value: 'is', label: 'Islandês' },
  { value: 'lt', label: 'Lituano' },
  { value: 'lv', label: 'Letão' },
  { value: 'et', label: 'Estoniano' },
  { value: 'sl', label: 'Esloveno' },
  { value: 'sk', label: 'Eslovaco' },
  { value: 'hr', label: 'Croata' },
  { value: 'sr', label: 'Sérvio' },
  { value: 'bs', label: 'Bósnio' },
  { value: 'mk', label: 'Macedônio' },
  { value: 'sq', label: 'Albanês' },
  { value: 'hy', label: 'Armênio' },
  { value: 'az', label: 'Azerbaijano' },
  { value: 'ka', label: 'Georgiano' },
  { value: 'mn', label: 'Mongol' },
  { value: 'uz', label: 'Uzbeque' },
  { value: 'tg', label: 'Tajique' },
  { value: 'ky', label: 'Quirguiz' },
  { value: 'tk', label: 'Turcomeno' },
  { value: 'ps', label: 'Pashto' },
  { value: 'fa', label: 'Persa' },
  { value: 'ur', label: 'Urdu' },
  { value: 'bn', label: 'Bengali' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'ta', label: 'Tâmil' },
  { value: 'te', label: 'Telugu' },
  { value: 'kn', label: 'Canarês' },
  { value: 'ml', label: 'Malaiala' },
  { value: 'mr', label: 'Marathi' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'as', label: 'Assamês' },
  { value: 'or', label: 'Oriya' },
  { value: 'si', label: 'Cingalês' },
  { value: 'my', label: 'Birmanês' },
  { value: 'km', label: 'Cambojano' },
  { value: 'lo', label: 'Lao' },
  { value: 'ne', label: 'Nepalês' },
  { value: 'mn', label: 'Mongol' },
  { value: 'zu', label: 'Zulu' },
  { value: 'xh', label: 'Xhosa' },
  { value: 'af', label: 'Africâner' },
  { value: 'sw', label: 'Suaíli' },
  { value: 'yo', label: 'Iorubá' }
]

export default function Tradutor() {
  const [texto, setTexto] = useState('')
  const [idioma, setIdioma] = useState('en')
  const [resultado, setResultado] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function traduzir(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault() // PREVINE O RELOAD DO FORM

    setCarregando(true)
    setResultado('Traduzindo...')

    try {
      const resposta = await fetch('http://localhost:8000/traduzir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          texto,
          idioma_destino: idioma
        })
      })
      console.log(resposta)
      if (!resposta.ok) {
        throw new Error('Erro ao traduzir')
      }

      const dados = await resposta.json()
      console.log(dados)
      setResultado(dados.texto_traduzido || '(sem resultado)')
    } catch (err) {
      setResultado('Erro ao traduzir')
    }

    setCarregando(false)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tradutor</h1>
      <form className={styles.form} onSubmit={traduzir}>
        <label className={styles.label}>Texto para traduzir:</label>
        <textarea
          className={styles.textarea}
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Digite o texto aqui..."
        />

        <label className={styles.label}>Idioma de destino:</label>
        <select
          className={styles.select}
          value={idioma}
          onChange={e => setIdioma(e.target.value)}
        >
          {idiomas.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <button type="submit" className={styles.button} disabled={carregando}>
          {carregando ? 'Traduzindo...' : 'Traduzir'}
        </button>
      </form>

      <label className={styles.label} style={{marginTop: 20}}>Tradução:</label>
      <textarea
        className={styles.textarea}
        value={resultado}
        readOnly
        placeholder="O resultado aparecerá aqui..."
      />
    </div>
  )
}