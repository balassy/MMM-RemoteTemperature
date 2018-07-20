/* global Module, Log */

/* Magic Mirror Module: MMM-RemoteTemperature (https://github.com/balassy/MMM-RemoteTemperature)
 * By György Balássy (https://www.linkedin.com/in/balassy)
 * MIT Licensed.
 */

Module.register('MMM-RemoteTemperature', {
  defaults: {
  },

  requiresVersion: '2.1.0',

  getTranslations() {
    return {
      en: 'translations/en.json',
      hu: 'translations/hu.json'
    };
  },

  start() {
    this.viewModel = null;
    this._initCommunication();
  },

  getDom() {
    const wrapper = document.createElement('div');

    if (this.viewModel) {
      const tempEl = document.createElement('div');
      tempEl.innerHTML = this.viewModel.temp;
      wrapper.appendChild(tempEl);
    } else {
      const loadingEl = document.createElement('span');
      loadingEl.innerHTML = this.translate('LOADING');
      loadingEl.classList = 'dimmed small';
      wrapper.appendChild(loadingEl);
    }

    return wrapper;
  },

  socketNotificationReceived(notificationName, payload) {
    Log.info('-------------------- MMM-RemoteTemperature: Notification received: ' + notificationName);
    const temp = payload.temp;
    this.viewModel = {
      temp: temp
    };

    this.updateDom();
  },

  _initCommunication() {
    this.sendSocketNotification('CONNECT', null);
  }
});
