export default class CommitList {
  constructor(container, commitTemplate, gitHubApi, dateCalc) {
    this.container = container;
    this.commitTemplate = commitTemplate;
    this.gitHubApi = gitHubApi;
    this.dateCalc = dateCalc;
    this.gitHubLoading = document.querySelector('.github__loading');
    this.apiError = document.querySelector('.github__api-error');
    this.swiperContainer = document.querySelector('.swiper-container');
  }

  renderLoading(isLoading) {
    if (!isLoading) {
      this.gitHubLoading.style.display = 'none';
      this.swiperContainer.style.display = 'block';
    }
  }

  addCommit(name, email, date, message, avatar_url) {
    const newDate = this.dateCalc.convertDate(date);
    const commit = this.commitTemplate.create(name, email, newDate, message, avatar_url);
    this.container.insertAdjacentHTML('beforeend', commit);
  }

  render(path) {
    this.gitHubApi.getCommits(path)
      .then(commits => {
        for (let i = 0; i < commits.length; i++) {
          const commit = commits[i];
          if (commit === 0) {
            console.log('Коммиты не найдены')
          }
          this.addCommit(commit.commit.committer.email, commit.commit.committer.name, commit.commit.committer.date, commit.commit.message, commit.author.avatar_url);
          if (commit <= 20) {
            break;
          }
        }
      })
      .finally(() => {
        this.renderLoading(false);
      })
      .catch(() => {
        console.log('Ошибка: Не удалось получить ответ от API')
        this.apiError.style.display = '';
        this.swiperContainer.style.display = 'none';
      });
  }
}
