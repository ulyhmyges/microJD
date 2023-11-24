#!/bin/bash

# Stop the service
systemctl --user stop node-srv.service

# Suppression du fichier de services de l'utilisateur
rm "$HOME"/.config/systemd/user/node_server.service