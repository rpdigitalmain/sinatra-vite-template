import './main.scss';
import { updateHealthStatus } from './js/health.js';

await updateHealthStatus(document.querySelector('[role="status"]'));
