import express, {Express} from 'express';
import * as bodyParser from 'body-parser';
import message from './route/message';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Message } from './models/message';

const port = 8080;
const database = process.env.RDS_DB_NAME || 'postgres';
const user = process.env.RDS_USERNAME || 'postgres';
const host = process.env.RDS_HOSTNAME || 'localhost';
const password = process.env.RDS_PASSWORD || 'postgres';
const dbPort = process.env.RDS_PORT ? parseInt(process.env.RDS_PORT) : 5432;

async function start(){
    const app = express();
    app.use(bodyParser.json());
    app.use('/message', message);

    app.locals.db = await connectToPostgres();
    
    await startServer(app);
}

async function connectToPostgres(){
    try {
        const connection = await createConnection({ 
            type: 'postgres',
            host: host,
            port: dbPort,
            username: user,
            password: password,
            database: database,
            entities: [ Message ]
        });
        await connection.synchronize();
        console.log('Connection to postgres was succesful');
        return connection;
    }
    catch (err) {
        console.log('Could not connect to postgres');
        console.log(err);
        process.exit(-1);
    }
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