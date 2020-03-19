import {TEXT_QUERY_REG} from '../../../../modules/queryReg';

export default class Histogram {
  constructor(DATE_CALC, STORAGE) {
    this.dateCalc = DATE_CALC;
    this.storage = STORAGE;
    this.dataCaption = document.querySelector('.chart__data');
    this.daysWeek = document.querySelectorAll('.days__item');
    this.daysWeekGraph = document.querySelectorAll('.item__number');
    this.lineGraph = document.querySelectorAll('.bars__item');
    this.daysWeekArray = Array.from(this.daysWeek);
    this.daysWeekGraphArray = Array.from(this.daysWeekGraph);
    this.lineGraphArray = Array.from(this.lineGraph);
    this.dateForApi = this.dateCalc.getDateForApi();
    this.daysObject = this.dateCalc.getDayWeekData();
  }
  loadingHistogram() {
    this._diagramDataCaption();
    this._diagramMake();
  }

  _diagramDataCaption() {
    const nowMonth = this.dateCalc.captionAnalyticsData(this.dateForApi.nowDate);
    const weekAgoMonth = this.dateCalc.captionAnalyticsData(this.dateForApi.weekAgoDate);

    const reg = new RegExp(weekAgoMonth, 'gi');
    const matches = reg.test(nowMonth);

    if (matches) {
      this.dataCaption.textContent = `Дата (${nowMonth})`;
    } else {
      this.dataCaption.textContent = `Дата (${weekAgoMonth} - ${nowMonth})`;
    }
  }

  _diagramMake() {
    this.daysWeekArray.forEach((item, index) => {
      item.textContent = this.daysObject[`day${index}`];
    });

    this.daysWeekGraphArray.forEach((item, index) => {
      const count = this._queryObject()[`day${index}`];
      if (count === 0) {
          item.style.color = '#1A1B22';
      }
      if (count > 0) {
        this.lineGraphArray[index].style.minWidth = `12px`;
      }
      item.textContent = count;
      this.lineGraphArray[index].style.width = `${count}%`;
    });
  }

  _queryObject() {
    let matchQueryItem, match;
    let reg;
    const result = {};
    let count;
    const maxWeek = 7;

    for (let i = 0; i < maxWeek; i++) {
        reg = new RegExp(this.daysObject[`day${i}`], 'gi');
        count = 0;
        this.storage.forEach((item) => {
            const date = new Date(item.publishedAt);
            const utcDateFix = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            const day = this.dateCalc.dayWeekData(utcDateFix);
            match = reg.test(day);
            reg.lastIndex = 0;
            if (match) {
                matchQueryItem = TEXT_QUERY_REG.test(item.title);

                TEXT_QUERY_REG.lastIndex = 0;

                if (matchQueryItem) {
                    count++;
                }
            }
        });
      result[`day${i}`] = count;
    }
    return result;
  }
}
