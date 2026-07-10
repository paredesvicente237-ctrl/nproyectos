"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccesoPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
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
      router.replace("/cotizador");
      router.refresh();
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
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-navy-600">N Proyectos Ltda.</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Acceso al cotizador</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">Ingresa tus credenciales para consultar precios y generar cotizaciones.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Usuario<input autoComplete="username" required className="form-input mt-2" value={usuario} onChange={(event) => setUsuario(event.target.value)} /></label>
          <label className="block text-sm font-semibold text-slate-700">Contraseña<input type="password" autoComplete="current-password" required className="form-input mt-2" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
          <button disabled={loading} className="btn-primary mt-2 w-full disabled:cursor-wait disabled:opacity-60">{loading ? "Ingresando…" : "Ingresar"}</button>
        </form>

        <Link href="/" className="mt-6 block text-center text-sm font-semibold text-slate-500 hover:text-navy-600">← Volver al sitio</Link>
      </section>
    </main>
  );
}
