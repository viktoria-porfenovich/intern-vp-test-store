class SiteHeader extends HTMLElement {
  constructor() {
    super();
    
    // Attach shadow DOM for styling
    this.attachShadow({ mode: "open" });

    // Create HTML structure
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background: var(--header-bg, #fff);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .logo img {
          max-height: 55px;
        }
        .nav-links {
          display: flex;
          gap: 60px;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--menu-text, #0B0D21);
          font-family: 'Sofia Pro', sans-serif;
          font-weight: 400;
          font-size: 18px;
        }
        .nav-links a:hover {
          text-decoration: none;
          color: var(--menu-text, #EBC217);
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      </style>

      <header>
        <div class="header-container">
          <button is="header-drawer-button" aria-label="Open menu" class="header__icon header-drawer-toggle">
            <svg viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1h18M1 7h18M1 13h18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>

          <div class="logo">
            <a href="/"><img id="logo-img" src="" alt="Logo"></a>
          </div>

          <nav class="nav-links"></nav>

          <header-drawer class="menu-drawer">
            <details>
              <summary class="header__icon" aria-label="Close menu">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1l18 18M19 1L1 19" stroke="currentColor" stroke-width="2"/>
                </svg>
              </summary>
              <div class="mobile-menu"></div>
            </details>
          </header-drawer>
        </div>
      </header>
    `;
  }

  connectedCallback() {
    // Set logo from attribute
    const logoUrl = this.getAttribute("logo");
    if (logoUrl) {
      this.shadowRoot.getElementById("logo-img").src = logoUrl;
    }

    // Get menu JSON from attribute
    const menuJson = this.getAttribute("menu");
    if (menuJson) {
      const menu = JSON.parse(menuJson);
      const navContainer = this.shadowRoot.querySelector(".nav-links");
      const mobileMenu = this.shadowRoot.getElementById("mobile-menu");

      menu.forEach(item => {
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = item.title;
        navContainer.appendChild(link);

        const mobileLink = link.cloneNode(true);
        mobileMenu.appendChild(mobileLink);
      });
    }
  }
  
}

// Register custom header element
customElements.define("site-header", SiteHeader);