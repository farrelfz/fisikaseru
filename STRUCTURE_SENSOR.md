# FisikaSeru Structure Sensor

Dokumen ini memastikan Copilot menjaga struktur resmi blueprint.

```
src/
  app/
    layout.tsx
    page.tsx
    belajar/[level]/[slug]/page.tsx
    simulasi/page.tsx
    simulasi/[slug]/page.tsx
    kuis/page.tsx
    kuis/[quizId]/page.tsx
    kuis/hasil/[attemptId]/page.tsx
    dashboard/page.tsx
    auth/login/page.tsx
    api/
      kuis/start/route.ts
      kuis/submit/route.ts
      simulasi/run/route.ts
      simulasi/export/route.ts
      user/progress/route.ts
  components/
    Navbar.tsx
    Footer.tsx
    Simulation/*
    Quiz/*
  lib/
    supabase.ts
    simulation.ts
    quiz.ts
    auth.ts
    schemas.ts
    utils.ts
  providers/*
  store/*
  types/*
```

Seluruh perubahan harus menjaga hierarki ini dan mengikuti konstanta fisika pada `src/lib/simulation.ts`.

## Layout Simulasi MilikanLab

- Seluruh halaman di dalam `src/app/simulasi` wajib memakai grid dua kolom: sisi kiri khusus `ParameterPanel`, sisi kanan berisi tumpukan `ControlPanel`, `SimulationCanvas`, lalu panel data.
- Kolom kanan secara berurutan menampilkan `GraphPanel`, `DataTable`, dan `BottomPanel`. Tidak ada wrapper tambahan seperti `SimulationTabs` atau `SimulationMonitor`.
- Panel data di bawah kanvas harus selalu berada dalam kolom kanan yang sama, sehingga struktur UI konsisten antar halaman simulasi.
