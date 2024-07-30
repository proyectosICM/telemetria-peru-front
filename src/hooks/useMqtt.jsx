import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const useMqtt = (brokerUrl, topic) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = mqtt.connect(brokerUrl);
    client.on('connect', () => {
      console.log('Conectado a MQTT Broker');
      setIsConnected(true);
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Suscrito al tópico ${topic}`);
        }
      });
    });

    client.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic) {
        console.log(`Mensaje recibido: ${message.toString()}`);
        setMessages((prevMessages) => [...prevMessages, message.toString()]);
      }
    });

    setClient(client);

    return () => {
      client.end();
    };
  }, [brokerUrl, topic]);

  const sendMessage = (message) => {
    if (client && isConnected) {
      client.publish(topic, message);
      console.log(`Mensaje enviado: ${message}`);
    }
  };

  return {
    client,
    isConnected,
    messages,
    sendMessage,
  };
};

export default useMqtt;
