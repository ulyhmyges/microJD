#!/bin/bash

# Création du dossier de configuration de systemd pour l'utilisateur courant
mkdir --parents "$HOME"/.config/systemd/user/

# Copie du fichier de configuration de systemd
cp node-srv.service "$HOME"/.config/systemd/user/

systemctl --user enable node-srv.service