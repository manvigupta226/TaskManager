// Mocked version:
export const suggestTitleMock = async (description) => {
  // pretend to call AI: return short title
  const first = description.split('.').filter(Boolean)[0] || description;
  const short = first.split(' ').slice(0,6).join(' ');
  return Promise.resolve(short.length ? short : 'New Task');
};

// Real version (outline) — you need your server to proxy API key
export const suggestTitleReal = async (description) => {
  const res = await fetch('/api/ai/suggest-title', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ description })
  });
  return res.json(); // { title: "..." }
};
