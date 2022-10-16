export const removeSpacesFromTitle = (title) => {
  title = title.replace(/\s+/g, "_");
  return title;
};
export const dateToMonthYear = (date) => {
  let year = date.slice(0, 4);
  let month = date.slice(6, 7);
  const dateObj = new Date();
  dateObj.setMonth(month);
  month = dateObj.toLocaleDateString("en-US", { month: "short" });
  return [month + " " + year];
};
export const getRunTimeInHours = (n) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "hr " + rminutes + "min";
};
// export default removeSpacesFromTitle;
