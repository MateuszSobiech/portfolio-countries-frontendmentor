class Filters extends HTMLElement {
  debounce: number;

  get input() {
    return this.querySelector<HTMLInputElement>('.c-filters__input');
  }

  get select() {
    return this.querySelector<HTMLSelectElement>('.c-filters__select');
  }

  connectedCallback() {
    this.render();

    this.input.addEventListener('input', this.emitFiltersChange);
    this.select.addEventListener('change', this.emitFiltersChange);
  }

  // Emiters
  emitFiltersChange = () => {
    const emit = () => {
      const filtersState: IFiltersValues = {
        input: this.input.value,
        select: this.select.value,
      };

      this.dispatchEvent(
        new CustomEvent('filtersChange', {
          bubbles: true,
          detail: filtersState,
        })
      );
    };

    clearTimeout(this.debounce);
    this.debounce = setTimeout(emit, 200);
  };

  // Renderers
  render() {
    this.innerHTML = `
      <section class="c-filters">
        <div style="position: relative">
          <input class="c-filters__input" placeholder="Search for a country..." />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <select class="c-filters__select">
          <option value="all">All</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </section>
      `;
  }
}

customElements.define('c-filters', Filters);
