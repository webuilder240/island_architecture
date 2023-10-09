// import ReactiveInput from '../WebComponents/ReactiveInput';
// import { ValidatedFormContainer } from '../WebComponents/Forms/base';
import { BlogCard } from '../WebComponents/BlogCard';
import barba from '@barba/core';
document.addEventListener('DOMContentLoaded', () => {
  require("../WebComponents/Forms/base")
  barba.init({})

  // サイドメニューの表示・非表示を切り替えるためのJavaScript
  document.getElementById('menuToggle').addEventListener('click', function () {
    const menu = document.getElementById('sideMenu');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
  });

  customElements.define('blog-card', BlogCard);
});
