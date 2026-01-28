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
2) Pindahkan konten simulasi:
   - Jika ingin mempertahankan riwayat di repo baru, gunakan `git filter-repo`/`filter-branch` untuk mengekstrak folder `simulasi` ke repo baru.
   - Opsi sederhana: salin manual isi `simulasi` ke clone `fisikaseru-simulasi`, lalu commit pertama di sana.

## Menautkan submodule pada `fisikaseru.github.io`
```
cd fisikaseru.github.io
git rm -r simulasi            # pastikan sudah ada backup/di repo baru
git submodule add https://github.com/Fisikaseru/fisikaseru-simulasi simulasi
git commit -m "Add simulasi submodule"
git push
```

## Workflow GitHub Pages (di repo fisikaseru.github.io)
File: `.github/workflows/pages.yml`
- `actions/checkout@v4` dengan `submodules: recursive`
- `actions/configure-pages@v4`
- `actions/upload-pages-artifact@v3` path `./out` (hasil `next export`)
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
