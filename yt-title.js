module.exports = async function handler(req, res) {
 const id = String(req.query?.video || '');
 if (req.method !== 'GET' || !/^[a-zA-Z0-9_-]{11}$/.test(id)) { res.status(400).json({error:'Invalid video ID'}); return; }
 try {
  const endpoint = 'https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + id);
  const response = await fetch(endpoint, { signal: AbortSignal.timeout(6000), headers: {'Accept':'application/json'} });
  if (!response.ok) { res.status(200).json({title:null}); return; }
  const payload = await response.json();
  const title = typeof payload.title === 'string' ? payload.title.slice(0,110) : null;
  res.setHeader('Cache-Control','public, s-maxage=86400, stale-while-revalidate=604800');
  res.status(200).json({title});
 } catch(err) { res.status(200).json({title:null}); }
};
