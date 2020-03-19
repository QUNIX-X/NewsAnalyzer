export default class Storage{

  save(newsArray) {
    localStorage.setItem('answer', JSON.stringify(newsArray));
  }

  load() {
    return JSON.parse(localStorage.getItem('answer'));
  }

  textQuery(textSearch) {
    localStorage.setItem('query', JSON.stringify(textSearch));
  }

  checkLocalstorage() {
    for (let key in localStorage) {
      if (key.includes('answer')) {
        return true;
      }
    }
  }
}
