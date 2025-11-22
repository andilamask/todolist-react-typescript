# To-do List React + TypeScript

Aplikasi to-do list sederhana untuk menambahkan, menandai selesai, dan menghapus tugas. Dibuat dengan React + TypeScript, Vite, Tailwind CSS 4, dan React Icons.

## Fitur
- Tambah tugas baru lewat input dan tombol "Add To do".
- Tandai tugas selesai (teks dicoret) atau hapus tugas.
- Tampilan minimalis dengan Tailwind CSS 4.

## Teknologi
- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- React Icons

## Menjalankan proyek
Pastikan Node.js versi 18+ tersedia.

1. Instal dependensi:
   ```bash
   npm install
   ```
2. Jalankan server dev:
   ```bash
   npm run dev
   ```
3. Buka URL yang ditampilkan (biasanya `http://localhost:5173`).

## Skrip NPM
- `npm run dev` — Menjalankan server pengembangan Vite.
- `npm run build` — Build produksi (`tsc -b` lalu `vite build`).
- `npm run preview` — Menjalankan preview build produksi.
- `npm run lint` — Menjalankan ESLint.

## Catatan
- Data to-do belum disimpan permanen; di-refresh halaman akan mengosongkan daftar.
- Styling utama berada di `src/App.tsx` dan `src/Todo.tsx` dengan utilitas Tailwind.
- Saya mengerjakan ini dibantu dengan panduan Youtube dan Codex AI

