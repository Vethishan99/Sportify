export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const formatTime = (timeString: string): string => {
  if (!timeString) return "TBD";
  // Time is in format "HH:MM:SS"
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
};

export const getMatchStatus = (
  status: string,
  homeScore: string | null,
  awayScore: string | null
): string => {
  if (homeScore !== null && awayScore !== null) {
    return "Completed";
  }
  if (status?.toLowerCase().includes("postponed")) {
    return "Postponed";
  }
  return "Upcoming";
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
