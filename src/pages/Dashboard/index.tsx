/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import { WiBarometer } from 'react-icons/wi';
import { FaThermometerHalf } from 'react-icons/fa';
import { ImArrowDownLeft, ImArrowRight, ImArrowUp } from 'react-icons/im';
import { IoIosWater } from 'react-icons/io';
import { Panel, Control, Container, Info, Header } from './styles';
import ThalesLogo from '../../assets/logo.png';

import api from '../../services/api';
import mqttClient from '../../services/mqttClient';

const Dashboard: React.FC = () => {
  const [id, setID] = useState('');
  const [temperature, setTemperature] = useState(10);
  const [humidity, setHumidity] = useState(10);
  const [pressure, setPressure] = useState(10);
  const [aceleX, setAceleX] = useState(10);
  const [aceleY, setAceleY] = useState(10);
  const [aceleZ, setAceleZ] = useState(10);
  const [giroX, setGiroX] = useState(10);
  const [giroY, setGiroY] = useState(10);
  const [giroZ, setGiroZ] = useState(10);
  const [magneX, setMagneX] = useState(10);
  const [magneY, setMagneY] = useState(10);
  const [magneZ, setMagneZ] = useState(10);
  const [value, setValue] = useState(['']);

  /* const [value, setValue] = useState({
    id: '',
    Temperature: 0,
    Pressure: 0,
    Humidity: 0,
    AccelerationX: 0,
    AccelerationY: 0,
    AccelerationZ: 0,
    GiroscopeX: 0,
    GiroscopeY: 0,
    GiroscopeZ: 0,
    MagnetometerX: 0,
    MagnetometerY: 0,
    MagnetometerZ: 0,
  }); */

  useEffect(() => {
    const handleNewMessage = (topic: string, message: Buffer): void => {
      // setValue((s) => JSON.parse(message.toString()));
      setValue(message.toString().split(','));
    };

    mqttClient.on('message', handleNewMessage);
    api.get('Dados').then((response) => {
      if (response.data) {
        setID(value[0]);
        setTemperature(parseInt(value[1], 10));
        setHumidity(parseInt(value[2], 10));
        setPressure(parseInt(value[3], 10));
        setAceleX(parseInt(value[4], 10));
        setAceleY(parseInt(value[5], 10));
        setAceleZ(parseInt(value[6], 10));
        setGiroX(parseInt(value[7], 10));
        setGiroY(parseInt(value[8], 10));
        setGiroZ(parseInt(value[9], 10));
        /* setMagneX(parseInt(value[10], 10));
        setMagneY(parseInt(value[11], 10));
        setMagneZ(parseInt(value[12], 10)); */
      }
    });
  }, [value]);

  return (
    <>
      <Container>
        <Header>
          <strong> ID: {id}</strong>
        </Header>
        <div id="logo">
          <img src={ThalesLogo} alt="Thales" />
        </div>
        <Panel>
          <Control>
            <Info>
              <div id="icon">
                <FaThermometerHalf size={30} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {temperature}°</strong>
                  <p>Temperatura</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <IoIosWater size={30} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {humidity}%</strong>
                  <p>Umidade</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <WiBarometer size={50} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{pressure}</strong>
                  <p>KPa</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Acelerômetro</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {aceleX}</strong>
                  <p>Aceleração X</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowRight size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {aceleY}</strong>
                  <p>Aceleração Y</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowUp size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{aceleZ}</strong>
                  <p>Aceleração Z</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Giroscópio</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {giroX}</strong>
                  <p>Giroscópio X</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowRight size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {giroY}</strong>
                  <p>Giroscópio Y</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowUp size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{giroZ}</strong>
                  <p>Giroscópio Z</p>
                </div>
              </div>
            </Info>
          </Control>
          {/* <strong id="title">Magnetômetro</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {magneX}</strong>
                  <p>Magnetômetro X</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowRight size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {magneY}</strong>
                  <p>Magnetômetro Y</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowUp size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{magneZ}</strong>
                  <p>Magnetômetro Z</p>
                </div>
              </div>
            </Info>
          </Control> */}
        </Panel>
      </Container>
    </>
  );
};

export default Dashboard;
