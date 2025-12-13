import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');
  const filename = searchParams.get('filename') || 'download.mp4';

  if (!fileUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
       console.error(`Download Proxy Failed: ${response.status} ${response.statusText} for URL: ${fileUrl}`);
       return NextResponse.json({ error: `Failed to download file from YouTube server: ${response.status}` }, { status: 502 });
    }

    const headers = new Headers(response.headers);
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Ensure we don't pass encoding headers that might confuse the browser/Next.js if we are piping raw bytes
    headers.delete('Content-Encoding');

    return new NextResponse(response.body, {
      status: 200,
      headers: headers,
    });

  } catch (error) {
    console.error('Download Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
