export default class CommitList {
  constructor(container, COMMIT_TEMPLATE, GIT_HUB_API, DATE_CALC) {
    this.container = container;
    this.commitTemplate = COMMIT_TEMPLATE;
    this.gitHubApi = GIT_HUB_API;
    this.dateCalc = DATE_CALC;
  }

  addCommit(name, email, date, message, avatar_url) {
    const newDate = this.dateCalc.convertDate(date);
    const commit = this.commitTemplate.create(name, email, newDate, message, avatar_url);
    this.container.insertAdjacentHTML('beforeend', commit);
  }

  render(path) {
    this.gitHubApi.getCommits(path).then(commits => {
      for (let i = 0; i < commits.length; i++) {
        let commit = commits[i];
        if (commits[i] === 0) {
          console.log('Коммиты не найдены')
        }
        this.addCommit(commit.commit.committer.email, commit.commit.committer.name, commit.commit.committer.date, commit.commit.message, commit.author.avatar_url);//);
        if (commits[i] <= 20) {
          break;
        }
      }
    })
  }
}
