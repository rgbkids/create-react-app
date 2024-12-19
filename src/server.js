const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 80;
const httpsPort = 443;

app.use(express.json());

const baseDir = path.join(__dirname, 'pages');
const baseNextjsDir = path.join(__dirname, '../nextjs/app/src/app/');
const HOME_DIR = path.join(__dirname, './');

const sslDir = path.join(__dirname, '../ssl');
const httpsOptions = {
    key: fs.readFileSync(path.join(sslDir, 'private.key')),
    cert: fs.readFileSync(path.join(sslDir, 'term-app.crt')),
    ca: fs.readFileSync(path.join(sslDir, 'term-app.ca-bundle')),
};

const allowedOrigins = ['http://localhost:3000', 'https://school.vteacher.biz'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.post('/create/:id', (req, res) => {
    const { id } = req.params;

    const dirPath = path.join(baseDir, id);
    const filePath = path.join(dirPath, 'App.tsx');
    const filePathComponent = path.join(dirPath, 'Component.tsx');

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
        const template = `
export default function App() {
  return (
    <div>
      <h1>App ${id}</h1>
    </div>
  );
}
`;
        fs.writeFileSync(filePath, template, 'utf8');
    }

    if (!fs.existsSync(filePathComponent)) {
        const template = `
export default function Component() {
  return (
    <div>
      <h1>Component ${id}</h1>
    </div>
  );
}
`;
        fs.writeFileSync(filePathComponent, template, 'utf8');
    }

    res.status(200).send({ message: `App ${id} created.` });
});

app.post('/create/nextjs/:id', (req, res) => {
    const { id } = req.params;

    const dirPath = path.join(baseNextjsDir, id);
    const filePath = path.join(dirPath, 'page.tsx');

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
        const template = `
export default function Page() {
  return (
    <div>
      <h1>Page ${id}</h1>
    </div>
  );
}
`;
        fs.writeFileSync(filePath, template, 'utf8');
    }

    res.status(200).send({ message: `Page ${id} created.` });
});

app.post('/file', (req, res) => {
    const { filepath, content } = req.body;

    if (!filepath || !content) {
        return res.status(400).json({ error: 'Filepath and content are required.' });
    }

    const fullPath = path.join(HOME_DIR, filepath);

    fs.writeFile(fullPath, content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ error: 'Failed to write file.' });
        }
        console.log(`File written at ${fullPath}`);
        res.json({ message: 'File written successfully.' });
    });
});

app.get('/file', (req, res) => {
    const filepath = req.query.filepath;

    if (typeof filepath !== 'string') {
        return res.status(400).json({ error: 'Filepath must be a single string value.' });
    }

    const fullPath = path.join(HOME_DIR, filepath);

    fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to read file.' });
        }
        console.log(`File read from ${fullPath}`);
        res.json({ content: data });
    });
});

app.get('/directory', (req, res) => {
    const dirPath = req.query.dirPath;

    if (typeof dirPath !== 'string') {
        return res.status(400).json({ error: 'Directory path must be a single string value.' });
    }

    const fullPath = path.join(HOME_DIR, dirPath);

    const getDirectoryContents = (currentPath, level) => {
        if (level > 5) {
            return [];
        }

        try {
            const items = fs.readdirSync(currentPath, { withFileTypes: true });
            return items.map((item) => {
                const itemPath = path.join(currentPath, item.name);
                if (item.isDirectory()) {
                    return {
                        name: item.name,
                        type: 'directory',
                        contents: getDirectoryContents(itemPath, level + 1),
                    };
                } else {
                    return {
                        name: item.name,
                        type: 'file',
                    };
                }
            });
        } catch (err) {
            console.error('Error reading directory:', err);
            return [{ name: 'Error', type: 'file' }];
        }
    };

    const directoryContents = getDirectoryContents(fullPath, 1);

    if (!directoryContents) {
        return res.status(500).json({ error: 'Failed to read directory or depth exceeded.' });
    }

    res.json({ contents: directoryContents });
});

app.post('/run-setup', (req, res) => {
    const port = req.body.port || '9999';
    const scriptPath = '/root/create-react-app/nextjs/setup_app.sh';

    exec(`bash ${scriptPath} ${port}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: `Setup completed on port ${port}`, output: stdout });
    });
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
