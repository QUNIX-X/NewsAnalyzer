import {
  todayDate,
  weekEarlierDate,
  monthsForConvertDate,
  monthsForCaptionAnalyticsDate,
  days}
from './formatDate';

export default class DateCalc {

  getDateForApi() {
      return {
          nowDate: `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`,
          weekAgoDate: `${weekEarlierDate.getFullYear()}-${weekEarlierDate.getMonth() + 1}-${weekEarlierDate.getDate()}`
      }
  }

  convertDate(date) {
      const newDate = new Date(date);
      const myDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
      const fullDate = myDate.getDate() + ' ' + monthsForConvertDate[myDate.getMonth()] + ', ' + myDate.getFullYear();
      return fullDate;
  }

  captionAnalyticsData(date) {
      const newDate = new Date(date);
      const myDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000);
      const comparsionMonth = monthsForCaptionAnalyticsDate[myDate.getMonth()];
      return comparsionMonth;
  }

  dayWeekData(data) {
      return data.getDate() + ', ' + days[data.getDay()];
  }

  // получаем объект с датами недели, для отображения в гистограмме
  getDayWeekData() {
      const weekAgoDate = weekEarlierDate;
      const result = {};
      let day;
      for (let i = 0; i < 7; i++) {
          weekAgoDate.setDate(weekAgoDate.getDate() + i);
          day = this.dayWeekData(weekAgoDate);
          weekAgoDate.setDate(weekAgoDate.getDate() - i);
          result[`day${i}`] = day;
      }
      return result;
  }
}
