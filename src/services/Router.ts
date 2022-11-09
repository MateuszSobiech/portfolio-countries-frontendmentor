class Router extends HTMLElement {
  routes: any;
  hashchangeListener: () => void;

  constructor() {
    super();

    this.routes = {
      '#/': 'p-index',
      '#/country': 'p-country',
    };

    this.hashchangeListener = () => {
      const { hash } = location;
      this.render(this.routes[hash]);
    };
  }

  connectedCallback() {
    location.hash = '#/';

    self.addEventListener('hashchange', this.hashchangeListener);
  }

  render(name: string = 'p-error') {
    const component = document.createElement(name);
    this.innerHTML = '';
    this.append(component);
  }
}

window.customElements.define('s-router', Router);
