export const getMinuteSecondString = (time) => {
  let sec = Math.floor(time % 60);
  sec = sec < 10 ? "0" + sec : sec;
  let min = Math.floor(time / 60);
  min = min < 10 ? "0" + min : min;
  return `${min}:${sec}`;
};
export const getHourMinuteSecondString = (time) => {
  if (time) {
    let hour = Math.floor(time / 60 / 60);
    let sec = Math.floor(time % 60);
    let min = Math.floor(time / 60) - hour * 60;
    return (
      hour.toString().padStart(2, "0") +
      ":" +
      min.toString().padStart(2, "0") +
      ":" +
      sec.toString().padStart(2, "0")
    );
  } else {
    return "00:00:00";
  }
};
export const getYearMonthDayString = () => {
  const Today = new Date();
  let month = Today.getMonth() + 1;
  let day = Today.getDate();
  let year = Today.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  return year + "-" + month + "-" + day;
};
export const getFullDateString = () => {
  const day = new Date();
  return `${day.toLocaleDateString("zh")}  ${day.toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};
/*
const disablePreDay = () => {
  
};
*/
