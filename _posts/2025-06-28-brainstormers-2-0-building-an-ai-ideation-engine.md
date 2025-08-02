---
layout: single
title: "Brainstormers 2.0 – Building an AI Ideation Engine That Thinks *with* You"
date: 2025-06-28 15:56:59 +0200
categories: technical
excerpt: >
  Brainstormers 2.0 is a privacy-first, Next.js-powered platform that lets you
  ideate with AI agents through six scientifically backed brainstorming
  techniques—all while your API key never leaves the browser.
---

> **"When two or more brains clash, sparks fly.  
> But what if the other brains aren't in the room—and charge by the hour?"**

That question sparked *Brainstormers*.  
The goal is simple: let anyone brainstorm endlessly, cheaply, and privately by
pairing proven creative-thinking methods with large-language-model (LLM)
agents. Below is a deep technical dive into how the new 2.0 rewrite turns that
idea into a production-ready web application.

---

## 1 · Project Genesis

- **Human truth:** Great ideas often emerge from debate, disagreement, or
  "constructive conflict."  
- **Practical snag:** People aren't always available—and consulting
  experts cost money.  
- **Solution:** Encode six research-validated brainstorming techniques into AI
  agents so you can *simulate* that multi-perspective clash on demand.

Brainstormers keeps you *almost* alone, but never stuck in your own head.

---

## 2 · Architecture at a Glance

| Layer             | Choice                                       | Rationale |
|-------------------|----------------------------------------------|-----------|
| **Framework**     | **Next.js 15.4.5** (App Router)              | File-system routing, edge-ready deployment |
| **Language**      | **TypeScript**                               | Strict types, safer refactors |
| **Styling**       | **Tailwind CSS** + custom gradients          | Utility speed, theming consistency |
| **UI Primitives** | **Radix UI**                                 | Accessible components, headless control |
| **Deployment**    | **Vercel**                                   | CI/CD, image & edge optimizations |
| **Security**      | **100 % client-side** BYOK model             | No server => zero key exposure |

### Multi-Provider LLM Matrix

```ts
// /lib/llm/providers.ts
export const providers = {
  openai:  ['o4-mini','gpt-4o','gpt-4o-mini','gpt-4.1-nano'],
  groq:    ['qwen2.5-32b-instruct','llama-3.3-70b-versatile','deepseek-r1-distill-llama-70b'],
  gemini:  ['gemini-2.0-flash-exp','gemini-1.5-flash','gemini-1.5-flash-8b'],
  deepseek:['deepseek-chat','deepseek-reasoner']
} as const;
```

Users paste an API key once; it lives in `localStorage`, never touching a
server. Skeptical? It's open source—audit, run, revoke.

---

## 3 · Brainstorming Engine

| Method                    | What It Does                                                                   | Code Module                    |
| ------------------------- | ------------------------------------------------------------------------------ | ------------------------------ |
| **Big Mind Mapping**      | Expands concepts radially to surface distant associations                      | `/lib/brainstorm/mindMap.ts`   |
| **Reverse Brainstorming** | Inverts the problem ("How could we *cause* it?") then flips answers into fixes | `/lib/brainstorm/reverse.ts`   |
| **Role Storming**         | Forces a perspective shift by assuming a persona                               | `/lib/brainstorm/role.ts`      |
| **SCAMPER**               | Systematic transform (Substitute, Combine, Adapt…)                             | `/lib/brainstorm/scamper.ts`   |
| **Six Thinking Hats**     | Parallel thinking across six cognitive modes                                   | `/lib/brainstorm/hats.ts`      |
| **Starbursting**          | Generates 5W-1H questions around a central idea                                | `/lib/brainstorm/starburst.ts` |

Each module exports:

```ts
export interface Method {
  id: string;
  name: string;
  systemPrompt: string;   // static setup
  userPrompt: (topic: string) => string; // dynamic prompt factory
}
```

---

## 4 · UX Highlights

1. **Setup Wizard** – choose provider & paste key (client-only).
2. **Dashboard** – pick a method, tweak settings, hit *Start*.
3. **Real-Time Chat** – streaming responses; hot-swap methods mid-session.
4. **Markdown Renderer** – custom highlighter, tables, and code fences.

Add `html { scroll-behavior:smooth; }` and every *Learn How It Works* button
anchors to `#how-it-works` for buttery page jumps.

---

## 5 · Performance & Quality

* **Lighthouse:** Performance 95+, Accessibility 100
* **Bundle:** < 200 kB gzipped (`analyze` flag)
* **TTI:** < 2 s on throttled 3G
* **Type Coverage:** 100 %

---

## 6 · Business Model & Future Path

Because there's no backend cost, **BYOK keeps Brainstormers free**.
With funding, a managed proxy LLM (or on-premise) could replace BYOK for a true
SaaS launch.

Planned roadmap:

* Session persistence & export (PDF/Markdown)
* Multi-user collaboration (WebRTC + CRDT)
* Plug-in SDK for custom methods
* Usage analytics that stay client-side

---

## 7 · Key Lessons

1. **Client-Only ≠ Toy** – You can build serious AI tools without servers.
2. **Provider Abstraction** – Clean interfaces tame API churn.
3. **Open Source Trust Loop** – Transparency converts skeptics into adopters.
4. **Design Matters** – Gradients and micro-interactions boost stickiness.

---

### Try It · Fork It · Break It

* **Live Demo:** [https://brainstormers-7e5a.vercel.app](https://brainstormers-7e5a.vercel.app)
* **Code:** [https://github.com/Azzedde/brainstormers](https://github.com/Azzedde/brainstormers)

*If you improve it, send a PR; if you fund it, we can wrap a house LLM and turn
Brainstormers into a full SaaS platform.*
