export const getImageUrl = (imagePath: string | null | undefined) => {
  if (!imagePath) {
    return 'https://via.placeholder.com/200x120/2a2a2a/ffffff?text=No+Image';
  }
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `https://cagura-assets.b-cdn.net/assets/uploaded/${imagePath}`;
};

export const generateVotingUSSDCode = (sessionId: string, itemIndex: string) => {
  return `*797*50*1*${sessionId}*${itemIndex}#`;
};

export const formatVotes = (votes: string) => {
  return parseInt(votes) || 0;
};

export const capitalize = (text: string) => {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const isVotingEnded = (endTime: string) => {
  const now = new Date();
  const votingEndTime = new Date(endTime);
  return now > votingEndTime;
};