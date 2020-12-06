import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import {
    useExpressServer
} from 'routing-controllers';
import { PokemonController } from './controllers';

const PORT = 3000;

async function bootstrap() {
    const app = express();

    app.use(bodyParser.json());

    useExpressServer(app, {
        controllers: [
            PokemonController
        ]
    });

    app.listen(PORT, () => {
        console.log(`Express server listening on port ${PORT}`);
    });
}

bootstrap();