export default class Commit {
  create(email, name, convertDate, message, avatar_url) {
    return `
      <article class="swiper-slide">
        <p class="slide__time">${convertDate}</p>
        <div class="slide__two-rows">
          <img src="${avatar_url}" alt=":D" class="slide__image">
          <div class="slide__row">
            <h3 class="slide__name">${name}</h3>
            <p class="slide__email">${email}</p>
          </div>
        </div>
        <p class="slide__text">${message}</p>
      </article>
    `
  }
}
