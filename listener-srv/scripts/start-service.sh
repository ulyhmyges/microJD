#!/bin/bash

# Recharge la liste des services
systemctl --user daemon-reload

# Démarre le services
systemctl --user start node-srv.service