import prettyMilliseconds from 'pretty-ms';

export const extend = (a: any, b: any) => {
  return Object.assign({}, a, b);
};

export const formatDate = (date: Date) => {
  const locale = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;

  const format = {
    day: `numeric`,
    month: `short`,
    hour: `numeric`,
    minute: `numeric`
  };

  return new Date(date).toLocaleDateString(locale, format);
};

export const formatDuration = (duration: number) => prettyMilliseconds(duration);
