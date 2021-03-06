/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import { WiBarometer } from 'react-icons/wi';
import { FaThermometerHalf } from 'react-icons/fa';
import { AiOutlineColumnHeight } from 'react-icons/ai';
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
  const [alt, setAlt] = useState(10);
  const [value, setValue] = useState(['']);

  useEffect(() => {
    const handleNewMessage = (topic: string, message: Buffer): void => {
      setValue(message.toString().split(','));
    };

    mqttClient.on('message', handleNewMessage);
    api.get('Dados').then((response) => {
      if (response.data) {
        setID(value[0]);
        setTemperature(parseInt(value[1], 10));
        setHumidity(parseInt(value[3], 10));
        setPressure(parseInt(value[2], 10));
        setAceleX(parseFloat(parseFloat(value[4]).toFixed(3)));
        setAceleY(parseFloat(parseFloat(value[5]).toFixed(3)));
        setAceleZ(parseFloat(parseFloat(value[6]).toFixed(3)));
        setGiroX(parseFloat(parseFloat(value[7]).toFixed(3)));
        setGiroY(parseFloat(parseFloat(value[8]).toFixed(3)));
        setGiroZ(parseFloat(parseFloat(value[9]).toFixed(3)));
        setAlt(parseInt(value[10], 10));
        /* setMagneX(parseFloat(parseFloat(value[11]).toFixed(3)));
        setMagneY(parseFloat(parseFloat(value[12]).toFixed(3)));
        setMagneZ(parseFloat(parseFloat(value[13]).toFixed(3))); */
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
          <strong id="title">BME</strong>
          <Control>
            <Info>
              <div id="icon">
                <FaThermometerHalf size={30} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {temperature}??C</strong>
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
                  <strong>{pressure} Pa</strong>
                  <p>Press??o</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <AiOutlineColumnHeight size={30} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {alt} m</strong>
                  <p>Altitude</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Aceler??metro</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {aceleX} g</strong>
                  <p>Acelera????o X</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowRight size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {aceleY} g</strong>
                  <p>Acelera????o Y</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowUp size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{aceleZ} g</strong>
                  <p>Acelera????o Z</p>
                </div>
              </div>
            </Info>
          </Control>
          <strong id="title">Girosc??pio</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {giroX}??/s</strong>
                  <p>Girosc??pio X</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowRight size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {giroY}??/s</strong>
                  <p>Girosc??pio Y</p>
                </div>
              </div>
            </Info>
            <Info>
              <div id="icon">
                <ImArrowUp size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong>{giroZ}??/s</strong>
                  <p>Girosc??pio Z</p>
                </div>
              </div>
            </Info>
          </Control>
          {/* <strong id="title">Magnet??metro</strong>
          <Control>
            <Info>
              <div id="icon">
                <ImArrowDownLeft size={20} />
              </div>
              <div id="data">
                <div id="info">
                  <strong> {magneX}</strong>
                  <p>Magnet??metro X</p>
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
                  <p>Magnet??metro Y</p>
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
                  <p>Magnet??metro Z</p>
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
