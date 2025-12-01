import {insertAfter} from '../helpers/insertHelpers';
import {sleep} from '../helpers/utils/sleep';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

/**
 * Display Manager class
 */
export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();
    const {firstDelay, popsInterval, maxPopsDisplay, displayDuration} = settings;

    await sleep(firstDelay * 1000);
    for (const notification of notifications.slice(0, maxPopsDisplay)) {
      this.display(notification, settings);
      await this.fadeOut(displayDuration);
      await sleep(popsInterval * 1000);
    }
  }
  async fadeOut(duration) {
    if (duration === 0) return;
    const container = document.querySelector('#Avada-SalePop');
    const wrapper = document.querySelector('.Avava-SP__Wrapper');
    await sleep(duration * 1000);
    wrapper.style.animation = `fadeOut 0.5s linear forwards`;
    await sleep(500);
    render(null, container);
  }

  display(notification, settings) {
    const {position, mobile_position, hideTimeAgo, truncateProductName} = settings;
    const container = document.querySelector('#Avada-SalePop');
    render(
      <NotificationPopup
        {...notification}
        position={position}
        mobile_position={mobile_position}
        hideTimeAgo={hideTimeAgo}
        truncateProductName={truncateProductName}
      />,
      container
    );
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }
    return popupEl;
  }
}
