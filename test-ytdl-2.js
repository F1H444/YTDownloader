const youtubedl = require('youtube-dl-exec');
const path = require('path');
const fs = require('fs');

// Calculate absolute path to the binary
const binPath = path.resolve(__dirname, 'node_modules/youtube-dl-exec/bin/yt-dlp.exe');

console.log('Binary path:', binPath);
console.log('Exists:', fs.existsSync(binPath));

async function test() {
    console.log('Testing yt-dlp with explicit functionality...');
    try {
        // Try creating the wrapper pointing to the local binary explicitly if possible, 
        // or just rely on the library finding it but ensure we handle execution context.
        // Actually, youtube-dl-exec automatically finds it. 
        // If it fails, we might need to use 'execa' or 'child_process' manually or pass a custom binary path.
        
        // Let's try passing the path explicitly if the library supports it, or just use the library default 
        // and see if the previous error was intermittent or definite. 
        // The previous error "spawn C:\Users\Fiha" is very specific.
        
        const output = await youtubedl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true
        });
        console.log('Title:', output.title);
    } catch (err) {
        console.error('Error details:', err);
    }
}

test();
