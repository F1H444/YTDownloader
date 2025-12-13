import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import execa from 'execa';

// Helper function to find yt-dlp binary
function getBinaryPath() {
    const localBin = path.join(process.cwd(), 'node_modules', 'youtube-dl-exec', 'bin', 'yt-dlp.exe');
    if (fs.existsSync(localBin)) return localBin;
    // Fallback if not found (e.g. linux/other env)
    return 'yt-dlp';
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL wajib diisi' }, { status: 400 });
    }

    // 1. Validasi ID YouTube dasar
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
        return NextResponse.json({ error: 'Link YouTube tidak valid.' }, { status: 400 });
    }

    // 2. Gunakan yt-dlp via execa (Robust for Windows paths with spaces)
    try {
      const binPath = getBinaryPath();
      const args = [
        url,
        '--dump-single-json',
        '--no-check-certificates',
        '--no-warnings',
        '--prefer-free-formats',
        '--add-header', 'referer:youtube.com',
        '--add-header', 'user-agent:googlebot'
      ];

      const { stdout } = await execa(binPath, args);
      const output = JSON.parse(stdout);

      // 3. Susun data agar sesuai dengan frontend
      const highResThumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      const thumbnails = output.thumbnails || [];
      const bestThumbnail = thumbnails.length > 0 ? thumbnails[thumbnails.length - 1].url : highResThumbnail;

      return NextResponse.json({
        title: output.title,
        author: output.uploader,
        thumbnails: [{ url: highResThumbnail }, { url: bestThumbnail }],
        viewCount: output.view_count,
        videoId: videoId,
        duration: output.duration 
      });

    } catch (ytError: any) {
      console.error('yt-dlp error:', ytError);
      return NextResponse.json({ error: 'Gagal mengambil data video dari YouTube.' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Analyze API Error:', error);
    return NextResponse.json({ error: 'Gagal memproses data video.' }, { status: 500 });
  }
}