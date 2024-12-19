#!/bin/bash

########################################
# `chmod +x setup_app.sh`
# `./setup_app.sh 9999`
########################################

DEFAULT_PORT="9999"

PORT="${1:-$DEFAULT_PORT}"
APP_NAME="app${PORT}"
HOME_DIR="/root/create-react-app/nextjs"

if [ -d "$HOME_DIR/$APP_NAME" ]; then
  echo "Error: Directory $APP_NAME already exists."
  exit 1
fi

echo "Copying base/ to $APP_NAME..."
cp -r "$HOME_DIR/base/" "$HOME_DIR/$APP_NAME"

echo "Creating .env file with PORT=$PORT..."
echo "PORT=$PORT" > "$HOME_DIR/$APP_NAME/.env"

echo "Starting pm2 process for $APP_NAME..."
cd "$HOME_DIR/$APP_NAME" && npm run pm2:nextjs:start

echo "Setup completed for $APP_NAME with PORT=$PORT. PM2 process started."
