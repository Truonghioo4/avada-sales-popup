import App from 'koa';
import cors from 'koa-cors';
import router from '@functions/routes/webhook';
import * as errorService from '@functions/services/errorService';
import createErrorHandler from '@functions/middleware/errorHandler';

const api = new App();
api.proxy = true;
api.use(cors());
api.use(createErrorHandler());
api.use(router.routes());
api.use(router.allowedMethods());
api.on('error', errorService.handleError);

export default api;
