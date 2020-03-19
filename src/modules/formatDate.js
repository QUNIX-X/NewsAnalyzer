const NOW = new Date();

export const NOW_DATE = new Date(NOW.getTime() + NOW.getTimezoneOffset() * 60000);

export const WEEK_AGO_DATE = new Date(NOW_DATE.getFullYear(), NOW_DATE.getMonth(), NOW_DATE.getDate());

WEEK_AGO_DATE.setDate(WEEK_AGO_DATE.getDate() - 6);

export const MONTHS_FOR_CONVERT_DATE = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
export const MONTHS_FOR_CAPTION_ANALYTICS_DATA = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
export const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
