
const mqttDataHandler = (messages, setData, criterio) => {
  if (messages.length > 0) {
    const lastMessageStr = messages[messages.length - 1];
 
    try {
 
      if (lastMessageStr.startsWith(criterio)) {
        const value = parseFloat(lastMessageStr.split(":")[1].trim());
        setData(value);
      } else {
        const lastMessage = JSON.parse(lastMessageStr);
        if (lastMessage[criterio] !== undefined) {
          const value = lastMessage[criterio];
          setData(value);
        } else {
          console.log(`${criterio} no actualizado`);
        }
      }
    } catch (err) {
      console.error("Error parsing MQTT message", err);
      setData(null);
    }
  }
};


export default mqttDataHandler;
