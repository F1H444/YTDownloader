import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import execa from 'execa';

// Helper function to find yt-dlp binary
function getBinaryPath() {
    const localBin = path.join(process.cwd(), 'node_modules', 'youtube-dl-exec', 'bin', 'yt-dlp.exe');
    if (fs.existsSync(localBin)) return localBin;
    return 'yt-dlp';
}

export async function POST(request: Request) {
  try {
    const { url, format } = await request.json();

    if (!url) return NextResponse.json({ error: 'URL wajib diisi' }, { status: 400 });

    try {
        console.log(`Processing download for: ${url} format: ${format}`);
        
        const binPath = getBinaryPath();
        const baseArgs = [
            url,
            '--no-check-certificates',
            '--no-warnings',
            '--prefer-free-formats',
            '--add-header', 'referer:youtube.com',
            '--add-header', 'user-agent:googlebot',
            '--get-url' // Equivalent to getUrl: true
        ];

        if (format === 'mp3') {
            baseArgs.push('-f', 'bestaudio/best');
        } else {
            // Force strict MP4 format that contains BOTH video and audio (progressive download)
            // 'bestvideo+bestaudio' requires ffmpeg merge (not possible via direct link)
            // 'best' usually selects the best single file (often 720p)
            // We explicitly ask for mp4 extension and exclude formats with no video or no audio
            baseArgs.push('-f', 'best[ext=mp4][vcodec!*=none][acodec!*=none]/best[ext=mp4]/best');
        }

        // Execa v5 returns promise with { stdout }
        const { stdout } = await execa(binPath, baseArgs);
        
        const downloadUrl = stdout ? stdout.trim().split('\n')[0] : null;

        if (downloadUrl) {
            return NextResponse.json({ url: downloadUrl });
        } else {
             console.error('yt-dlp produced no output URL');
             return NextResponse.json({ error: 'Gagal mengambil link download.' }, { status: 502 });
        }
        
    } catch (e: any) {
        console.error(`Link conversion failed:`, e);
        return NextResponse.json({ error: 'Gagal memproses permintaan download.' }, { status: 503 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}