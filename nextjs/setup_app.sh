#!/bin/bash

########################################
# `chmod +x setup_app.sh`
# `./setup_app.sh 9999`
########################################

DEFAULT_PORT="9999"

PORT="${1:-$DEFAULT_PORT}"
APP_NAME="app${PORT}"

if [ -d "$APP_NAME" ]; then
  echo "Error: Directory $APP_NAME already exists."
  exit 1
fi

echo "Copying base/ to $APP_NAME..."
cp -r base/ "$APP_NAME"

echo "Creating .env file with PORT=$PORT..."
echo "PORT=$PORT" > "$APP_NAME/.env"

echo "Starting pm2 process for $APP_NAME..."
cd "$APP_NAME" && npm run pm2:nextjs:start

echo "Setup completed for $APP_NAME with PORT=$PORT. PM2 process started."
