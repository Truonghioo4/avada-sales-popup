import Router from 'koa-router';
import * as shopController from '@functions/controllers/shopController';
import * as settingController from '@functions/controllers/settingsController';
import * as notificationsController from '@functions/controllers/notificationsController';
import * as settingsMiddleware from '@functions/middleware/settingsValidationRequest';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});
  /**
   * @API endpoint notifications popup
   */
  router.get('/shops', shopController.getUserShops);
  router.get('/settings', settingController.getSettings);
  router.put(
    '/settings',
    settingsMiddleware.settingsValidationRequest,
    settingController.saveSettings
  );
  router.get('/notifications', notificationsController.getNotifications);
  router.delete('/notifications/:id', notificationsController.removeNotification);
  return router;
}
