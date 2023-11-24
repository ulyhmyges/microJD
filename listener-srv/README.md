### Server listener

Express project deployed on Digital Ocean server
Config files in script directory to start Express project on the server

Listening on port 3001.

The server is waiting for event :
    - route '/events', method POST

Then, the server execute scripts/script.sh
And, starts a container of the client project named 'client-ci'