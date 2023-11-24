import express from "express";
import {Response, Request} from "express";
import {exec} from "child_process";

const app = express();

app.post('/events', express.json(), (req: Request, res: Response) => {
    const {type, data} = req.body;

    if (type === 'newImage') {
        const scriptPath = '/scripts/script.sh';
        exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                return res.status(500).send(error.message);
            }

            return res.status(200).send(stdout);
        });
    }
});

app.listen(3001,
    () => {
        console.log("listening on port 3001")
    });