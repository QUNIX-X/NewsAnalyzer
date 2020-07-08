import './about.css';
import '../blocks/about/github/__swiper/swiper.min.js';
import '../blocks/about/github/__swiper/swiper.js';

import DateCalc from '../modules/date';
import GitHubApi from '../modules/api/GitHubApi';
import Commit from '../blocks/about/github/__swiper/__wrapper/__slide/commit';
import CommitList from '../blocks/about/github/__swiper/__wrapper/commitList'

const gitHubApi = new GitHubApi({
  url: 'https://api.github.com/repos/QUNIX-X/NewsAnalyzer'
})

const dateCalc = () => new DateCalc;
const commit = new Commit;
const commitList = new CommitList(document.querySelector('.swiper-wrapper'), commit, gitHubApi, dateCalc());

commitList.render('/commits');
