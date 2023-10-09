import { BlogCard } from '../WebComponents/BlogCard';
import { BlogCardListWithPagination } from '../WebComponents/BlogCardListWthPagenation';
import barba from '@barba/core';
document.addEventListener('DOMContentLoaded', () => {
  require("../WebComponents/Forms/base")
  barba.init({})

  barba.hooks.before((data) => {
    const customEvent = new CustomEvent('barbaBefore', { detail: data });
    window.dispatchEvent(customEvent);
  });

  barba.hooks.enter((data) => {
    const customEvent = new CustomEvent('barbaEnter', { detail: data });
    window.dispatchEvent(customEvent);
  });

  // サイドメニューの表示・非表示を切り替えるためのJavaScript
  document.getElementById('menuToggle').addEventListener('click', function () {
    const menu = document.getElementById('sideMenu');
    const main = document.querySelector('main');

    if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.display = 'block';
      main.style.marginLeft = '250px';
    } else {
      menu.style.display = 'none';
      main.style.marginLeft = '0';
    }
  });

  customElements.define('blog-card-list-with-pagination', BlogCardListWithPagination);
  customElements.define('blog-card', BlogCard);
});
