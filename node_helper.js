const bodyParser = require('body-parser');
const NodeHelper = require('node_helper'); // eslint-disable-line import/no-unresolved

module.exports = NodeHelper.create({
  start() {
    this._initHandler();
  },

  socketNotificationReceived(notificationName, payload) {
    if (notificationName === 'MMM-RemoteTemperature.INIT') {
      console.log(`MMM-RemoteTemperature Node helper: Init notification received from module for sensor "${payload.sensorId}".`); // eslint-disable-line no-console
    }
  },

  _initHandler() {
    this.expressApp.use(bodyParser.json());
    this.expressApp.post('/remote-temperature', this._onTemperatureValueReceived.bind(this));
  },

  _onTemperatureValueReceived(req, res) {
    const params = req.body;

    const payload = {
      temp: params.temp,
      humidity: params.humidity,
      battery: params.battery,
      sensorId: params.sensorId,
      ext: params.ext
    };

    this.sendSocketNotification('MMM-RemoteTemperature.VALUE_RECEIVED', payload);

    res.sendStatus(200);
  }
});
