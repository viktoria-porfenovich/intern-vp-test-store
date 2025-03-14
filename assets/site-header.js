// Create custom site header

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    
    // Attach shadow DOM to encapsulate styles
    this.attachShadow({ mode: "open" });

    // Create the header template
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--header-bg, #333);
          color: var(--header-text, black);
          text-align: center;
          padding: 20px;
          font-size: 1.5rem;
          font-weight: bold;
        }
      </style>
      <site-header>
        <slot></slot> <!-- Allows inserting content inside -->
      </site-header>
    `;
  }
}

// Register the custom element
customElements.define("site-header", SiteHeader);
