  // Format a date
  export function formatDate(str) {
    const year = str.substring(0, 4);
    const month = str.substring(4, 6);
    const day = str.substring(6, 8);
    const hour = str.substring(9, 11);
    const minute = str.substring(11, 13);
    const second = str.substring(13, 15);

    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    return date.toLocaleDateString(undefined, options);
}

// Formats a time to 24 hour for example 16:38

export function formatTime(str) {
    const hour = str.substring(9, 11);
    const minute = str.substring(11, 13);

    return `${hour}:${minute}`;
}

export function formatLabel(dateString) {
  var options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format a date
export function formatDBDate(dateStr) {
  const suffixes = ["th", "st", "nd", "rd"];
  const date = new Date(dateStr);
  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];

  let suffix = (day <= 3 || day >= 21) ? suffixes[day % 10] : suffixes[0];

  return `${day}${suffix} ${month} ${year}`;
}