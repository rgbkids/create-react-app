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

ex: 

```
% curl -X POST http://localhost/file -H "Content-Type: application/json" -d '{
  "filepath": "pages/1/App.tsx", 
  "content": "This is a test file"
}' -k

{"message":"File written successfully."}%   
```

```
% curl -X GET "http://localhost/file?filepath=pages/1/App.tsx" -k

{"content":"This is a test file"}%                           
```

```
% curl -X GET "http://localhost/directory?dirPath=." -k   

{"contents":[{"name":"App.css","type":"file"},{"name":"App.test.tsx","type":"file"},{"name":"App.tsx","type":"file"},{"name":"DynamicApp.tsx","type":"file"},{"name":"index.css","type":"file"},{"name":"index.tsx","type":"file"},{"name":"logo.svg","type":"file"},{"name":"pages","type":"directory","contents":[{"name":".gitkeep","type":"file"},{"name":"1","type":"directory","contents":[{"name":"App.tsx","type":"file"}]},{"name":"2","type":"directory","contents":[{"name":"App.tsx","type":"file"}]},{"name":"4","type":"directory","contents":[{"name":"App.tsx","type":"file"}]},{"name":"5","type":"directory","contents":[{"name":"App.tsx","type":"file"}]},{"name":"6","type":"directory","contents":[{"name":"App.tsx","type":"file"}]}]},{"name":"react-app-env.d.ts","type":"file"},{"name":"reportWebVitals.ts","type":"file"},{"name":"server.js","type":"file"},{"name":"setupTests.ts","type":"file"}]}%  
```

### API Server Management (via PM2)

- Starts the server using PM2.

```bash
npm run pm2:server:start
```

- Stops the server managed by PM2.

```bash
npm run pm2:server:stop
```

### React App Management (via PM2)

`Case 1` OR `Case 2`

#### Case 1: Express.js

- Starts the React app using PM2.

```bash
npm run pm2:app:start
```

- Stops the React app managed by PM2.

```bash
npm run pm2:app:stop
```

#### Case 2: Next.js

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
