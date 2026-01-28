## Ringkasan arsitektur
- Monorepo tidak dipakai; repo `fisikaseru.github.io` untuk situs utama, repo `fisikaseru-simulasi` sebagai sumber tunggal `/simulasi` via submodule.
- Struktur `fisikaseru-simulasi` rekomendasi:
  ```
  /pretest
  /stage-1
  /stage-2
  /stage-3
  /shared (komponen/util umum)
  /assets (gambar, audio, font)
  /index.html  (landing simulasi)
  ```

## Langkah pindah simulasi ke repo baru
1) Buat repo publik `fisikaseru-simulasi` (org Fisikaseru).
2) Dari `fisikaseru.github.io`, pindahkan konten simulasi ke repo baru (gunakan `git mv` bila riwayat ingin ikut):
   ```
   # di clone fisikaseru.github.io lama
   git mv simulasi ../fisikaseru-simulasi/
   ```
   Jika tidak satu working tree, salin manual lalu commit di repo baru.

## Menautkan submodule pada `fisikaseru.github.io`
```
cd fisikaseru.github.io
rm -rf simulasi            # atau git rm -r simulasi jika ingin commit penghapusan
git submodule add https://github.com/Fisikaseru/fisikaseru-simulasi simulasi
git commit -am "Add simulasi submodule"
git push
```

## Workflow GitHub Pages (di repo fisikaseru.github.io)
File: `.github/workflows/pages.yml`
- `actions/checkout@v4` dengan `submodules: recursive`
- `actions/configure-pages@v5`
- `actions/upload-pages-artifact@v3` path `.`
- `actions/deploy-pages@v4`
- permissions: `contents: read`, `pages: write`, `id-token: write`
- upload path root (`.`) karena situs statis

## Checklist verifikasi deploy
- Buka https://fisikaseru.github.io dan https://fisikaseru.github.io/simulasi
- `git submodule status` menampilkan commit simulasi
- Di Actions, pastikan langkah checkout mencatat submodule
- Jika `/simulasi` 404: cek submodule init/update, cek casing path, pastikan index.html ada.
- Jika blank: periksa asset path relatif, pastikan base href tidak hardcode.

## Merapikan organisasi (hanya 2 repo publik)
- Opsi aman:
  - Transfer repo lain ke org arsip (contoh `Fisikaseru-Archive`) lewat Settings > Transfer ownership.
  - Atau jadikan private (Settings > Danger Zone > Change visibility). Konsekuensi: kehilangan publikasi tapi aman.
- Jangan hapus tanpa backup. Pastikan Actions dimatikan sebelum transfer/privat.
- CLI (gh):
  ```
  gh repo transfer <owner>/<repo> Fisikaseru-Archive
  gh repo edit <owner>/<repo> --visibility private
  ```
