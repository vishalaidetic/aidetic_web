'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'


export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    
    // Extracted block below


    try {
      const email = formData.get('email')
      const password = formData.get('password')
      
      // Directly hit the Next.js API proxy which forwards to the FastAPI backend
      const res = await fetch('/api/brain/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })

      })
      
      const data = await res.json()
      
      if (!res.ok || (data.status_code && data.status_code !== 200)) {
        setError(data.message || data.error || 'Invalid email or password.')
        return
      }
      
      const token = data.data?.session_token || data.data?.token || data.token
      if (token) {
        // Set the token as a cookie that the Next.js layout and API proxy can read
        document.cookie = `x_token=${token}; path=/; max-age=28800; samesite=lax`
        document.cookie = `admin_hint=${email}; path=/; max-age=28800; samesite=lax`
        
        // Force hard navigation to clear any stale client-side cache
        window.location.href = '/admin'
      } else {
        setError('Login successful but no token received.')
      }
    } catch (err) {
      setError('A network error occurred. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div style={styles.page}>
      {/* Background */}
      <div style={styles.bgScene} aria-hidden />
      <div style={styles.gridOverlay} aria-hidden />

      {/* Card */}
      <div style={styles.cardWrap}>
        <div style={styles.card} role="main">
          {/* Icon */}
          <div style={styles.iconRing} aria-hidden>
            <ShieldCheck size={26} color="#DC2626" />
          </div>

          <h1 style={styles.heading}>Admin Portal</h1>
          <p style={styles.subtitle}>Sign in to access the dashboard</p>

          {/* Error */}
          {error && (
            <div style={styles.errorBox} role="alert" aria-live="polite">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} id="admin-login-form" noValidate>
            {/* Email */}
            <div style={styles.field}>
              <label htmlFor="admin-email" style={styles.label}>
                Email address
              </label>
              <div style={styles.inputWrap}>
                <Mail size={16} style={styles.inputIcon} aria-hidden />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@example.com"
                  disabled={isPending}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.field}>
              <label htmlFor="admin-password" style={styles.label}>
                Password
              </label>
              <div style={styles.inputWrap}>
                <Lock size={16} style={styles.inputIcon} aria-hidden />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  disabled={isPending}
                  style={{ ...styles.input, paddingRight: '44px' }}
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  style={styles.togglePw}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={isPending}
              aria-busy={isPending}
              style={styles.submitBtn}
            >
              {isPending && <span style={styles.spinner} aria-hidden />}
              {isPending ? 'Signing in…' : 'Sign in'}
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                const emailInput = document.getElementById('admin-email') as HTMLInputElement;
                const pwInput = document.getElementById('admin-password') as HTMLInputElement;
                if (emailInput && pwInput) {
                  emailInput.value = 'admin@aidetic.com';
                  pwInput.value = 'password123';
                  const form = document.getElementById('admin-login-form') as HTMLFormElement;
                  if (form) form.requestSubmit();
                }
              }}
              style={{ ...styles.submitBtn, background: 'transparent', border: '1px solid rgba(71,85,105,0.5)', marginTop: '12px', color: '#cbd5e1' }}
            >
              Try Demo
            </button>
          </form>

          {/* Secure badge */}
          <div style={styles.secureBadge} aria-label="Admin access only">
            <ShieldCheck size={12} color="#DC2626" />
            &nbsp;Admin access only
          </div>
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes _adminSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes _adminSpin {
          to { transform: rotate(360deg); }
        }
        #admin-login-submit:hover:not(:disabled) {
          background: #DC2626 !important;
          box-shadow: 0 6px 28px rgba(220,38,38,0.4) !important;
          transform: translateY(-1px) !important;
        }
        #admin-login-submit:active:not(:disabled) {
          transform: translateY(0) !important;
        }
        #admin-email:focus, #admin-password:focus {
          border-color: rgba(220,38,38,0.65) !important;
          box-shadow: 0 0 0 3px rgba(220,38,38,0.12) !important;
        }
        #toggle-password-visibility:hover { color: #DC2626 !important; }
      `}</style>
    </div>
  )
}

/* ── Inline styles (avoids Tailwind / globals conflicts) ─────────────────── */
const styles: Record<string, React.CSSProperties> = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#020617',
    fontFamily: "'Inter', 'Geist', sans-serif",
    overflow: 'hidden',
  },
  bgScene: {
    position: 'fixed',
    inset: 0,
    background:
      'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(27,35,64,0.4) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 90%, rgba(220,38,38,0.06) 0%, transparent 60%), #0A0D1A',
    zIndex: 0,
  },
  gridOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(27,35,64,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(27,35,64,0.08) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    zIndex: 0,
  },
  cardWrap: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '420px',
    padding: '16px',
    animation: '_adminSlideUp .5s cubic-bezier(.22,1,.36,1) both',
  },
  card: {
    background: 'rgba(15,18,36,0.92)',
    border: '1px solid rgba(220,38,38,0.22)',
    borderRadius: '20px',
    padding: '40px 36px',
    backdropFilter: 'blur(20px)',
    boxShadow:
      '0 0 0 1px rgba(27,35,64,0.08), 0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
  iconRing: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background:
      'linear-gradient(135deg, rgba(27,35,64,0.55), rgba(220,38,38,0.2))',
    border: '1px solid rgba(220,38,38,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    boxShadow: '0 0 24px rgba(27,35,64,0.3)',
  },
  heading: {
    color: '#f1f5f9',
    fontSize: '1.55rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  subtitle: {
    color: '#64748b',
    fontSize: '0.875rem',
    textAlign: 'center',
    marginTop: '6px',
    marginBottom: '32px',
  },
  field: { marginBottom: '18px' },
  label: {
    display: 'block',
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: '#94a3b8',
    marginBottom: '8px',
    letterSpacing: '0.02em',
  },
  inputWrap: { position: 'relative' },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#475569',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '11px 14px 11px 40px',
    background: 'rgba(30,35,60,0.7)',
    border: '1px solid rgba(71,85,105,0.5)',
    borderRadius: '10px',
    color: '#f1f5f9',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
    boxSizing: 'border-box',
  },
  togglePw: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#475569',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color .2s',
  },
  errorBox: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '10px',
    padding: '12px 14px',
    color: '#fca5a5',
    fontSize: '0.8125rem',
    marginBottom: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    background: '#1B2340',
    color: '#fff',
    fontSize: '0.9375rem',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    letterSpacing: '0.01em',
    transition: 'background .25s, opacity .2s, transform .15s, box-shadow .2s',
    boxShadow: '0 4px 20px rgba(27,35,64,0.45)',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: '_adminSpin .7s linear infinite',
    flexShrink: 0,
  },
  secureBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '24px',
    color: '#475569',
    fontSize: '0.75rem',
  },
}
