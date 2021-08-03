import React, { useState, useEffect } from "react";

const Day = () => {
  const day = new Date();
  const now = `${day.toLocaleDateString("en")} - ${day.toLocaleTimeString(
    "en",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )}`;
  const [curDate, setdate] = useState(now);

  useEffect(() => {
    const timeId = setInterval(() => {
      const day = new Date();
      setdate(
        `${day.toLocaleDateString("zh")}  ${day.toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      );
    }, 30000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  return (
    <div className="day">
      <p>{curDate}</p>
    </div>
  );
};
export default Day;
