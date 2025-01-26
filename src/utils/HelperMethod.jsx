export const formatNumberPrice = (number) => {
  const formattedPrice = number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formattedPrice;
};

export const formatDate = (date) => {
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
};

export const formatDateTime = (date) => {
  const dateObj = new Date(date);

  const dateString = dateObj.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const timeString = `${hours.toString().padStart(2, "0")}.${minutes
    .toString()
    .padStart(2, "0")} WIB`;

  const formattedDateTime = `${dateString} ${timeString}`;
  return formattedDateTime;
};
