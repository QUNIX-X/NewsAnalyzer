import CheckSearch from "../blocks/main/search/checkSearch";

export default class Validate extends CheckSearch {
  constructor(container,searchButton, searchInput) {
    super(searchInput)
    this.container = container;
    this.searchButton = searchButton;
    this.inputValidate = this.inputValidate.bind(this);
    this.validate = this.validate.bind(this);
    this.searchInput.addEventListener('click', this.inputValidate);
    this.searchInput.addEventListener('input', this.inputValidate);

    this.diactivatedButton = this.diactivatedButton.bind(this);
    this.activatedButton = this.activatedButton.bind(this);
  }

  inputValidate(clickOnInput) {
    this.validate(clickOnInput.target);
  }

  validate(element) {
    const errorElement = this.container.querySelector('.search__error');
    if (element.validity.tooShort) {
      errorElement.textContent = 'Должно быть от 3 до 30 символов';
      errorElement.style.display = 'block';
      this.diactivatedButton();
    } else if (element.validity.valueMissing) {
      this.diactivatedButton();
    } else {
      errorElement.textContent = '';
      errorElement.style.display = '';
      this.activatedButton();
    }
  }

  diactivatedButton () {
    this.searchButton.setAttribute('disabled', true);
    this.searchButton.style.backgroundColor = '#B6BCBF';
  }

  activatedButton () {
    this.searchButton.removeAttribute('disabled');
    this.searchButton.style.backgroundColor = '';
  }
}
