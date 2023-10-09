export class BlogCardListWithPagination extends HTMLElement {
  constructor() {
    super();
    this.page = 1;
  }

  connectedCallback() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '200px',
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
}

