class Router extends HTMLElement {
  routes: any;
  hashchangeListener: () => void;

  constructor() {
    super();

    this.routes = {
      '#/': 'p-index',
      '#/country': 'p-country-details',
    };

    this.hashchangeListener = () => {
      const { hash } = location;
      this.render(this.routes[hash]);
    };
  }

  connectedCallback() {
    const { hash } = location;
    this.render(this.routes[hash] || 'p-index');
    self.addEventListener('hashchange', this.hashchangeListener);
  }

  render(name: string = 'p-error') {
    const component = document.createElement(name);
    this.innerHTML = '';
    this.append(component);
  }
}

window.customElements.define('s-router', Router);
