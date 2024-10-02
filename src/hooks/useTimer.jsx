import { useState, useEffect } from "react";

export function useTimer(initialState = true) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // Retorna el estado de segundos, y las funciones para activar/desactivar el cronómetro
  return {
    seconds,
    isActive,
    setIsActive,
    resetCronometro: () => setSeconds(0),
  };
}
