import './about.css';
import '../blocks/about/github/__swiper/swiper.min.js';
import '../blocks/about/github/__swiper/swiper.js';

import DateCalc from '../modules/date';
import GitHubApi from '../modules/api/GitHubApi';
import Commit from '../blocks/about/github/__swiper/__wrapper/__slide/commit';
import CommitList from '../blocks/about/github/__swiper/__wrapper/commitList'

const GIT_HUB_API = new GitHubApi ({
  url: 'https://api.github.com/repos/QUNIX-X/NewsAnalyzer'
})

const DATE_CALC = () => new DateCalc;
const COMMIT = new Commit;
const COMMIT_LIST = new CommitList(document.querySelector('.swiper-wrapper'), COMMIT, GIT_HUB_API, DATE_CALC());

COMMIT_LIST.render('/commits');
