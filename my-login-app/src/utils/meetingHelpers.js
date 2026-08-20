export const normalizeNumericId = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value).trim();
  if (!normalized) {
    return null;
  }

  const directNumber = Number(normalized);
  if (Number.isFinite(directNumber)) {
    return directNumber;
  }

  const digitsOnly = normalized.replace(/\D/g, '');
  if (!digitsOnly) {
    return null;
  }

  const extractedNumber = Number(digitsOnly);
  return Number.isFinite(extractedNumber) ? extractedNumber : null;
};

export const parseMeetingDate = (value) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const getUpcomingMeeting = (meetings) => {
  const now = Date.now();
  const joinWindowMs = 2 * 60 * 60 * 1000;

  return [...meetings]
    .filter((meeting) => meeting.status === 'APPROVED' && parseMeetingDate(meeting.scheduledTime))
    .sort((left, right) => parseMeetingDate(left.scheduledTime) - parseMeetingDate(right.scheduledTime))
    .find((meeting) => {
      const scheduledDate = parseMeetingDate(meeting.scheduledTime);
      return scheduledDate.getTime() >= now - joinWindowMs;
    }) || null;
};

export const isMeetingJoinable = (meeting) => {
  const scheduledDate = parseMeetingDate(meeting?.scheduledTime);
  if (!scheduledDate || !meeting?.meetingLink) {
    return false;
  }

  const now = Date.now();
  const joinWindowMs = 2 * 60 * 60 * 1000;
  return now >= scheduledDate.getTime() && now <= scheduledDate.getTime() + joinWindowMs;
};

export const formatMeetingDate = (value) => {
  const parsed = parseMeetingDate(value);
  if (!parsed) {
    return 'Not scheduled';
  }

  return parsed.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getMeetingCountdown = (meeting) => {
  const scheduledDate = parseMeetingDate(meeting?.scheduledTime);
  if (!scheduledDate) {
    return 'Time not available';
  }

  const diffMs = scheduledDate.getTime() - Date.now();
  if (diffMs <= 0) {
    return 'Meeting is live now';
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `Starts in ${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `Starts in ${hours}h ${minutes}m`;
  }

  return `Starts in ${Math.max(minutes, 0)}m`;
};
