import prettyMilliseconds from 'pretty-ms';

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const formatDate = (date) => {
  const locale = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;

  const format = {
    day: `numeric`,
    month: `short`,
    hour: `numeric`,
    minute: `numeric`
  };

  return new Date(date).toLocaleDateString(locale, format);
};

export const formatDuration = (duration) => prettyMilliseconds(duration);
