import axios from "axios";

export default async(req, res) => {
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('access-control-allow-headers', '*');
    res.setHeader('access-control-allow-methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(400).send('bad request').end();
    const { text } = req.body;
    const { TELEGRAM_BOT_API, TELEGRAM_USER_ID } = process.env;
    const url = new URL('https://api.telegram.org');
    const params = url.searchParams;
    url.pathname = `bot${TELEGRAM_BOT_API}/sendMessage`;
    params.append('chat_id', TELEGRAM_USER_ID);
    params.append('text', decodeURIComponent(text));
    await axios.get(url.toString())
        .then(() => console.log('send:api'))
        .catch(e => console.log('[ERR]', e.message));
    res.status(201).end();
}