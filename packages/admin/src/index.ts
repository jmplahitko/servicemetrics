import { configs } from './web/config/serverConfig';
import { InitServer } from './web';
import './web/container';

const app = new InitServer();
app.setup(configs);
app.start();
