import axios from "axios";

export default async(req, res) => {
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('access-control-allow-headers', '*');
    res.setHeader('access-control-allow-methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'GET') return res.status(400).send('bad request').end();
    if (req.query.token !== process.env.APP_SECRET) return res.status(401).send('unauthorized').end();
    const { FIREBASE_DATABASE_URL, FIREBASE_DATABASE_SERECT } = process.env;
    const url = new URL(FIREBASE_DATABASE_URL);
    const params = url.searchParams;
    url.pathname = 'orderDetails.json';
    params.append('auth', FIREBASE_DATABASE_SERECT);
    const { data } = await axios.get(url.toString());
    res.json(data);
};