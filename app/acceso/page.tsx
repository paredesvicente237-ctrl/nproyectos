"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AccesoPage() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error || "No fue posible iniciar sesión.");
        return;
      }
      window.location.replace("/cotizador");
    } catch {
      setError("No fue posible conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-5 py-12">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <section className="relative w-full max-w-md rounded-md border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-navy-600">N Proyectos Ltda.</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Acceso al cotizador</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">Ingresa tus credenciales para consultar precios y generar cotizaciones.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Usuario<input autoComplete="username" required className="form-input mt-2" value={usuario} onChange={(event) => setUsuario(event.target.value)} /></label>
          <label className="block text-sm font-semibold text-slate-700">Contraseña<div className="relative mt-2"><input type={showPassword ? "text" : "password"} autoComplete="current-password" required className="form-input pr-12" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-600 hover:text-navy-800" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={showPassword}><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{showPassword ? <><path d="M3 3l18 18"/><path d="M10.6 10.6a2 2 0 002.8 2.8"/><path d="M9.9 4.2A10.7 10.7 0 0112 4c5.5 0 9 5 9 8a9.8 9.8 0 01-2 3.5M6.6 6.6C4.4 8 3 10.2 3 12c0 3 3.5 8 9 8a10.5 10.5 0 004.1-.8"/></> : <><path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"/><circle cx="12" cy="12" r="3"/></>}</svg></button></div></label>
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary mt-2 w-full disabled:cursor-wait disabled:opacity-60">{loading ? "Ingresando…" : "Ingresar"}</button>
        </form>

        <Link href="/" className="mt-6 block text-center text-sm font-semibold text-slate-500 hover:text-navy-600">← Volver al sitio</Link>
      </section>
    </main>
  );
}
