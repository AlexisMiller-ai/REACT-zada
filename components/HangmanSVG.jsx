export default function HangmanSVG({ wrongCount = 0, maxWrong = 6 }) {
  return (
    <svg viewBox="0 0 200 240" width="320" height="380" aria-hidden>
      <line x1="10" y1="230" x2="190" y2="230" stroke="#333" strokeWidth="4" />
      <line x1="50" y1="230" x2="50" y2="20" stroke="#333" strokeWidth="4" />
      <line x1="48" y1="20" x2="140" y2="20" stroke="#333" strokeWidth="4" />
      <line x1="140" y1="20" x2="140" y2="40" stroke="#333" strokeWidth="4" />

      {wrongCount > 0 && (
        <circle
          cx="140"
          cy="60"
          r="18"
          stroke="#111"
          strokeWidth="3"
          fill="transparent"
        />
      )}
      {wrongCount > 1 && (
        <line
          x1="140"
          y1="78"
          x2="140"
          y2="130"
          stroke="#111"
          strokeWidth="3"
        />
      )}
      {wrongCount > 2 && (
        <line
          x1="140"
          y1="92"
          x2="118"
          y2="110"
          stroke="#111"
          strokeWidth="3"
        />
      )}
      {wrongCount > 3 && (
        <line
          x1="140"
          y1="92"
          x2="162"
          y2="110"
          stroke="#111"
          strokeWidth="3"
        />
      )}
      {wrongCount > 4 && (
        <line
          x1="140"
          y1="130"
          x2="118"
          y2="162"
          stroke="#111"
          strokeWidth="3"
        />
      )}
      {wrongCount > 5 && (
        <line
          x1="140"
          y1="130"
          x2="162"
          y2="162"
          stroke="#111"
          strokeWidth="3"
        />
      )}

      {wrongCount >= maxWrong && (
        <>
          <line
            x1="134"
            y1="54"
            x2="138"
            y2="58"
            stroke="#111"
            strokeWidth="2"
          />
          <line
            x1="138"
            y1="54"
            x2="134"
            y2="58"
            stroke="#111"
            strokeWidth="2"
          />
          <line
            x1="146"
            y1="54"
            x2="150"
            y2="58"
            stroke="#111"
            strokeWidth="2"
          />
          <line
            x1="150"
            y1="54"
            x2="146"
            y2="58"
            stroke="#111"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}
