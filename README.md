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

- Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000).

```bash
npm start
```

- Runs tests in interactive watch mode.

```bash
npm test
```

- Builds the app for production to the `build` folder.

```bash
npm run build
```

- Copies config files for full control (irreversible).

```bash
npm run eject
```

### React App Management (via PM2)

- Starts the React app using PM2.

```bash
npm run pm2:app:start
```

- Stops the React app managed by PM2.

```bash
npm run pm2:app:stop
```

### Server Management (via PM2)

- Starts the server using PM2.

```bash
npm run pm2:server:start
```

- Stops the server managed by PM2.

```bash
npm run pm2:server:stop
```
