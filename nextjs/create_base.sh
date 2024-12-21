#!/bin/bash

########################################
# `chmod +x setup_base.sh`
# `./setup_base.sh`
########################################

set -e

TARGET_DIR="base"

if [ -d "$TARGET_DIR" ]; then
    echo "Directory '$TARGET_DIR' already exists."
    echo "It will be removed with the following command:"
    echo "rm -fr \"$TARGET_DIR\""
    
    read -p "Do you want to proceed? (y/N): " confirm
    if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
        echo "Operation aborted."
        exit 1
    fi
    
    rm -fr "$TARGET_DIR"
    echo "'$TARGET_DIR' has been removed."
fi

cp -r app "$TARGET_DIR"

rm -fr "$TARGET_DIR/node_modules/"

cd "$TARGET_DIR"

ln -s ../app/node_modules ./node_modules

echo "$TARGET_DIR has been successfully created."
