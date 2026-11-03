import { execFileSync } from "node:child_process";

const stagedDiff = execFileSync(
  "git",
  ["diff", "--cached", "--no-ext-diff", "--unified=0", "--"],
  { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 },
);

const detectors = [
  ["OpenAI API key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
  ["Resend API key", /\bre_[A-Za-z0-9_-]{20,}\b/],
  ["GitHub token", /\b(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["PostgreSQL URL with credentials", /\bpostgres(?:ql)?:\/\/[^\s/:]+:[^\s@]+@/i],
  ["Private key", /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/],
  [
    "Non-empty server credential variable",
    /^\+\s*(?:COTIZADOR_USERS_JSON|COTIZADOR_SESSION_SECRET|DATABASE_URL|POSTGRES_PASSWORD|PGPASSWORD|RESEND_API_KEY|OPENAI_API_KEY)\s*=\s*["']?\S/i,
  ],
];

let currentPath = "(ruta no identificada)";
const findings = new Set();

for (const line of stagedDiff.split(/\r?\n/)) {
  if (line.startsWith("+++ b/")) {
    currentPath = line.slice("+++ b/".length);
    continue;
  }
  if (!line.startsWith("+") || line.startsWith("+++")) continue;

  for (const [label, pattern] of detectors) {
    if (pattern.test(line)) findings.add(`${currentPath}: ${label}`);
  }
}

if (findings.size > 0) {
  console.error("Bloqueo preventivo: posibles credenciales en cambios preparados para commit.");
  for (const finding of findings) console.error(`- ${finding}`);
  console.error("No se imprimió el contenido detectado. Usa variables de entorno seguras y revisa el cambio.");
  process.exitCode = 1;
} else {
  console.log("No se detectaron patrones de credenciales en las líneas añadidas preparadas para commit.");
}
