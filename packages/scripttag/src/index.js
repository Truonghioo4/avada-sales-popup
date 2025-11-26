import DisplayManager from './managers/DisplayManager.js';
import ApiManager from './managers/ApiManager';
import {isShowPop} from './helpers/utils/isShowPop';

(async () => {
  console.log('Script tag loaded');
  const apiManager = new ApiManager();
  const {notifications, settings} = await apiManager.getNotifications();
  if (!isShowPop(settings)) return;
  const displayManager = new DisplayManager();
  await displayManager.initialize({notifications, settings});
})();
