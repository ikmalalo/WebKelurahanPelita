import { useState } from "react";
import { supabase } from "../lib/supabase";
import InputField from "./InputFieldLogin";
import LoginButton from "./LoginButton";

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

interface LoginCardProps {
  onLogin?: () => void;
}

export default function LoginCard({ onLogin }: LoginCardProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [forgotHover, setForgotHover] = useState(false);
  const [checkHover, setCheckHover] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Isi username dan password!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: dbError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (dbError || !data) {
        setError("Username atau password salah!");
      } else {
        if (onLogin) onLogin();
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "440px",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)",
        background: "#fff",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 60%, #BFDBFE 100%)",
          padding: "44px 40px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "160px", height: "160px",
          borderRadius: "50%",
          background: "rgba(37,99,235,0.06)",
        }} />
        <div style={{
          position: "absolute", bottom: "-20px", left: "-30px",
          width: "100px", height: "100px",
          borderRadius: "50%",
          background: "rgba(37,99,235,0.05)",
        }} />

        {/* Shield icon circle */}
        <div
          style={{
            width: "72px", height: "72px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 4px 20px rgba(37,99,235,0.15), 0 1px 6px rgba(0,0,0,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "20px",
            position: "relative", zIndex: 1,
          }}
        >
          <ShieldIcon />
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "800",
            color: "#0F172A",
            letterSpacing: "-0.02em",
            position: "relative", zIndex: 1,
          }}
        >
          Admin Portal
        </h1>
      </div>

      {/* Form body */}
      <div style={{ padding: "36px 40px 40px" }}>
        <div style={{ marginBottom: "28px", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: "700", color: "#0F172A", letterSpacing: "-0.01em" }}>
            Welcome Back
          </h2>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#6B7280", lineHeight: "1.5" }}>
            Please enter your administrative credentials to continue.
          </p>
          {error && (
            <div style={{ marginTop: '12px', padding: '8px', background: '#FEF2F2', color: '#EF4444', borderRadius: '8px', fontSize: '13px', fontWeight: '600', border: '1px solid #FECACA' }}>
              {error}
            </div>
          )}
        </div>

        <InputField
          label="Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          icon={<MailIcon />}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          icon={<LockIcon />}
        />

        {/* Remember + Forgot */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <label
            style={{
              display: "flex", alignItems: "center", gap: "9px",
              cursor: "pointer", fontSize: "13.5px", color: "#374151",
              fontWeight: "500", userSelect: "none",
            }}
            onMouseEnter={() => setCheckHover(true)}
            onMouseLeave={() => setCheckHover(false)}
          >
            <div
              onClick={() => setRemember(!remember)}
              style={{
                width: "18px", height: "18px",
                border: `2px solid ${remember ? "#2563EB" : checkHover ? "#93C5FD" : "#D1D5DB"}`,
                borderRadius: "5px",
                background: remember ? "#2563EB" : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: remember ? "0 2px 8px rgba(37,99,235,0.25)" : "none",
                cursor: "pointer",
              }}
            >
              {remember && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            Remember me
          </label>

          <span
            onMouseEnter={() => setForgotHover(true)}
            onMouseLeave={() => setForgotHover(false)}
            style={{
              fontSize: "13.5px",
              fontWeight: "600",
              color: forgotHover ? "#1D4ED8" : "#2563EB",
              cursor: "pointer",
              textDecoration: forgotHover ? "underline" : "none",
              transition: "color 0.2s ease",
            }}
          >
            Forgot password?
          </span>
        </div>

        <LoginButton onClick={handleLogin} disabled={loading}>
          {loading ? "Authenticating..." : "Secure Login"}
        </LoginButton>
      </div>
    </div>
  );
}