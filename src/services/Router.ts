type PageRoute = `#/${string}`;
type PageName = `p-${string}`;

class Router extends HTMLElement {
  ROUTES: Record<PageRoute, PageName> = {
    '#/': 'p-index',
    '#/country': 'p-country-details',
  };

  connectedCallback() {
    const pageRoute = this.getPageRoute();
    this.render(this.ROUTES[pageRoute] || 'p-index');
    self.addEventListener('hashchange', this.hashchangeListener);
  }

  // Listeners
  hashchangeListener = () => {
    const pageRoute = this.getPageRoute();
    const pageName = this.ROUTES[pageRoute];

    if (!pageName) {
      location.hash = `#/`;
      return;
    }

    this.render(pageName);
  };

  // Renderers
  render(name: string = 'p-error') {
    const component = document.createElement(name);
    this.innerHTML = '';
    this.append(component);
  }

  // Helpers
  getPageRoute = () => {
    const { hash } = location;
    return hash.split('?')[0];
  };
}

customElements.define('s-router', Router);
