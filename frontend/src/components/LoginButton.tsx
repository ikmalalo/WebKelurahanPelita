import { useState, ReactNode } from "react";

interface LoginButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export default function LoginButton({ children, onClick, disabled }: LoginButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: "100%",
        padding: "15px 24px",
        background: disabled
          ? "#BDC3C7"
          : pressed
          ? "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)"
          : hovered
          ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"
          : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: "700",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.04em",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        opacity: disabled ? 0.7 : 1,
        boxShadow: disabled
          ? "none"
          : pressed
          ? "0 2px 8px rgba(37,99,235,0.25)"
          : hovered
          ? "0 8px 24px rgba(37,99,235,0.45), 0 2px 8px rgba(37,99,235,0.2)"
          : "0 4px 16px rgba(37,99,235,0.3), 0 1px 4px rgba(37,99,235,0.15)",
        transform: pressed ? "scale(0.985) translateY(1px)" : hovered ? "translateY(-2px)" : "none",
        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
        marginTop: "8px",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      {children}
    </button>
  );
}