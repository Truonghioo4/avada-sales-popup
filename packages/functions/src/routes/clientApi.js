import Router from 'koa-router';
import * as clientApiController from '@functions/controllers/clientApiController';

const router = new Router({
  prefix: '/client-api'
});
router.get('/notifications', clientApiController.getClientNotifications);

export default router;
