function normalizeWebsiteUrl(raw) {
  const input = String(raw).trim();
  if (!input) throw new Error("empty");
  try {
    if (/^https?:\/\//i.test(input)) return new URL(input).toString();
    if (input.startsWith("//")) return new URL(`https:${input}`).toString();
    return new URL(`https://${input}`).toString();
  } catch {
    throw new Error("invalid");
  }
}

exports.handler = async function (event) {
  const raw = event.queryStringParameters?.url;

  if (!raw) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No URL provided" })
    };
  }

  let targetUrl;
  try {
    targetUrl = normalizeWebsiteUrl(raw);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "That doesn't look like a valid website address. Try example.com or www.example.com."
      })
    };
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  const params = new URLSearchParams({ url: targetUrl, strategy: "mobile" });
  if (apiKey) params.set("key", apiKey);

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!res.ok) {
      const detail = data?.error?.message || `PageSpeed returned ${res.status}`;
      return {
        statusCode: res.status >= 400 && res.status < 600 ? res.status : 502,
        body: JSON.stringify({ error: detail })
      };
    }

    if (!data.lighthouseResult) {
      const detail = data?.error?.message || "Could not scan that URL";
      return {
        statusCode: 422,
        body: JSON.stringify({ error: detail })
      };
    }

    const cats = data.lighthouseResult.categories;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        performance: Math.round((cats?.performance?.score || 0) * 100),
        seo: Math.round((cats?.seo?.score || 0) * 100),
        accessibility: Math.round((cats?.accessibility?.score || 0) * 100),
        bestPractices: Math.round((cats?.["best-practices"]?.score || 0) * 100)
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
