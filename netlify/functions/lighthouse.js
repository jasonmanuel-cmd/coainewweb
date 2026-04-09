exports.handler = async function(event) {
  const url = event.queryStringParameters?.url;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No URL provided' }),
    };
  }

  const apiKey = process.env.PAGESPEED_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&key=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.lighthouseResult) {
      return {
        statusCode: 422,
        body: JSON.stringify({ error: 'Could not scan that URL', detail: data.error?.message || 'Unknown' }),
      };
    }

    const cats = data.lighthouseResult.categories;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        performance:   Math.round((cats?.performance?.score   || 0) * 100),
        seo:           Math.round((cats?.seo?.score           || 0) * 100),
        accessibility: Math.round((cats?.accessibility?.score || 0) * 100),
        bestPractices: Math.round((cats?.['best-practices']?.score || 0) * 100),
      }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};