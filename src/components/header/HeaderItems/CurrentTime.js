import React, { useState, useEffect } from 'react';
import { getFullDateString } from '../../../utils/helpers/time';

const Day = () => {
  const [todayDate, setTodayDate] = useState(getFullDateString());
  useEffect(() => {
    const timeId = setInterval(() => {
      setTodayDate(getFullDateString());
    }, 10000);
    return () => {
      clearInterval(timeId);
    };
  }, []);

  return (
    <div className="day">
      <p>{todayDate}</p>
    </div>
  );
};
export default Day;
