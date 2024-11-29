const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');

const app = express();
const port = 80;
const httpsPort = 443;

const baseDir = path.join(__dirname, 'pages');

const sslDir = path.join(__dirname, '../ssl');
const httpsOptions = {
    key: fs.readFileSync(path.join(sslDir, 'private.key')),
    cert: fs.readFileSync(path.join(sslDir, 'term-app.crt')),
    ca: fs.readFileSync(path.join(sslDir, 'term-app.ca-bundle')),
};

app.post('/create/:id', (req, res) => {
    const { id } = req.params;

    const dirPath = path.join(baseDir, id);
    const filePath = path.join(dirPath, 'App.tsx');

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
        const template = `
import React from 'react';

const App = () => {
    return <h1>Dynamic App ${id}</h1>;
};

export default App;
`;
        fs.writeFileSync(filePath, template, 'utf8');
    }

    res.status(200).send({ message: `App ${id} created.` });
});

https.createServer(httpsOptions, app).listen(httpsPort, () => {
    console.log(`HTTPS Server running on https://localhost:${httpsPort}`);
});

app.listen(port, () => {
    console.log(`HTTP Server running on http://localhost:${port}`);
});

app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});
