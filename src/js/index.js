import '../pages/index.css';
import './ellipsis';

let showMoreButton = document.getElementById('showMore'),
    resultCards = document.querySelector('.result__cards'),
    hiddenCards = document.querySelector('.more__cards');


showMoreButton.onclick = function() {
  while (hiddenCards.lastChild) {
    resultCards.insertBefore(hiddenCards.lastChild, resultCards.lastChild);
  }
}
