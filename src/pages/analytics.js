import './analytics.css';
import DateCalc from '../modules/date';
import Storage from '../modules/storage';
import AnalyticsData from '../blocks/analytics/report/analyticsData';
import Histogram from '../blocks/analytics/report/__chart/Histogram';

const dateCalc = () => new DateCalc;
const storage = new Storage;

const analyticsData = new AnalyticsData(storage.load());
const histogram = new Histogram(dateCalc(), storage.load());

analyticsData.loadingData();
histogram.loadingHistogram();
