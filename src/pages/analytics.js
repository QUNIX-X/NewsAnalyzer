import './analytics.css';
import DateCalc from '../modules/date';
import Storage from '../modules/storage';
import AnalyticsData from '../blocks/analytics/report/analyticsData';
import Histogram from '../blocks/analytics/report/__chart/Histogram';

const DATE_CALC = () => new DateCalc;
const STORAGE = new Storage;

const ANALYTICSDATA = new AnalyticsData(STORAGE.load());
const HISTOGRAM = new Histogram(DATE_CALC(), STORAGE.load());

ANALYTICSDATA.loadingData();
HISTOGRAM.loadingHistogram();
