import { useState, useMemo } from "react";
import HangmanSVG from "../../components/HangmanSVG.jsx";
import Keyboard from "../../components/Keyboard.jsx";

const WORDS = [
  "REACT",
  "JAVASCRIPT",
  "NEXTJS",
  "COMPONENTE",
  "ESTADO",
  "PROPRIEDADE",
  "HOOK",
  "ROTEAMENTO",
  "PROPS",
  "USUARIO",
  "SERVIDOR",
  "FRONTEND",
  "BACKEND",
  "FULLSTACK",
  "GITHUB",
  "DEPLOY",
  "BUILD",
  "INPUT",
  "VALIDACAO",
  "FORMULARIO",
  "CONTEXT",
  "REDUCER",
  "ARRAY",
  "OBJETO",
  "FUNCAO",
  "ASYNC",
  "PROMISE",
  "EVENTO",
  "ESTILO",
  "CSS",
  "HTML",
  "SVG",
  "TECLADO",
  "PALAVRA",
  "TENTATIVAS",
  "VITORIA",
  "DERROTA",
  "REINICIAR",
  "ALEATORIO",
  "AMBIENTE",
  "VARIAVEL",
];

const MAX_WRONG = 6;

function pickRandomWord() {
  const idx = Math.floor(Math.random() * WORDS.length);
  return WORDS[idx];
}

export default function Home() {
  const [word, setWord] = useState(() => pickRandomWord());
  const [guessed, setGuessed] = useState(() => new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [input, setInput] = useState("");

  const letters = useMemo(() => word.split(""), [word]);

  const isWon = letters.every((l) => guessed.has(l));
  const isLost = wrongCount >= MAX_WRONG;
  const gameOver = isWon || isLost;

  function handleGuessLetter(letter) {
    if (gameOver) return;
    letter = letter.toUpperCase();
    if (guessed.has(letter)) return;
    setGuessed((prev) => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });

    if (!letters.includes(letter)) {
      setWrongCount((c) => c + 1);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;
    const ch = input[0].toUpperCase();
    setInput("");
    handleGuessLetter(ch);
  }

  function resetGame() {
    setWord(pickRandomWord());
    setGuessed(new Set());
    setWrongCount(0);
    setInput("");
  }

  const displayed = letters.map((l, i) => (
    <span
      key={i}
      className={`letter ${guessed.has(l) || isLost ? "revealed" : ""}`}
    >
      {guessed.has(l) || isLost ? l : "_"}
    </span>
  ));

  const tried = Array.from(guessed).sort();

  return (
    <main className="container">
      <h1>Jogo da Forca</h1>

      <section className="game">
        <div className="left">
          <HangmanSVG wrongCount={wrongCount} maxWrong={MAX_WRONG} />
          <div className="status">
            <p>
              Tentativas restantes:{" "}
              <strong>{Math.max(0, MAX_WRONG - wrongCount)}</strong>
            </p>
            <div className="word">{displayed}</div>
          </div>
        </div>

        <div className="right">
          <form onSubmit={handleSubmit} className="letter-input">
            <input
              type="text"
              maxLength={1}
              value={input}
              onChange={(e) =>
                setInput(e.target.value.replace(/[^a-zA-Z]/g, ""))
              }
              placeholder="Digite uma letra"
              disabled={gameOver}
            />
            <button type="submit" disabled={gameOver || input.length === 0}>
              Enviar
            </button>
          </form>

          <Keyboard
            onPress={handleGuessLetter}
            disabled={gameOver}
            guessed={guessed}
          />

          <div className="tried">
            <h3>Letras tentadas</h3>
            <div className="tried-list">
              {tried.length === 0 ? (
                <span>-</span>
              ) : (
                tried.map((ch) => (
                  <span
                    key={ch}
                    className={letters.includes(ch) ? "correct" : "wrong"}
                  >
                    {ch}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="buttons">
            <button onClick={resetGame}>Reiniciar</button>
          </div>

          {isWon && (
            <div className="message victory">
              <h2>Parabéns — você venceu! 🎉</h2>
              <p>
                A palavra era <strong>{word}</strong>.
              </p>
            </div>
          )}

          {isLost && (
            <div className="message defeat">
              <h2>Você perdeu 😕</h2>
              <p>
                A palavra era <strong>{word}</strong>.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="credits">
        <code>npm run dev</code>
      </footer>

      <style jsx>{`
        .container {
          max-width: 1100px;
          margin: 24px auto;
          padding: 16px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #0f172a;
        }
        h1 {
          text-align: center;
          margin-bottom: 18px;
        }
        .game {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }
        .left {
          flex: 0 0 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .right {
          flex: 1;
        }
        .status {
          margin-top: 12px;
          text-align: center;
        }
        .word {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 12px;
          font-size: 28px;
          flex-wrap: wrap;
        }
        .letter {
          display: inline-block;
          width: 34px;
          height: 44px;
          line-height: 44px;
          border-bottom: 2px solid #e6eef6;
          text-align: center;
          border-radius: 6px;
        }
        .letter.revealed {
          background: #f1f8ff;
        }
        .letter-input {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          justify-content: center;
        }
        .letter-input input {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          width: 120px;
          font-size: 18px;
        }
        .letter-input button {
          padding: 10px 14px;
          border-radius: 6px;
          border: none;
          background: #2563eb;
          color: white;
          cursor: pointer;
        }
        .letter-input button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .tried {
          margin-top: 16px;
          text-align: center;
        }
        .tried-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .tried-list span {
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
        }
        .tried-list .correct {
          background: #ecfdf5;
          border-color: #34d399;
        }
        .tried-list .wrong {
          background: #fff1f2;
          border-color: #fda4af;
        }
        .buttons {
          margin-top: 14px;
          text-align: center;
        }
        .buttons button {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #94a3b8;
          background: white;
          cursor: pointer;
        }
        .message {
          margin-top: 16px;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
        }
        .victory {
          background: #ecfccb;
          border: 1px solid #bef264;
        }
        .defeat {
          background: #fff1f2;
          border: 1px solid #fda4af;
        }
        .credits {
          text-align: center;
          margin-top: 20px;
          color: #475569;
        }
        @media (max-width: 880px) {
          .game {
            flex-direction: column;
          }
          .left {
            order: 2;
          }
          .right {
            order: 1;
          }
        }
      `}</style>
    </main>
  );
}
