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
          .header-container header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .logo img {
            height: 55x;
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
  
          /* 📌 Sticky Mobile Header */
          @media (max-width: 768px) {
            .header-container header {
              position: sticky;
              top: 0;
              z-index: 1000;
              background: white;
              padding: 16px 15px;
            }
            .header-container header .logo,
            .header-container header .logo img {
              height: 38px;
            }
            .nav-links {
              display: none; /* Hide desktop menu */
            }
            .menu-drawer__nav-links {
              display: block;
            }
            #menu-drawer {
              display: flex;
              position: absolute;
              transform: translate(0);
              visibility: visible;
              z-index: 6;
              left: 0px;
              top: 100%;
              width: 100%;
              padding: 0px;
              background-color: #fff;
              height: 100vh;
            }
            #menu-drawer .menu-drawer__inner-container {
              position: relative;
              height: 100%;
              width: 100%;
            }
            #menu-drawer .menu-drawer__inner-navigation {
              display: grid;
              grid-template-rows: 1fr auto;
              align-content: space-between;
              overflow-y: auto;
              height: 100%;
              padding: 3rem 0;
            }
            #menu-drawer .nav-links.menu-drawer__nav-links a {
              display: flex;
              align-items: center;
              margin-bottom: .2rem;
              font-size: 40px;
              justify-content: center;
            }
            details:not([open]) > .header__icon .icon-close,
            details[open] > .header__icon .icon-hamburger {
              visibility: hidden;
              opacity: 0;
              transform: scale(0.8);
              width: 0;
            }
            details[open]:not > .header__icon .icon-close {
              visibility: hidden;
            }
            details[open]:not > .header__icon .icon-hamburger {
              visibility: visible;
              opacity: 1;
              transform: scale(1.07);
            }
            details > summary {
              list-style: none;
            }
            details > summary::-webkit-details-marker {
              display: none;
            }
          }
  
          @media (min-width: 769px) {
            header-drawer {
              display: none; /* Hide mobile menu button on desktop */
            }
          }
  
        </style>
  
        <sticky-header class="header-container sticky">
          <header class="header page-width header--has-menu">
  
            <!-- Logo -->
            <div class="logo">
              <a href="/"><img id="logo-img" src="" alt="Logo"></a>
            </div>
  
            <!-- Desktop Menu -->
            <nav class="nav-links"></nav>
  
            <!-- Mobile Menu (Header Drawer) -->
            <header-drawer class="menu-drawer">
              <details>
                <summary class="header__icon" aria-label="Close menu" aria-expanded="">
                  <svg width="25" height="9" viewBox="0 0 25 9" fill="none" class="icon icon-hamburger" xmlns="http://www.w3.org/2000/svg">
                    <rect width="25" height="2" fill="#0B0D21"/>
                    <rect y="7" width="25" height="2" fill="#0B0D21"/>
                  </svg>
                  <svg width="19" height="25" viewBox="0 -3 19 19" fill="none" class="icon icon-close"  xmlns="http://www.w3.org/2000/svg">
                    <rect width="24.8796" height="1.99037" transform="matrix(0.707105 -0.707108 0.707105 0.707108 0 17.5925)" fill="white"/>
                    <rect width="24.8796" height="1.99037" transform="matrix(-0.707105 -0.707108 -0.707105 0.707108 19 17.5925)" fill="white"/>
                  </svg>
                </summary>
              </details>
              <div id="menu-drawer" class="mobile-menu" style="display:none;">
                <div class="menu-drawer__inner-container">
                  <div class="menu-drawer__inner-navigation">
                    <nav class="nav-links menu-drawer__nav-links"></nav>
                  </div>
                </div>
              </div>
            </header-drawer>
  
          </header>
        </sticky-header>
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
        const mobileMenu = this.shadowRoot.querySelector("#menu-drawer .menu-drawer__inner-container .menu-drawer__inner-navigation .menu-drawer__nav-links");
  
        // Add desktop links
        menu.forEach(item => {
          const link = document.createElement("a");
          link.href = item.url;
          link.textContent = item.title;
          navContainer.appendChild(link);
          link.classList.add('header__menu-item', 'list-menu__item', 'link', 'link--text');
  
          // Add mobile links inside header-drawer
          if (mobileMenu) {
            const mobileLink = document.createElement("a");
            mobileLink.href = item.url;
            mobileLink.textContent = item.title;
            mobileMenu.appendChild(mobileLink);
            mobileLink.classList.add('menu-drawer__menu-item', 'list-menu__item', 'link', 'link--text');
          }
        });
      }
  
      // Mobile menu toggle
      const menuButton = this.shadowRoot.querySelector("header-drawer details .header__icon");
      const mobileMenu = this.shadowRoot.querySelector("header-drawer .mobile-menu");
      const headerMenu = this.shadowRoot.querySelector("sticky-header header");
      
  
      menuButton.addEventListener("click", () => {
        mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
          if (menuButton.getAttribute('aria-expanded') === 'true') {
            headerMenu.style.backgroundColor = '#000';
            this.shadowRoot.getElementById("logo-img").src = "https://cdn.shopify.com/s/files/1/0671/0041/0009/files/logo-mobile.svg?v=1741944507";
          }
          if (menuButton.getAttribute('aria-expanded') === 'false') {
            headerMenu.style.backgroundColor = '#fff';
            this.shadowRoot.getElementById("logo-img").src = "https://cdn.shopify.com/s/files/1/0671/0041/0009/files/logo.svg?v=1741944507";
          }
      });


//menuButton.onclick = function toggleNav() {
//  mobileMenu.classList.toggle('expanded');

    const anchorLinks = this.shadowRoot.querySelectorAll(".menu-drawer__menu-item"); console.log(anchorLinks);
    anchorLinks.forEach((anchorLink) => { 
    anchorLink.addEventListener("click", () => { console.log('clicked');
    menuButton.click();
      //  mobileMenu.toggle();
      console.log('triggerred');
    })
    });
  
//}
      
      
    }
  }
  
  // Register custom header element
  customElements.define("site-header", SiteHeader);
