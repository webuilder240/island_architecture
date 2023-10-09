export class BlogCard extends HTMLElement {
  connectedCallback() {
    const postId = this.getAttribute('data-post-id');

    fetch(`/posts/${postId}/card`)
      .then(response => response.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}

