const sessionStorageKeyName = "blogsState";
export class BlogCardListWithPagination extends HTMLElement {
  constructor() {
    super();
    this.page = 1;
    this.handleBarbaBefore = this.handleBarbaBefore.bind(this); // バインド
  }

  connectedCallback() {
    this.restoreState();
    this.setupIntersectionObserver();
    window.addEventListener("turbo:render", this.handleBarbaBefore)
  }

  disconnectedCallback() {
    window.removeEventListener("turbo:render", this.handleBarbaBefore)
    this.observer.disconnect();
  }
  handleBarbaBefore() {
    const state = {
      page: this.page,
      html: document.querySelector('#blog-list').innerHTML,
      scrollPosition: window.scrollY + 50  // 現在のスクロール位置を保存
    };
    sessionStorage.setItem(sessionStorageKeyName, JSON.stringify(state));
  }
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.page++;
          this.fetchMoreBlogCards();
        }
      });
    }, options);

    
    const target = this.querySelector('.observer-element');
    this.observer.observe(target);
  }

  async fetchMoreBlogCards() {
    try {
      const response = await fetch(`/posts?page=${this.page}`, {
        headers: {
          'Accept': 'text/html',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      const insertEl = this.querySelector('#blog-list');
      insertEl.insertAdjacentHTML('beforeend', data);
    } catch (error) {
      console.error('There was a problem fetching more blog cards:', error);
    }
  }
  restoreState() {
    const savedState = JSON.parse(sessionStorage.getItem('blogsState'));
    if (savedState) {
      this.page = savedState.page;
      document.querySelector('#blog-list').innerHTML = savedState.html;

      // 保存されたスクロール位置を復元
      window.scrollTo(0, savedState.scrollPosition);
      sessionStorage.removeItem(sessionStorageKeyName);
    }
  }
}

