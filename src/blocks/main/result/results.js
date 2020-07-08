import CheckSearch from "../search/checkSearch";

export default class Results extends CheckSearch {
  constructor(serchButton, buttonShowMore, searchInput) {
    super(searchInput)
    this.searchButton = serchButton;
    this.startPosition = 0;
    this.result = document.querySelector('.result');
    this.resultFound = document.querySelector('.result__found');
    this.cardList = document.querySelector('.result__cards');
    this.buttonShowMore = buttonShowMore;
    this.resultLoading = document.querySelector('.result__loading');
    this.resultError = document.querySelector('.result__api-error');
    this.resultNotFound = document.querySelector('.result__not-found');
  }

  clearingStorage() {
    localStorage.clear();
    while (this.cardList.firstChild) {
      this.cardList.firstChild.remove();
    }
  }

  newsLoading() {
    this.blockStyle(this.result, 'block');
    this.blockStyle(this.resultError, 'none');
    this.blockStyle(this.resultNotFound, 'none');
    this.blockStyle(this.buttonShowMore, 'none');
    this.blockStyle(this.resultFound, 'none')
    this.blockStyle(this.resultLoading, '');
    this.searchInput.setAttribute('disabled', true);
    this.searchButton.setAttribute('disabled', true);
    this.searchButton.setAttribute('style', 'background-color: #B6BCBF');
  }

  newsError() {
    this.blockStyle(this.resultLoading, 'none');
    this.blockStyle(this.resultFound, 'none');
    this.blockStyle(this.buttonShowMore, 'none');
    this.blockStyle(this.resultError, '');
    this.searchInput.removeAttribute('disabled');
    this.searchButton.removeAttribute('disabled');
    this.searchButton.removeAttribute('style');
  }

  newsEmpty() {
    this.blockStyle(this.resultFound, 'none');
    this.blockStyle(this.resultError, 'none');
    this.blockStyle(this.resultLoading, 'none');
    this.blockStyle(this.buttonShowMore, 'none');
    this.blockStyle(this.resultNotFound, '');
    this.searchInput.removeAttribute('disabled');
    this.searchButton.removeAttribute('disabled');
    this.searchButton.removeAttribute('style');
  }

  newsVisible() {
    this.blockStyle(this.resultFound, '');
    this.blockStyle(this.resultError, 'none');
    this.blockStyle(this.resultLoading, 'none');
    this.blockStyle(this.resultNotFound, 'none');
    this.searchInput.removeAttribute('disabled');
    this.searchButton.removeAttribute('disabled');
    this.searchButton.removeAttribute('style');
  }

  blockStyle(block, style) {
    block.style.display = style;
  }

  _createBlocks(cardData, dateCalcMas) {
    let checkUrl = new URL(cardData.url);
    console.log(checkUrl.href)
    checkUrl.href = checkUrl.href.replace(/yandex.ru/, 'yandex.ru/news');
    cardData.title = (cardData.title.length > 50) ? cardData.title.slice(0, 48) + "..." : cardData.title;
    cardData.description = (cardData.description.length > 145) ? cardData.description.slice(0, 142) + "..." : cardData.description;
    const card = `
      <article class="result__card">
        <a href="${checkUrl.href}" target="_blank" class="card__link link"></a>
        <div class="card__image-ratio">
          <img src="${cardData.image}" alt="Изображение не найдено" class="card__image">
        </div>
        <p class="card__time">${dateCalcMas.convertDate(cardData.publishedAt)}</p>
        <h4 class="card__title">${cardData.title}</h4>
        <p class="card__text">${cardData.description}</p>
        <p class="card__caption">${cardData.source.name}</p>
      </article>
    `
    this.cardList.insertAdjacentHTML('beforeend', card);
  }

  _sendData(cardData, dateCalcMas) {
    this._createBlocks(cardData, dateCalcMas);
  }

  _hiddenButton() {
    return this.buttonShowMore.style.display = 'none';
  }

  showMore(storage, dateCalcMas) {
    this.startPosition = this.startPosition + 3;
    for (let i = 0; i < 3; i++) {
      if (i + this.startPosition >= storage.length) {
        this._hiddenButton();
      } else {
        this._sendData(storage[i + this.startPosition], dateCalcMas);
        if (i + 1 + this.startPosition >= storage.length) {
          this._hiddenButton();
        }
      }
    }
  }

  createCardsBlock(storage, dateCalcMas) {
    this.startPosition = 0;
    const lastQuery = JSON.parse(localStorage.getItem('query'));
    if (lastQuery) {
      this.searchInput.value = lastQuery;
    }

    if (storage.length > 3) {
      for (let i = 0; i < 3; i++) {
        this._sendData(storage[i], dateCalcMas);
      }
    } else {
      storage.forEach((item) => {
        this._sendData(item, dateCalcMas);
      });
    }
  }
}
