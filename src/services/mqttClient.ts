import mqtt from 'mqtt';

const username = process.env.REACT_APP_BROKER_USERNAME;
const password = process.env.REACT_APP_BROKER_PASSWORD;

const mqttClient = mqtt.connect(
  `wss://${username}:${password}@thalesiot.cloud.shiftr.io`,
  { clientId: 'dashboard' },
);

mqttClient.on('connect', () => {
  mqttClient.subscribe('/Dados');
});

export default mqttClient;
