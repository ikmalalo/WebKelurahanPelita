import { useState } from "react";

export default function InputField({ label, type = "text", placeholder, icon, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isActive = focused || hovered;

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: "600",
          color: focused ? "#2563EB" : "#374151",
          marginBottom: "8px",
          letterSpacing: "0.02em",
          transition: "color 0.2s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </label>
      <div
        style={{
          position: "relative",
          borderRadius: "12px",
          border: `1.5px solid ${focused ? "#2563EB" : isActive ? "#93C5FD" : "#E5E7EB"}`,
          background: focused ? "#F0F6FF" : isActive ? "#F8FAFF" : "#FAFAFA",
          boxShadow: focused
            ? "0 0 0 4px rgba(37,99,235,0.1), 0 2px 8px rgba(37,99,235,0.08)"
            : isActive
            ? "0 2px 8px rgba(37,99,235,0.06)"
            : "0 1px 3px rgba(0,0,0,0.04)",
          transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          style={{
            paddingLeft: "16px",
            color: focused ? "#2563EB" : "#9CA3AF",
            display: "flex",
            alignItems: "center",
            transition: "color 0.2s ease",
            fontSize: "16px",
          }}
        >
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            padding: "14px 16px",
            fontSize: "14.5px",
            color: "#111827",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.01em",
          }}
        />
      </div>
    </div>
  );
}