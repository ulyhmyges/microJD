# microJD

IP client (front): 192.168.240.2
name container (front): client-c

IP b-test (back): 192.168.240.4
name container (back): b-test-c

IP mongo (db): 192.168.240.3
name container (db): mongo-c

`docker exec -it client-c sh`

inside container 'client-c':

    Request POST:
    curl --data '{"email": "test@test.com", "password": "password", "login": "john"}' -H "Content-Type: application/json" -X POST http://192.168.240.4:3001/auth/subscribe

    Request GET:
    curl http://192.168.240.4:3001/auth/accounts

