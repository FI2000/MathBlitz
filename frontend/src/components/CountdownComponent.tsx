import React, { useState, useEffect } from "react";

interface CountdownProps {
  initialSeconds: number;
  onComplete: () => void;
  onTick: (seconds: number) => void;
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds, onComplete, onTick }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          onTick(prevSeconds - 1);
          return prevSeconds - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      onComplete();
    }
  }, [seconds, onComplete, onTick]);

  return <div>{seconds}</div>;
};

export default Countdown;
