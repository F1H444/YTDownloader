import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    // Filter relevant data to send back
    const data = {
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      thumbnails: info.videoDetails.thumbnails,
      lengthSeconds: info.videoDetails.lengthSeconds,
      viewCount: info.videoDetails.viewCount,
      formats: {
        mp4: format.url, // Note: Direct URLs might have 403 issues on client side without proxy
        mp3: audioFormat.url
      }
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('YTDL Error:', error);
    return NextResponse.json({ error: 'Failed to fetch video info' }, { status: 500 });
  }
}
