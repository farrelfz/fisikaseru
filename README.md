# FisikaSeru — Interactive 3D Physics Learning Platform

FisikaSeru adalah web app edukasi fisika berbasis **Next.js 14**, dengan fokus pada pembelajaran konsep lewat **simulasi 3D interaktif**.

## Fitur Utama

- Landing page modern dengan background partikel 3D.
- Halaman katalog simulasi.
- Simulasi **MilikanLab** (Millikan Oil Drop) berbasis physics engine sederhana.
- Kontrol parameter real-time menggunakan Zustand.
- UI modern dengan Tailwind CSS.

## Penjelasan Fisika: Eksperimen Millikan

Eksperimen tetes minyak Millikan digunakan untuk mengukur muatan elektron.
Pada model ini, tetes minyak dipengaruhi dua gaya utama:

1. **Gaya gravitasi**: `Fg = m * g`
2. **Gaya listrik**: `Fe = q * E`, dengan `E = V / d`

Gaya total:

`F_total = Fe - Fg`

Lalu:

- `a = F_total / m`
- `v = v + a * dt`
- `y = y + v * dt`

Simulasi memperbarui nilai posisi (`y`) dan kecepatan (`v`) setiap frame.

## Tech Stack

- Next.js 14 (App Router + TypeScript)
- Tailwind CSS
- React Three Fiber + Drei
- Zustand
- Framer Motion

## Setup

```bash
npm install
npm run dev
```

Aplikasi berjalan di:

```text
http://localhost:3000
```

## Build & Run Production

```bash
npm run build
npm run start
```

## Deployment ke Vercel

1. Push repository ke GitHub.
2. Import project di [Vercel](https://vercel.com/new).
3. Gunakan setting default Next.js.
4. Klik **Deploy**.

Selesai — aplikasi akan online dengan domain Vercel.
