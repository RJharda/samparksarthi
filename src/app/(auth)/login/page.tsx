"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  MessageSquare,
  UsersRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const destination = inviteToken
      ? `/join/${encodeURIComponent(inviteToken)}`
      : "/dashboard";
    window.location.href = destination;
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#090d16] px-4 py-12 selection:bg-emerald-500 selection:text-white">
      {/* Background Ambient Lighting & Gradients */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-teal-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[140px]" />

      {/* Decorative Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main Elevated Card Container */}
      <div className="relative w-full max-w-lg z-10">
        {/* Glow Border Gradient Ring */}
        <div className="relative rounded-3xl bg-gradient-to-b from-emerald-500/30 via-slate-800/40 to-emerald-500/10 p-[1px] shadow-2xl shadow-emerald-950/60 backdrop-blur-2xl">
          <div className="rounded-[23px] bg-slate-950/90 p-8 sm:p-10 backdrop-blur-xl border border-white/5">
            {/* Brand Header */}
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-300 shadow-sm shadow-emerald-500/20 mb-5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Enterprise WhatsApp CRM</span>
              </div>

              {/* Logo & Brand Name */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/30">
                  {inviteToken ? (
                    <UsersRound className="h-6 w-6 stroke-[2.2]" />
                  ) : (
                    <MessageSquare className="h-6 w-6 stroke-[2.2]" />
                  )}
                </div>
                <div className="text-left">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Hamara <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Sampark Sarthi</span>
                  </h1>
                  <p className="text-[11px] font-medium tracking-wider uppercase text-emerald-400/90">
                    हमारा सम्पर्क सारथी
                  </p>
                </div>
              </div>

              <p className="mt-2 text-sm text-slate-400 max-w-sm">
                {inviteToken
                  ? "Sign in to accept your team invitation and access your workspace"
                  : "Welcome back! Login to manage customer chats, pipelines, and automations"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              {error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <div className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="login-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Work Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="h-4 w-4 text-emerald-400/70" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500/80 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/15"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4 text-emerald-400/70" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-10 pr-11 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-emerald-500/80 focus:bg-slate-900 focus:ring-4 focus:ring-emerald-500/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={loading}
                className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:from-emerald-400 hover:via-teal-400 hover:to-emerald-500 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    <span>Sign in to Dashboard</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Footer switcher */}
            <div className="mt-8 border-t border-slate-800/80 pt-6 text-center">
              <p className="text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  href={
                    inviteToken
                      ? `/signup?invite=${encodeURIComponent(inviteToken)}`
                      : "/signup"
                  }
                  className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors ml-1"
                >
                  Create account
                </Link>
              </p>
            </div>

            {/* Trust highlights */}
            <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/80" /> 256-Bit Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-teal-400/80" /> Meta Official API
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
