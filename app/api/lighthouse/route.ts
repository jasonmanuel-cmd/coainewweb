import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.lighthouseResult) {
      return NextResponse.json({ error: 'Could not scan URL' }, { status: 422 });
    }

    const cats = data.lighthouseResult.categories;
    return NextResponse.json({
      performance:   Math.round((cats?.performance?.score   || 0) * 100),
      seo:           Math.round((cats?.seo?.score           || 0) * 100),
      accessibility: Math.round((cats?.accessibility?.score || 0) * 100),
      bestPractices: Math.round((cats?.['best-practices']?.score || 0) * 100),
    });

  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
