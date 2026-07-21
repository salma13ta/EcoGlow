'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

/* ─── Types ─────────────────────────────────────────────── */
type Portal   = 'customer' | 'expert'
type AuthMode = 'login' | 'forgot'
type FieldState = 'idle' | 'valid' | 'invalid'

/* ─── Validation ─────────────────────────────────────────── */
function validateEmail(v: string): FieldState {
  if (!v) return 'idle'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'valid' : 'invalid'
}
function validatePassword(v: string): FieldState {
  if (!v) return 'idle'
  return v.length >= 8 ? 'valid' : 'invalid'
}

/* ─── Leaf Logo ──────────────────────────────────────────── */
function LeafLogo({ size = 40, light = false }: { size?: number; light?: boolean }) {
  const stem = light ? '#c8e8b8' : '#f4f0e8'
  const fill = light ? '#ffffff' : '#3a6b32'
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 5C24 5 9 16 9 29C9 37.284 15.716 44 24 44C32.284 44 39 37.284 39 29C39 16 24 5 24 5Z" fill={fill} />
      <path d="M24 44V22" stroke={stem} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 33L17 26" stroke={stem} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 39L31 32" stroke={stem} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Icons ─────────────────────────────────────────────── */
function EyeToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      tabIndex={-1}
      className="text-[#9a9a8a] hover:text-[#3a6b32] transition-colors duration-150 p-0.5 outline-none"
    >
      {visible ? (
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

/* ─── Floating Label Input ───────────────────────────────── */
interface InputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  fieldState?: FieldState
  errorMsg?: string
  autoComplete?: string
  right?: ReactNode
}

function FloatingInput({
  id, label, type = 'text', value, onChange,
  fieldState = 'idle', errorMsg, autoComplete, right
}: InputProps) {
  const [focused, setFocused] = useState(false)
  const raised = focused || value.length > 0
  const isShaking = fieldState === 'invalid'

  const borderClass =
    fieldState === 'valid'   ? 'border-[#4a7c4e] shadow-[0_0_0_3px_rgba(74,124,78,0.08)]' :
    fieldState === 'invalid' ? 'border-[#b54e4e] shadow-[0_0_0_3px_rgba(181,78,78,0.08)] font-medium' :
    focused                  ? 'border-[#3a6b32] shadow-[0_0_0_3px_rgba(58,107,50,0.1)]'  :
                               'border-[rgba(58,107,50,0.2)]'

  const labelClass = raised
    ? 'top-[9px] text-[9.5px] font-semibold tracking-widest uppercase'
    : 'top-1/2 -translate-y-1/2 text-[13.5px]'

  const labelColor = focused
    ? 'text-[#3a6b32]'
    : raised ? 'text-[#9a9a8a]' : 'text-[#b0b0a0]'

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full transform-gpu"
    >
      <motion.div
        animate={isShaking ? { x: [-6, 6, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={`relative rounded-[14px] border bg-white transition-all duration-200 ${borderClass}`}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
          placeholder=""
          className="w-full px-4 pt-[22px] pb-[8px] text-[13.5px] text-[#1a1a1a] bg-transparent outline-none leading-tight"
          style={{ paddingRight: right ? '40px' : fieldState !== 'idle' ? '36px' : undefined }}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 pointer-events-none transition-all duration-200 ${labelClass} ${labelColor}`}
        >
          {label}
        </label>

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
          {right}
          {!right && fieldState === 'valid' && (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#4a7c4e" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {!right && fieldState === 'invalid' && (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#b54e4e" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {fieldState === 'invalid' && errorMsg && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            className="mt-1.5 pl-1 text-[11px] text-[#b54e4e] leading-none overflow-hidden"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Primary Button ─────────────────────────────────────── */
function PrimaryBtn({
  loading, label, loadingLabel = 'Please wait…', disabled
}: { loading: boolean; label: string; loadingLabel?: string; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="relative w-full py-[13px] rounded-[14px] bg-[#3a6b32] hover:bg-[#2e5528] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-[13.5px] tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98] shadow-[0_4px_16px_rgba(58,107,50,0.28)] hover:shadow-[0_6px_24px_rgba(58,107,50,0.38)]"
    >
      {loading ? (
        <>
          <Spinner />
          <span>{loadingLabel}</span>
        </>
      ) : label}
    </button>
  )
}

/* ─── Portal Tabs ────────────────────────────────────────── */
function PortalTabs({ currentPortal, onPortalSwitch }: { currentPortal: Portal; onPortalSwitch: (p: Portal) => void }) {
  return (
    <div className="flex gap-0 p-1 bg-[#f2ede3] rounded-[16px] mb-7 relative select-none">
      {(['customer', 'expert'] as const).map(p => {
        const isActive = currentPortal === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPortalSwitch(p)}
            className={`flex-1 py-[9px] text-[12.5px] font-semibold rounded-[12px] transition-all duration-200 relative z-10 ${
              isActive ? 'text-[#1a1a1a]' : 'text-[#9a9a8a] hover:text-[#1a1a1a]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-white rounded-[12px] shadow-[0_1px_6px_rgba(0,0,0,0.08)]"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {p === 'customer' ? 'Customer' : 'Expert'}
          </button>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* CUSTOMER AUTH                                               */
/* ─────────────────────────────────────────────────────────── */
function CustomerAuth({ onPortalSwitch }: { onPortalSwitch: (p: Portal) => void }) {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)

  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [showPwd, setShowPwd]       = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

  const emailState    = email    ? validateEmail(email)    : 'idle'
  const pwdState      = password ? validatePassword(password) : 'idle'
  const fEmailState   = forgotEmail ? validateEmail(forgotEmail) : 'idle'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (emailState !== 'valid' || pwdState !== 'valid') return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // التوجيه إلى مسار الـ Customer الصحيح حسب بنية الفولدرات لديك
      router.push('/com/Customer/dashboard/home') 
    }, 2200)
  }

  const handleForgot = (e: FormEvent) => {
    e.preventDefault()
    if (fEmailState !== 'valid') return
    setLoading(true)
    setTimeout(() => { setLoading(false); setForgotSent(true) }, 1600)
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f0e8] flex flex-col items-center justify-center p-5 py-10 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: [
            'radial-gradient(ellipse at 8% 15%, rgba(141,184,122,0.16) 0%, transparent 55%)',
            'radial-gradient(ellipse at 92% 85%, rgba(58,107,50,0.10) 0%, transparent 55%)',
            'radial-gradient(ellipse at 50% 55%, rgba(212,196,158,0.18) 0%, transparent 65%)',
          ].join(',')
        }} />
      </div>

      {/* Brand mark */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-7 flex flex-col items-center"
      >
        <LeafLogo size={44} />
        <h1 className="font-display text-[26px] font-bold text-[#1a1a1a] mt-2.5 tracking-tight">EcoGlow</h1>
        <p className="text-[10.5px] text-[#b0b0a0] tracking-[0.2em] uppercase font-medium mt-0.5">Clean Beauty Platform</p>
      </motion.div>

      {/* Card Container */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: 'spring', bounce: 0.15 }}
        className="relative w-full max-w-[370px] bg-white rounded-[24px] shadow-[0_12px_48px_rgba(0,0,0,0.09),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden transform-gpu"
      >
        <div className="p-7">
          <AnimatePresence mode="wait">
            {mode === 'forgot' ? (
              forgotSent ? (
                <motion.div
                  key="c-forgot-sent"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="text-center py-2"
                >
                  <div className="w-[60px] h-[60px] rounded-full bg-[#eef6e9] flex items-center justify-center mx-auto mb-5">
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#3a6b32" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="font-display text-[21px] font-bold text-[#1a1a1a] mb-2">Check your inbox</h2>
                  <p className="text-[13px] text-[#9a9a8a] leading-relaxed mb-6">
                    We sent a reset link to <span className="text-[#3a6b32] font-semibold">{forgotEmail}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForgotSent(false); setMode('login') }}
                    className="text-[12.5px] text-[#3a6b32] font-semibold hover:underline transition-all"
                  >
                    ← Back to sign in
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="c-forgot-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleForgot} 
                  className="space-y-5"
                >
                  <div>
                    <h2 className="font-display text-[21px] font-bold text-[#1a1a1a] leading-tight">Forgot password?</h2>
                    <p className="text-[12.5px] text-[#9a9a8a] mt-1.5 leading-relaxed">
                      Enter your email and we&apos;ll send you a reset link.
                    </p>
                  </div>
                  <FloatingInput
                    id="c-f-email" label="Email address" type="email"
                    value={forgotEmail} onChange={setForgotEmail}
                    fieldState={forgotEmail ? fEmailState : 'idle'}
                    errorMsg="Enter a valid email address"
                    autoComplete="email"
                  />
                  <PrimaryBtn loading={loading} label="Send reset link" disabled={fEmailState !== 'valid'} />
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center text-[12.5px] text-[#9a9a8a] hover:text-[#3a6b32] transition-colors"
                  >
                    ← Back to sign in
                  </button>
                </motion.form>
              )
            ) : (
              <motion.div
                key="c-auth-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <PortalTabs currentPortal="customer" onPortalSwitch={onPortalSwitch} />

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <FloatingInput
                    id="c-email" label="Email address" type="email"
                    value={email} onChange={setEmail}
                    fieldState={email ? emailState : 'idle'}
                    errorMsg="Please enter a valid email"
                    autoComplete="email"
                  />

                  <FloatingInput
                    id="c-pwd" label="Password"
                    type={showPwd ? 'text' : 'password'}
                    value={password} onChange={setPassword}
                    fieldState={password ? pwdState : 'idle'}
                    errorMsg="At least 8 characters required"
                    autoComplete="current-password"
                    right={<EyeToggle visible={showPwd} onToggle={() => setShowPwd(p => !p)} />}
                  />

                  <div className="pt-1">
                    <motion.div>
                      <PrimaryBtn
                        loading={loading}
                        label="Sign in"
                        loadingLabel="Signing in…"
                        disabled={emailState !== 'valid' || pwdState !== 'valid'}
                      />
                    </motion.div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── EXPERT AUTH                                             */
function ExpertAuth({ onPortalSwitch }: { onPortalSwitch: (p: Portal) => void }) {
  const router = useRouter()
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

  const emailState: FieldState = email    ? validateEmail(email)    : 'idle'
  const pwdState: FieldState   = password ? validatePassword(password) : 'idle'
  const fEmailState            = forgotEmail ? validateEmail(forgotEmail) : 'idle'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (emailState !== 'valid' || pwdState !== 'valid') return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // التوجيه إلى مسار الـ Expert الصحيح حسب بنية الفولدرات لديك
      router.push('/com/Expert/dashboard/home') 
    }, 2200)
  }

  const handleForgot = (e: FormEvent) => {
    e.preventDefault()
    if (fEmailState !== 'valid') return
    setLoading(true)
    setTimeout(() => { setLoading(false); setForgotSent(true) }, 1600)
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f0e8] flex flex-col lg:flex-row overflow-hidden">
      {/* Left — Dark Botanical Panel */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="hidden lg:flex w-[42%] min-h-screen relative overflow-hidden flex-col justify-between p-10 flex-shrink-0 transform-gpu"
        style={{
          background: [
            'radial-gradient(ellipse at 20% 30%, rgba(88,148,70,0.28) 0%, transparent 55%)',
            'radial-gradient(ellipse at 85% 70%, rgba(42,80,32,0.45) 0%, transparent 55%)',
            '#152617',
          ].join(',')
        }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute -bottom-20 -left-20 w-[340px] h-[340px] rounded-full opacity-10" style={{ border: '60px solid #8db87a' }} />
        <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full opacity-[0.07]" style={{ border: '40px solid #8db87a' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <LeafLogo size={38} light />
            <div>
              <p className="font-display text-white text-[19px] font-bold tracking-tight">EcoGlow</p>
              <p className="text-[9.5px] text-[#7ab87a] tracking-[0.22em] uppercase font-medium">Expert Portal</p>
            </div>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-white text-[34px] font-bold leading-[1.15] mb-4"
          >
            Grow your<br />
            <em className="not-italic text-[#8db87a]">beauty practice</em><br />
            with EcoGlow
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[13.5px] text-[rgba(255,255,255,0.55)] leading-relaxed max-w-[260px]"
          >
            Join 4,200+ certified beauty professionals offering clean, conscious services through our platform.
          </motion.p>
        </div>

        {/* Stats Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 space-y-3"
        >
          {[
            { n: '4,200+',  label: 'Certified experts' },
            { n: '92%',     label: 'Client satisfaction' },
            { n: '$3,400',  label: 'Average monthly revenue' },
          ].map(({ n, label }, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.08 }}
              key={label} 
              className="flex items-baseline gap-3"
            >
              <span className="font-display text-[22px] font-bold text-white">{n}</span>
              <span className="text-[12px] text-[rgba(255,255,255,0.45)] font-medium">{label}</span>
            </motion.div>
          ))}

          <div className="flex gap-2 pt-2 flex-wrap">
            {['Certified Clean', 'PETA Approved', 'Cruelty-Free'].map(b => (
              <span key={b} className="text-[10px] font-semibold text-[#8db87a] border border-[rgba(141,184,122,0.3)] rounded-full px-2.5 py-1 tracking-wide">
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Right — Form Panel */}
      <div className="flex-1 min-h-screen flex items-center justify-center bg-white p-6 lg:p-10 overflow-y-auto">
        <motion.div 
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[370px] transform-gpu"
        >
          <AnimatePresence mode="wait">
            {mode === 'forgot' ? (
              forgotSent ? (
                <motion.div
                  key="e-forgot-sent"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center py-4"
                >
                  <div className="w-[60px] h-[60px] rounded-full bg-[#eef6e9] flex items-center justify-center mx-auto mb-5">
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#3a6b32" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="font-display text-[21px] font-bold text-[#1a1a1a] mb-2">Check your inbox</h2>
                  <p className="text-[13px] text-[#9a9a8a] leading-relaxed mb-6">
                    We sent an expert reset link to <span className="text-[#3a6b32] font-semibold">{forgotEmail}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForgotSent(false); setMode('login') }}
                    className="text-[12.5px] text-[#3a6b32] font-semibold hover:underline"
                  >
                    ← Back to sign in
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="e-forgot-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleForgot}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="font-display text-[24px] font-bold text-[#1a1a1a] leading-tight">Reset Expert Password</h2>
                    <p className="text-[13px] text-[#9a9a8a] mt-1.5">Enter your professional email to retrieve your account access.</p>
                  </div>
                  <FloatingInput
                    id="e-f-email" label="Professional email" type="email"
                    value={forgotEmail} onChange={setForgotEmail}
                    fieldState={forgotEmail ? fEmailState : 'idle'}
                    errorMsg="Enter a valid professional email address"
                    autoComplete="email"
                  />
                  <PrimaryBtn loading={loading} label="Send reset link" disabled={fEmailState !== 'valid'} />
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center text-[12.5px] text-[#9a9a8a] hover:text-[#3a6b32] transition-colors"
                  >
                    ← Back to sign in
                  </button>
                </motion.form>
              )
            ) : (
              <motion.div
                key="e-login-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-8">
                  <h2 className="font-display text-[28px] font-bold text-[#1a1a1a] leading-tight mb-1.5">
                    Welcome back, expert
                  </h2>
                  <p className="text-[13px] text-[#9a9a8a]">
                    Sign in to manage your EcoGlow practice.
                  </p>
                </div>

                <PortalTabs currentPortal="expert" onPortalSwitch={onPortalSwitch} /> 

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <FloatingInput id="e-email" label="Professional email" type="email" value={email} onChange={setEmail} fieldState={email ? emailState : 'idle'} errorMsg="Please enter a valid email" autoComplete="email" />
                  <FloatingInput id="e-pwd" label="Password" type={showPwd ? 'text' : 'password'} value={password} onChange={setPassword} fieldState={password ? pwdState : 'idle'} errorMsg="At least 8 characters required" autoComplete="current-password" right={<EyeToggle visible={showPwd} onToggle={() => setShowPwd(p => !p)} />} />

                  <div className="pt-1">
                    <PrimaryBtn 
                      loading={loading} 
                      label="Sign in to Expert Portal" 
                      loadingLabel="Signing in…" 
                      disabled={emailState !== 'valid' || pwdState !== 'valid'}
                    />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Main Container Component ───────────────────────────── */
export default function AuthPage() {
  const [portal, setPortal] = useState<Portal>('customer')

  return (
    <div className="w-full min-h-screen bg-[#f4f0e8] overflow-x-hidden selection:bg-[#3a6b32] selection:text-white">
      <AnimatePresence mode="wait">
        {portal === 'customer' ? (
          <motion.div
            key="customer-portal"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full min-h-screen transform-gpu"
          >
            <CustomerAuth onPortalSwitch={(p) => setPortal(p)} />
          </motion.div>
        ) : (
          <motion.div
            key="expert-portal"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full min-h-screen transform-gpu"
          >
            <ExpertAuth onPortalSwitch={(p) => setPortal(p)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}