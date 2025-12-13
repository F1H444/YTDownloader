const youtubedl = require('youtube-dl-exec');

async function test() {
    console.log('Testing yt-dlp...');
    try {
        const output = await youtubedl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true
        });
        console.log('Title:', output.title);
        console.log('Success!');
    } catch (err) {
        console.error('Error:', err);
    }
}

test();
