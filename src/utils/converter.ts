export function convertedSentence(sentence: string) {
    return sentence
      .toLowerCase()
      .replace(/\s+/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  export function msToTime(duration :number) {
    const milliseconds = (duration % 1000) / 100;
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }


  export const dateConvertToYMD = (dateStr : string) => {
    const releaseDate = new Date(dateStr);
  
    // Get day, month, and year components
    const day = releaseDate.getDate();
    const month = releaseDate.getMonth() + 1; // Month is 0-based, so add 1
    const year = releaseDate.getFullYear();
  
    // Format day and month with leading zeros if necessary
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
  
    // Create the formatted date string
    return `${year}-${formattedMonth}-${formattedDay}`;
  };