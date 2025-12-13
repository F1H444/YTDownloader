const path = require('path');
const execa = require('execa');

const binPath = path.resolve(__dirname, 'node_modules/youtube-dl-exec/bin/yt-dlp.exe');
console.log('Using binary at:', binPath);

async function test() {
    try {
        const { stdout } = await execa(binPath, [
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            '--no-check-certificates',
            '--no-warnings',
            '--prefer-free-formats',
            '--add-header', 'referer:youtube.com',
            '--add-header', 'user-agent:googlebot',
            '--get-url',
            '-f', 'best[ext=mp4][vcodec!*=none][acodec!*=none]/best[ext=mp4]/best'
        ]);
        
        console.log('MP4 URL:', stdout);
    } catch (err) {
        console.error('Execa Failed:', err);
    }
}

test();
