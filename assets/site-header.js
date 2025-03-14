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
          gap: 20px;
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
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }
        .hamburger div {
          width: 25px;
          height: 3px;
          background: var(--menu-text, #0B0D21);
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
          background: white;
          padding: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .mobile-menu a {
          padding: 10px;
          display: block;
          text-align: center;
          color: var(--menu-text, #0B0D21);
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }
      </style>

      <header>
        <div class="header-container">
          <div class="logo">
            <a href="/"><img id="logo-img" src="" alt="Logo"></a>
          </div>
          <nav class="nav-links"></nav>
          <div class="hamburger" id="hamburger">
            <div></div><div></div><div></div>
          </div>
        </div>
        <div class="mobile-menu" id="mobile-menu"></div>
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

    // Mobile menu toggle
    this.shadowRoot.getElementById("hamburger").addEventListener("click", () => {
      const mobileMenu = this.shadowRoot.getElementById("mobile-menu");
      mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
    });
  }
}

// Register custom header element
customElements.define("site-header", SiteHeader);