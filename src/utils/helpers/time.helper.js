export const getMinuteSecondString = (time) => {
  let sec = Math.floor(time % 60);
  sec = sec < 10 ? "0" + sec : sec;
  let min = Math.floor(time / 60);
  min = min < 10 ? "0" + min : min;
  return `${min}:${sec}`;
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
