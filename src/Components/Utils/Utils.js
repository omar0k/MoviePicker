
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
// export default removeSpacesFromTitle;
