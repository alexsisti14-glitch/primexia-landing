# PRIMEXIA™ Method · Landing lead generation

Landing di Elena Bosi / Studio in Lifespan Nutrition per le campagne Meta Ads.

| Pagina | Scopo |
|---|---|
| `/uomo` | Landing guida gratuita UOMO + questionario a 5 step |
| `/donna` | Landing guida gratuita DONNA + questionario a 5 step |
| `/grazie` | Thank you page + upsell PRIMEXIA Discovery €47 |
| `/privacy` | Informativa privacy e cookie |
| `/api/lead` | Invio lead a GoHighLevel (API e/o webhook) |

## Stack
Next.js 15 (App Router) · Tailwind CSS 4 · TypeScript · React Hook Form · Lucide. Deploy su Vercel (push su `main`).

## Variabili d'ambiente
Vedi `.env.example`. Senza GHL configurato il form risponde con errore (nessun lead perso in silenzio).

## Tracking
- Meta Pixel `492276469982334`, caricato in consent mode: gli eventi partono solo dopo "Accetta" nel banner cookie.
- Eventi: `PageView`, `ViewContent` (inizio questionario), `Lead` (invio, con `eventID` per deduplica CAPI), `InitiateCheckout` (click Discovery).

## GHL
Ogni lead arriva con: nome, email, telefono (+39 normalizzato), fonte, tag (`primexia-lead`, `guida-uomo|donna`, `eta-*`, `diff-*`, `obiettivo-*`, `kg-*`, `provato-*`, `esito-*`, `consenso-marketing`, `utm-*`) e una nota con tutte le risposte.
Il workflow GHL deve inviare la email con il PDF della guida e avviare il follow-up WhatsApp.

## Sviluppo
```bash
npm install
npm run dev
```
