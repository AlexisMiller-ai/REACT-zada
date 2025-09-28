export default function Keyboard({ onPress, disabled, guessed }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard">
      {alphabet.map((ch) => {
        const used = guessed.has(ch);
        return (
          <button
            key={ch}
            className={`key ${used ? "used" : ""}`}
            onClick={() => !disabled && onPress(ch)}
            disabled={disabled || used}
          >
            {ch}
          </button>
        );
      })}

      <style jsx>{`
        .keyboard {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
          justify-content: center;
        }
        .key {
          min-width: 38px;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: white;
          cursor: pointer;
        }
        .key.used {
          opacity: 0.55;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
