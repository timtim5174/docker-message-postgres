import express, {Express} from 'express';
import * as bodyParser from 'body-parser';
import message from './route/message';
import { Client } from 'pg';

const port = 8080;
const user = 'postgres';
const host = 'localhost';
const database = 'postgres';
const password = 'secret';
const dbPort = 5432;
const connectionString = `postgresql://${user}:${password}@${host}:${dbPort}/${database}`;

async function start(){
    const app = express();
    app.use(bodyParser.json());
    app.use('/message', message);

    //app.locals.db = await connectToPostgres();
    await startServer(app);
}

function connectToPostgres(){
    return new Promise<Client>((resolve) => {
        const client = new Client({
            connectionString: connectionString
        });
        client.connect()
        .then(() => {
            console.log('Connection to postgres was succesful');
            resolve(client);
        })
        .catch(err => {
            console.log('Could not connect to postgres');
            console.log(err);
            process.exit(-1);
        })
    });
}

async function startServer(app: Express){
    app.get('/', (req, res) => {
        res.send(`Hello from express server`);
    });
    app.listen(port, ()=> {
        console.log(`Server is running on port ${port} ...`);
    });
}

start();