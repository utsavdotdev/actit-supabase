#!/bin/bash

# Specify the directory where you want to place the executable
install_dir="/usr/local/bin"

# Check if the executable already exists in the installation directory
if [ -f "$install_dir/ctodo" ]; then
    echo "Replacing existing executable..."
    cd ..
    sudo cp -f ctodo "$install_dir"
else
    echo "Installing new executable..."
    cd ..
    sudo cp ctodo "$install_dir"
fi

# Add the installation directory to the PATH if not already included
if [[ ":$PATH:" != *":$install_dir:"* ]]; then
    echo "export PATH=\"$install_dir:$PATH\"" | sudo tee -a /etc/profile
fi

echo "Configuration completed. 'ctodo' is now available globally."
