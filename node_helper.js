/* global Module, Log */

const url = require('url');
const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  start() {
    console.log('-------------------- MMM-RemoteTemperature Node helper: Node helper started.');
    this._initHandler();
  },

  socketNotificationReceived(notificationName, payload) {
    console.log('-------------------- MMM-RemoteTemperature Node helper: Notification received: ' + notificationName);
    this.sendSocketNotification('REPLY', {});
  },

  _initHandler() {
    this.expressApp.get('/remote-temperature', this._onTemperatureValueReceived.bind(this));
  },

  _onTemperatureValueReceived(req, res) {
    var query = url.parse(req.url, true).query;
    var temp = query.temp;
    this.sendSocketNotification('MMM-RemoteTemperature-Value-Received', { temp: temp });
    res.send('OK');
  }
});
