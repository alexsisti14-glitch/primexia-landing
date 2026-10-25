"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import {
  AGE_OPTIONS,
  KG_OPTIONS,
  OUTCOME_OPTIONS,
  TRIED_OPTIONS,
  type LandingContent,
  type Option,
  type Variant,
} from "@/content/types";
import { track } from "@/lib/pixel";

type FormValues = {
  sesso: Variant;
  eta: string;
  difficolta: string[];
  obiettivi: string[];
  kg: string;
  provato: string;
  esito: string;
  nome: string;
  email: string;
  telefono: string;
  privacy: boolean;
  marketing: boolean;
  website: string; // honeypot
};

const STEPS = ["Su di te", "Difficoltà", "Obiettivi", "Esperienze", "Contatti"] as const;

const STEP_FIELDS: (keyof FormValues)[][] = [
  ["sesso", "eta"],
  ["difficolta"],
  ["obiettivi", "kg"],
  ["provato", "esito"],
  ["nome", "email", "telefono", "privacy"],
];

function labelsOf(values: string[] | string, options: Option[]) {
  const arr = Array.isArray(values) ? values : values ? [values] : [];
  return arr.map((v) => options.find((o) => o.value === v)?.label ?? v);
}

export default function Questionnaire({ content }: { content: LandingContent }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      sesso: content.variant,
      eta: "",
      difficolta: [],
      obiettivi: [],
      kg: "",
      provato: "",
      esito: "",
      nome: "",
      email: "",
      telefono: "",
      privacy: false,
      marketing: false,
      website: "",
    },
  });

  const provato = watch("provato");
  const hasTried = provato !== "" && provato !== "prima_volta";

  useEffect(() => {
    if (step > 0) headingRef.current?.focus({ preventScroll: false });
  }, [step]);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("ViewContent", { content_name: `questionario_${content.variant}` });
  };

  const next = async () => {
    markStarted();
    const fields = STEP_FIELDS[step].filter((f) => f !== "esito" || hasTried);
    const ok = await trigger(fields as (keyof FormValues)[]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: FormValues) => {
    setSending(true);
    setServerError(null);
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const params = new URLSearchParams(window.location.search);
    const payload = {
      ...data,
      esito: hasTried ? data.esito : "",
      labels: {
        eta: labelsOf(data.eta, AGE_OPTIONS)[0] ?? "",
        difficolta: labelsOf(data.difficolta, content.form.difficulties),
        obiettivi: labelsOf(data.obiettivi, content.form.goals),
        kg: labelsOf(data.kg, KG_OPTIONS)[0] ?? "",
        provato: labelsOf(data.provato, TRIED_OPTIONS)[0] ?? "",
        esito: hasTried ? (labelsOf(data.esito, OUTCOME_OPTIONS)[0] ?? "") : "",
      },
      landing: content.variant,
      pageUrl: window.location.href,
      eventId,
      utm: {
        source: params.get("utm_source") ?? "",
        medium: params.get("utm_medium") ?? "",
        campaign: params.get("utm_campaign") ?? "",
        content: params.get("utm_content") ?? "",
        term: params.get("utm_term") ?? "",
        fbclid: params.get("fbclid") ?? "",
      },
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("Lead", { content_name: `guida_${content.variant}`, content_category: data.sesso }, eventId);
      const q = new URLSearchParams({ s: data.sesso, n: data.nome.split(" ")[0] ?? "" });
      router.push(`/grazie?${q.toString()}`);
    } catch {
      setSending(false);
      setServerError(
        "Non siamo riusciti a inviare le risposte. Controlla la connessione e riprova. Se il problema continua, scrivici su WhatsApp al +39 346 287 7008.",
      );
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      onFocus={markStarted}
      className="relative border border-[var(--gold-border)] bg-bg p-5 sm:p-9"
    >
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between font-sans text-[0.68rem] tracking-[0.22em] text-muted uppercase">
          <span>
            Passo {step + 1} di {STEPS.length}
          </span>
          <span className="text-gold">{STEPS[step]}</span>
        </div>
        <div
          className="h-px overflow-hidden bg-[var(--rule)]"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Avanzamento questionario"
        >
          <div
            className="h-full origin-left bg-gold transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>

      {/* honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("website")} />

      {step === 0 && (
        <fieldset key="s0" className="step-in space-y-6">
          <legend className="sr-only">Su di te</legend>
          <h3 ref={headingRef} tabIndex={-1} className="text-[1.7rem] leading-snug text-cream outline-none sm:text-[2rem]">
            Partiamo da te
          </h3>
          <div>
            <p className="kicker-muted mb-3 !text-[0.68rem]">Sesso</p>
            <div className="grid grid-cols-2 gap-3">
              {(["uomo", "donna"] as const).map((v) => (
                <label key={v} className="choice relative">
                  <input type="radio" value={v} {...register("sesso", { required: true })} />
                  <span className="mark rounded-full">
                    <Check size={14} strokeWidth={3} aria-hidden />
                  </span>
                  {v === "uomo" ? "Uomo" : "Donna"}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p id="eta-label" className="kicker-muted mb-3 !text-[0.68rem]">
              Età
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="radiogroup" aria-labelledby="eta-label">
              {AGE_OPTIONS.map((o) => (
                <label key={o.value} className="choice relative">
                  <input
                    type="radio"
                    value={o.value}
                    {...register("eta", { required: "Seleziona la tua fascia d'età", onChange: () => clearErrors("eta") })}
                  />
                  <span className="mark rounded-full">
                    <Check size={14} strokeWidth={3} aria-hidden />
                  </span>
                  {o.label}
                </label>
              ))}
            </div>
            {errors.eta && <ErrorText>{errors.eta.message}</ErrorText>}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset key="s1" className="step-in space-y-4">
          <legend className="sr-only">Difficoltà</legend>
          <h3 ref={headingRef} tabIndex={-1} className="text-[1.7rem] leading-snug text-cream outline-none sm:text-[2rem]">
            Cosa ti pesa di più in questo momento?
          </h3>
          <p className="text-body italic">Puoi sceglierne più di una.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.form.difficulties.map((o) => (
              <label key={o.value} className="choice relative">
                <input
                  type="checkbox"
                  value={o.value}
                  {...register("difficolta", {
                    validate: (v) => v.length > 0 || "Scegli almeno una risposta",
                    onChange: () => clearErrors("difficolta"),
                  })}
                />
                <span className="mark">
                  <Check size={14} strokeWidth={3} aria-hidden />
                </span>
                {o.label}
              </label>
            ))}
          </div>
          {errors.difficolta && <ErrorText>{errors.difficolta.message}</ErrorText>}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset key="s2" className="step-in space-y-4">
          <legend className="sr-only">Obiettivi</legend>
          <h3 ref={headingRef} tabIndex={-1} className="text-[1.7rem] leading-snug text-cream outline-none sm:text-[2rem]">
            Dove vuoi arrivare?
          </h3>
          <p className="text-body italic">Puoi sceglierne più di una.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.form.goals.map((o) => (
              <label key={o.value} className="choice relative">
                <input
                  type="checkbox"
                  value={o.value}
                  {...register("obiettivi", {
                    validate: (v) => v.length > 0 || "Scegli almeno un obiettivo",
                    onChange: () => clearErrors("obiettivi"),
                  })}
                />
                <span className="mark">
                  <Check size={14} strokeWidth={3} aria-hidden />
                </span>
                {o.label}
              </label>
            ))}
          </div>
          {errors.obiettivi && <ErrorText>{errors.obiettivi.message}</ErrorText>}
          <div className="pt-2">
            <label htmlFor="kg" className="kicker-muted mb-2 block !text-[0.68rem]">
              Quanti kg vorresti perdere? <span className="normal-case tracking-normal">(facoltativo)</span>
            </label>
            <select id="kg" className="field appearance-none" {...register("kg")}>
              <option value="">Preferisco non rispondere</option>
              {KG_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset key="s3" className="step-in space-y-5">
          <legend className="sr-only">Esperienze</legend>
          <h3 ref={headingRef} tabIndex={-1} className="text-[1.7rem] leading-snug text-cream outline-none sm:text-[2rem]">
            Hai già provato altro?
          </h3>
          <div>
            <label htmlFor="provato" className="kicker-muted mb-2 block !text-[0.68rem]">
              Cosa hai provato finora
            </label>
            <select
              id="provato"
              className="field appearance-none"
              aria-invalid={errors.provato ? "true" : "false"}
              {...register("provato", { required: "Seleziona una risposta", onChange: () => clearErrors("provato") })}
            >
              <option value="">Seleziona…</option>
              {TRIED_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {errors.provato && <ErrorText>{errors.provato.message}</ErrorText>}
          </div>
          {hasTried && (
            <div className="step-in">
              <p id="esito-label" className="kicker-muted mb-3 !text-[0.68rem]">
                Com&apos;è andata?
              </p>
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-labelledby="esito-label">
                {OUTCOME_OPTIONS.map((o) => (
                  <label key={o.value} className="choice relative">
                    <input
                      type="radio"
                      value={o.value}
                      {...register("esito", {
                        validate: (v) => !hasTried || v !== "" || "Dicci com'è andata",
                        onChange: () => clearErrors("esito"),
                      })}
                    />
                    <span className="mark rounded-full">
                      <Check size={14} strokeWidth={3} aria-hidden />
                    </span>
                    {o.label}
                  </label>
                ))}
              </div>
              {errors.esito && <ErrorText>{errors.esito.message}</ErrorText>}
            </div>
          )}
        </fieldset>
      )}

      {step === 4 && (
        <fieldset key="s4" className="step-in space-y-4">
          <legend className="sr-only">Contatti</legend>
          <h3 ref={headingRef} tabIndex={-1} className="text-[1.7rem] leading-snug text-cream outline-none sm:text-[2rem]">
            Dove ti mandiamo la guida?
          </h3>
          <Field label="Nome" id="nome" error={errors.nome?.message}>
            <input
              id="nome"
              className="field"
              autoComplete="given-name"
              placeholder="Il tuo nome"
              aria-invalid={errors.nome ? "true" : "false"}
              {...register("nome", { required: "Inserisci il tuo nome", minLength: { value: 2, message: "Nome troppo corto" } })}
            />
          </Field>
          <Field label="Email" id="email" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className="field"
              placeholder="nome@email.it"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Inserisci la tua email",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Email non valida" },
              })}
            />
          </Field>
          <Field label="Telefono (WhatsApp)" id="telefono" error={errors.telefono?.message}>
            <input
              id="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="field"
              placeholder="+39 333 123 4567"
              aria-invalid={errors.telefono ? "true" : "false"}
              {...register("telefono", {
                required: "Inserisci il tuo numero",
                validate: (v) => v.replace(/[^\d]/g, "").length >= 8 || "Numero non valido",
              })}
            />
          </Field>

          <div className="space-y-3 pt-3 text-[0.98rem] leading-relaxed text-body">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-[18px] shrink-0 cursor-pointer accent-[var(--gold)]"
                aria-invalid={errors.privacy ? "true" : "false"}
                {...register("privacy", { required: "Serve il consenso per inviarti la guida", onChange: () => clearErrors("privacy") })}
              />
              <span>
                Ho letto l&apos;
                <a href="/privacy" target="_blank" className="text-gold-lt underline underline-offset-2">
                  informativa privacy
                </a>{" "}
                e acconsento al trattamento dei dati per ricevere la guida ed essere ricontattato/a.{" "}
                <span className="text-muted">(obbligatorio)</span>
              </span>
            </label>
            {errors.privacy && <ErrorText>{errors.privacy.message}</ErrorText>}
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-[18px] shrink-0 cursor-pointer accent-[var(--gold)]"
                {...register("marketing")}
              />
              <span>
                Acconsento a ricevere comunicazioni e contenuti da Studio in Lifespan Nutrition.{" "}
                <span className="text-muted">(facoltativo)</span>
              </span>
            </label>
          </div>
        </fieldset>
      )}

      {serverError && (
        <p role="alert" className="mt-5 border border-danger/40 p-4 text-[1rem] text-danger">
          {serverError}
        </p>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn-line">
            <ArrowLeft size={18} aria-hidden /> Indietro
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn-gold !min-w-0 !flex-row !gap-2 !px-7">
            Avanti <ArrowRight size={18} aria-hidden />
          </button>
        ) : (
          <button type="submit" className="btn-gold !min-w-0 !flex-row !gap-2 !px-7" disabled={sending}>
            {sending ? (
              <>
                <span
                  className="size-4 rounded-full border-2 border-current border-t-transparent"
                  style={{ animation: "spin 0.8s linear infinite" }}
                  aria-hidden
                />
                Invio…
              </>
            ) : (
              <>Invia e ricevi la guida</>
            )}
          </button>
        )}
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-center font-sans text-[0.68rem] tracking-[0.12em] text-muted">
        <Lock size={13} aria-hidden /> Niente spam. Puoi cancellarti quando vuoi.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="kicker-muted mb-2 block !text-[0.68rem]">
        {label}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-2 font-sans text-[0.72rem] tracking-[0.04em] text-danger">
      {children}
    </p>
  );
}
