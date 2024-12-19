require('dotenv').config();

const { createServer } = require('https');
const { parse } = require('url');
const fs = require('fs');
const next = require('next');
const cors = require('cors');
const express = require('express');

const sslDir = '../../ssl/';
const httpsOptions = {
    key: fs.readFileSync(`${sslDir}private.key`),
    cert: fs.readFileSync(`${sslDir}term-app.crt`),
    ca: fs.readFileSync(`${sslDir}term-app.ca-bundle`),
};

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

const server = express();

const allowedOrigins = ['http://localhost:3000', 'https://school.vteacher.biz'];

server.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.prepare().then(() => {
    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    createServer(httpsOptions, server).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on https://localhost:${port}`);
    });
});