export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    const PIXEL_ID = 1139436681763856;
    const ACCESS_TOKEN = EAAYJNHtMAyABS5eLyfiXyHB6Vfkm3CGqaREt9cSLpfcwkLrkFhAz53xTxY4Klek058VH7ot7dVllPftvExzaQ42FMdIMrum9H3PIDYyg7h4VW2FAeU4uXXXQxogYW0DRT4Q16oJgEejRrMgT3TVcZCgVveytYeSZCYmHrYukOYqLGUoTmg8YVyZCVGFQ4TLDwZDZD

    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || '';
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const payload = {
      data: [
        {
          event_name: 'Lead',
          event_time: currentTimestamp,
          action_source: 'website',
          event_source_url: data.source_url || 'https://educationbookpublication.vercel.app/',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent
          }
        }
      ]
    };

    const metaApiUrl = `https://graph.facebook.com/v19.0/${1139436681763856}/events?access_token=${EAAYJNHtMAyABS5eLyfiXyHB6Vfkm3CGqaREt9cSLpfcwkLrkFhAz53xTxY4Klek058VH7ot7dVllPftvExzaQ42FMdIMrum9H3PIDYyg7h4VW2FAeU4uXXXQxogYW0DRT4Q16oJgEejRrMgT3TVcZCgVveytYeSZCYmHrYukOYqLGUoTmg8YVyZCVGFQ4TLDwZDZD}`;

    const response = await fetch(metaApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
