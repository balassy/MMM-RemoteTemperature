/* global Module, moment */

/* Magic Mirror Module: MMM-RemoteTemperature (https://github.com/balassy/MMM-RemoteTemperature)
 * By György Balássy (https://www.linkedin.com/in/balassy)
 * MIT Licensed.
 */

Module.register('MMM-RemoteTemperature', {
  defaults: {
    sensorId: null,
    icon: 'home',
    showMore: true,
    ext: []
  },

  requiresVersion: '2.1.0',

  getScripts() {
    return [
      'moment.js'
    ];
  },

  getStyles() {
    return [
      'MMM-RemoteTemperature.css',
      'font-awesome.css',
      'font-awesome5.css'
    ];
  },

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
      const firstLineEl = document.createElement('div');

      if (this.config.icon) {
        const iconEl = document.createElement('span');
        iconEl.classList = `symbol fa fa-${this.config.icon}`;
        firstLineEl.appendChild(iconEl);
      }

      if (this.viewModel.temp) {
        const tempEl = document.createElement('span');
        tempEl.classList = 'temp';
        tempEl.innerHTML = `${this.viewModel.temp}&deg;`;
        firstLineEl.appendChild(tempEl);
      }

      if (this.viewModel.humidity) {
        const humidityEl = document.createElement('span');
        humidityEl.classList = 'humidity';
        humidityEl.innerHTML = `${this.viewModel.humidity}%`;
        firstLineEl.appendChild(humidityEl);
      }

      wrapper.appendChild(firstLineEl);

      if (this.viewModel.ext) {
        const extLineEl = document.createElement('div');

        this.viewModel.ext.forEach((extData) => {
          const extEl = document.createElement('span');
          extEl.innerHTML = `${extData.value}${extData.unit}`;
          extEl.classList = 'ext';
          extLineEl.appendChild(extEl);
        });

        wrapper.appendChild(extLineEl);
      }

      if (this.config.showMore) {
        const secondLineEl = document.createElement('div');
        secondLineEl.classList = 'more dimmed small';
        secondLineEl.innerHTML = `<span class="fa fa-refresh"></span> ${this._formatTimestamp(this.viewModel.timestamp)}`;

        if (this.viewModel.battery) {
          secondLineEl.innerHTML += `<span class="fa fa-battery-half"></span> ${this.viewModel.battery}%`;
        }

        wrapper.appendChild(secondLineEl);
      }
    } else {
      const loadingEl = document.createElement('span');
      loadingEl.innerHTML = this.translate('LOADING');
      loadingEl.classList = 'dimmed small';
      wrapper.appendChild(loadingEl);
    }

    return wrapper;
  },

  socketNotificationReceived(notificationName, payload) {
    if (notificationName === 'MMM-RemoteTemperature.VALUE_RECEIVED' && payload) {
      if (!this.config.sensorId || (this.config.sensorId && this.config.sensorId === payload.sensorId)) {
        this.viewModel = {
          temp: payload.temp,
          humidity: payload.humidity,
          battery: payload.battery,
          ext: this._parseExtFields(payload.ext),
          timestamp: Date.now()
        };

        this.updateDom();
      }
    }
  },

  _initCommunication() {
    this.sendSocketNotification('MMM-RemoteTemperature.INIT', {
      sensorId: this.config.sensorId
    });
  },

  _formatTimestamp(timestamp) {
    return moment(timestamp).format('HH:mm');
  },

  _parseExtFields(extPayload) {
    const parsedExtValues = [];

    if (this.config.ext && extPayload) {
      this.config.ext.forEach((extConfig) => {
        const { name } = extConfig;
        const value = extPayload[name];
        const unit = extConfig.unit || '';

        if (typeof value !== 'undefined') {
          parsedExtValues.push({
            name,
            value,
            unit
          });
        }
      });
    }

    return parsedExtValues;
  }
});
