<div align="center">

  <h1 align="center">YTDownloader</h1>

  <p align="center">
    <strong>Konversi & Download Video YouTube dengan Gaya Modern</strong>
    <br />
    Cepat · Aman · Responsif · Tanpa Iklan
  </p>

  <p align="center">
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://www.framer.com/motion/">
      <img src="https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
  </p>

  <br />

  ![Uploading Screenshot 2025-12-11 125139.png…]()


  <br />
  <br />

</div>

## ✨ Tentang Proyek

**YTDownloader** adalah aplikasi web modern yang dirancang untuk memudahkan pengguna mengunduh video dan audio dari YouTube. Dibangun dengan fokus pada **User Interface (UI)** yang elegan dan **User Experience (UX)** yang mulus.

Proyek ini tidak hanya sekadar alat, tetapi juga sebuah eksplorasi desain web modern menggunakan efek *Glassmorphism*, *Aurora Backgrounds*, dan animasi interaktif yang halus.

## 🚀 Fitur Unggulan

| Fitur | Deskripsi |
| :--- | :--- |
| 🎨 **Ultra Modern UI** | Desain gelap (Dark Mode) dengan estetika *clean*, efek *glow*, dan tipografi yang rapi. |
| ⚡ **Performa Tinggi** | Dibangun di atas Next.js 15 App Router untuk kecepatan loading yang maksimal. |
| 📱 **Responsif Penuh** | Tampilan sempurna di Desktop, Tablet, hingga Mobile (disertai Hamburger Menu). |
| 🎭 **Animasi Fluid** | Interaksi yang hidup berkat `Framer Motion` (micro-interactions, page transitions). |
| 🔒 **Privasi Terjaga** | Tidak ada penyimpanan log pengguna. Proses konversi berjalan *real-time*. |
| 🛠️ **Tanpa Login** | Langsung gunakan tanpa perlu registrasi atau pengaturan akun yang rumit. |

## 🛠️ Teknologi yang Digunakan

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animasi:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Utils:** `clsx` & `tailwind-merge` untuk manajemen class dinamis.

## 📦 Instalasi & Menjalankan Lokal

Ikuti langkah-langkah ini untuk menjalankan proyek di komputer Anda:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/username-anda/ytdownloader.git](https://github.com/username-anda/ytdownloader.git)
    cd ytdownloader
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

4.  Buka browser dan akses [http://localhost:3000](http://localhost:3000).

## 📂 Struktur Proyek

```bash
.
├── app/              # Source code utama (Next.js App Router)
│   ├── api/          # API Routes (Backend logic/Mock)
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Halaman utama (Frontend logic)
├── public/           # Aset statis (Gambar, Icon, SVG)
├── components/       # Komponen UI (Navbar, Footer, Cards)
└── ...
