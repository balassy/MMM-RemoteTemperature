const url = require('url');
const NodeHelper = require('node_helper'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = NodeHelper.create({
  start() {
    this._initHandler();
  },

  socketNotificationReceived(notificationName, payload) {
    if (notificationName === 'MMM-RemoteTemperature.INIT') {
      console.log(`MMM-RemoteTemperature Node helper: Init notification received from module for sensor "${payload.sensorId}".`);
    }
  },

  _initHandler() {
    this.expressApp.get('/remote-temperature', this._onTemperatureValueReceived.bind(this));
  },

  _onTemperatureValueReceived(req, res) {
    const query = url.parse(req.url, true).query;

    const payload = {
      temp: query.temp,
      sensorId: query.sensorId
    };
    this.sendSocketNotification('MMM-RemoteTemperature.VALUE_RECEIVED', payload);

    res.sendStatus(200);
  }
});
