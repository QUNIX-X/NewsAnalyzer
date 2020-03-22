const today = new Date();

export const todayDate = new Date(today.getTime() + today.getTimezoneOffset() * 60000);

export const weekEarlierDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

weekEarlierDate.setDate(weekEarlierDate.getDate() - 6);

export const monthsForConvertDate = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
export const monthsForCaptionAnalyticsDate = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
export const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
