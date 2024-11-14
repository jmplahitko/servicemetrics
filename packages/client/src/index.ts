import './styles.css';
import './charts';

import { router } from './router';
import { createApp } from 'vue';
import appComponent from './pages/app';
import { pinia } from './state';

const app = createApp(appComponent)
app.use(pinia);
app.use(router);

app.mount('#main');