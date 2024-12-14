# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Preparation

1. Update `.env` with the environment variables for your setup.

```bash
cp .env.sample .env
```   

- If HTTPS is enabled (`HTTPS=true` in `.env`), ensure the `ssl` folder contains the following files:
    - `.key`: Your private key
    - `.crt`: Your certificate
    - `.ca-bundle`: (Optional)

## Scripts

### Development and Build Scripts

- Builds the app for production to the `build` folder.

```bash
npm install
```

```bash
npm run build
```

- Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000).

```bash
npm start
```

- Start the backend server.

```bash
node src/server.js
```

ex: Express.js 

```bash
% curl -X POST http://localhost/create/123 -H "Content-Type: application/json"

{"message":"App 123 created."}%
```

```bash
% curl -X POST http://localhost/file -H "Content-Type: application/json" -d '{
  "filepath": "pages/1/App.tsx", 
  "content": "This is a test file"
}' -k

{"message":"File written successfully."}%   
```

```bash
% curl -X GET "http://localhost/file?filepath=pages/1/App.tsx" -k

{"content":"This is a test file"}%                           
```

```bash
% curl -X GET "http://localhost/directory?dirPath=." -k   

{"contents":[{"name":"App.css","type":"file"},{"name":"App.test.tsx","type":"file"},{"name":"App.tsx","type":"file"},{"name":"DynamicApp.tsx","type":"file"},{"name":"index.css","type":"file"},{"name":"index.tsx","type":"file"},{"name":"logo.svg","type":"file"},{"name":"pages","type":"directory","contents":[{"name":".gitkeep","type":"file"},{"name":"1","type":"directory","contents":[{"name":"App.tsx","type":"file"}]},{"name":"2","type":"directory","contents":[{"name":"App.tsx","type":"file"}]},{"name":"4","type":"directory","contents":[{"name":"App.tsx","type":"file"}]},{"name":"5","type":"directory","contents":[{"name":"App.tsx","type":"file"}]},{"name":"6","type":"directory","contents":[{"name":"App.tsx","type":"file"}]}]},{"name":"react-app-env.d.ts","type":"file"},{"name":"reportWebVitals.ts","type":"file"},{"name":"server.js","type":"file"},{"name":"setupTests.ts","type":"file"}]}%  
```

ex: Next.js

```bash
% curl -X POST https://www.vteacher.biz:3000/api/create/nextjs/123 -H "Content-Type: application/json"

{"message":"Page 123 created."}%
```

```bash
% curl -X POST https://www.vteacher.biz:3000/api/file -H "Content-Type: application/json" -d '{
  "filepath": "src/app/123/page.tsx", 
  "content": "export default function Page() {return (<div><h1>/api/file</h1></div>);}"
}' -k

{"message":"File written successfully."}%
```

```bash
% curl -X GET "https://www.vteacher.biz:3000/api/file?filepath=src/app/123/page.tsx" -k

{"content":"export default function Page() {return (<div><h1>/api/file</h1></div>);}"}%
```

```bash
% curl -X GET "https://www.vteacher.biz:3000/api/directory?dirPath=./src/app/123/" -k   

{"contents":[{"name":"page.tsx","type":"file"}]}%
```

### Backend API Management (via PM2)

#### server

- Starts the server using PM2.

```bash
npm run pm2:server:start
```

- Stops the server managed by PM2.

```bash
npm run pm2:server:stop
```

### Case 1: Express.js Management (via PM2)

#### app

- Starts the React app using PM2.

```bash
npm run pm2:app:start
```

- Stops the React app managed by PM2.

```bash
npm run pm2:app:stop
```

### Case 2: Next.js Management (via PM2)

```bash
cd nextjs/app/
```

- Starts the server using PM2.

```bash
npm run pm2:nextjs:start
```

- Stops the server managed by PM2.

```bash
npm run pm2:nextjs:stop
```
