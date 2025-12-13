<div align="center">
  
  <div style="background: linear-gradient(to right, #991b1b, #dc2626, #991b1b); padding: 2px; border-radius: 20px; display: inline-block;">
    <div style="background: #000; padding: 20px; border-radius: 18px;">
      <h1 style="color: white; font-weight: 900; letter-spacing: -2px; font-size: 3rem; margin: 0;">
        YouTube <span style="color: #ef4444;">Downloader</span>
      </h1>
    </div>
  </div>

  <br />
  <br />

  <p align="center">
    <strong>Strictly engineered for speed. Convert YouTube to MP3 & MP4 without limits.</strong>
  </p>

  <p align="center">
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://www.framer.com/motion/">
      <img src="https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    </a>
    <a href="https://github.com/yt-dlp/yt-dlp">
      <img src="https://img.shields.io/badge/Backend-yt--dlp-ff0000?style=for-the-badge&logo=youtube&logoColor=white" alt="yt-dlp" />
    </a>
  </p>

  <br />
</div>

---

## ⚡ Overview

**YouTube Downloader** adalah aplikasi web modern beraliran *Brutalist Design* yang memanfaatkan kekuatan server-side rendering Next.js untuk mengekstrak video dan audio dari YouTube. 

Tidak seperti downloader biasa yang penuh iklan, proyek ini fokus pada **UI/UX Premium**, animasi fluid, dan privasi pengguna.

### 📸 Preview

<img width="1919" height="1079" alt="Screenshot 2025-12-13 221849" src="https://github.com/user-attachments/assets/c819eeed-6a77-4051-b5b8-e9319a8bdfc1" />

---

## 🚀 Fitur Utama

| Fitur | Deskripsi | Status |
| :--- | :--- | :---: |
| **Floating Island Navbar** | Navigasi modern dengan efek *glassmorphism* dan menu mobile responsif. | ✅ |
| **3D Tilt Cards** | Kartu hasil pencarian interaktif yang bergerak mengikuti mouse (Desktop). | ✅ |
| **Server-Side Extraction** | Menggunakan `yt-dlp` di sisi server untuk menghindari limitasi browser/CORS. | ✅ |
| **Proxy Download** | Rute API khusus untuk memaksa download file (`content-disposition`) tanpa membuka tab baru. | ✅ |
| **Format Support** | Mendukung konversi ke **MP3 (Audio)** dan **MP4 (Video)** kualitas tinggi. | ✅ |
| **Tailwind v4** | Menggunakan engine CSS terbaru untuk performa styling maksimal. | ✅ |

---

## 🛠️ Tech Stack

Project ini dibangun menggunakan teknologi terkini:

* **Frontend:** [Next.js 15 (App Router)](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Backend Logic:** * `youtube-dl-exec` (Wrapper untuk yt-dlp)
    * `execa` (Process execution)

---

## 📦 Instalasi & Cara Menjalankan

Ikuti langkah ini untuk menjalankan project di lokal komputer Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstal:
* **Node.js** (v18+)
* **Python** (Wajib diperlukan oleh `yt-dlp` untuk bekerja di background system).

### 2. Clone Repository
```bash
git clone [https://github.com/username-anda/ytdownloader.git](https://github.com/username-anda/ytdownloader.git)
cd ytdownloader
