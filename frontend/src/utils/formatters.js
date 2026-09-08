// MedAstra — Utility Formatters

/**
 * Format a date string to 'Jan 15, 2024' format
 * @param {string} dateStr
 * @returns {string}
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a role string to a human-readable label
 * @param {string} role
 * @returns {string}
 */
export const formatRole = (role) => {
  const map = {
    patient: 'Patient',
    doctor: 'Doctor',
    admin: 'Administrator',
  };
  return map[role] || role;
};

/**
 * Truncate a string to n characters, appending '...'
 * @param {string} str
 * @param {number} n
 * @returns {string}
 */
export const truncate = (str, n = 100) => {
  if (!str) return '';
  if (str.length <= n) return str;
  return str.slice(0, n) + '...';
};

/**
 * Get initials from a full name (e.g. 'John Doe' → 'JD')
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
};
