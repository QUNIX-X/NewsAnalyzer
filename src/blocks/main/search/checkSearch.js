export default class CheckSearch{
  constructor() {
    //this.searchInput = searchInput;
    this.searchInput = document.querySelector('.search__input');
    this.regXSS = ['<', '>', '(', ')', ';', '=', '/', '.'];
    this.regSpacing = /\s+/g;
  }

  validation() {
    if ((this.searchInput.checkValidity()) && (this.searchInput.value.trim() !== '')) {
      if (this._checkXSS() !== '') {
        return this._checkXSS();
      } else {
        this._updateInput('Нужно ввести ключевое слово');
      }
    }
  }
  _checkXSS() {
    const checkInput = this.searchInput.value.trim().split('');
    checkInput.forEach((item, index) => {
      if (this.regXSS.includes(item)) {
        checkInput[index] = ' ';
      }
    });
    return checkInput.join('').replace(this.regSpacing, ' ').trim();
  }

  _updateInput(str) {
    this.searchInput.value = '';
    this.searchInput.setAttribute('placeholder', str);
    this.searchInput.classList.add('placeholder-style');
  }
}
