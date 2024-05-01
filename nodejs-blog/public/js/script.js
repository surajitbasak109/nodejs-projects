document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".search-btn");
  const searchBar = document.querySelector(".search-bar");
  const searchInput = document.getElementById("search-input");
  const searchClose = document.getElementById("search-close");

  if (searchBtn && searchClose) {
    searchBtn.addEventListener("click", (evt) => {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      evt.target.setAttribute("aria-expanded", true);
      searchInput.focus();
    });

    searchClose.addEventListener("click", (evt) => {
      searchBar.style.visibility = "hidden";
      searchBar.classList.remove("open");
      evt.target.setAttribute("aria-expanded", false);
    });
  }

  /**
   * Login form
   */
  const loginPage = {
    loginSection: document.querySelector(".login-section"),
    registerSection: document.querySelector(".register-section"),
    loginSectionBtn: document.querySelector(".login-section-btn"),
    registerSectionBtn: document.querySelector(".register-section-btn"),
  };

  if (loginPage.registerSectionBtn && loginPage.loginSectionBtn) {
    loginPage.registerSectionBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      loginPage.registerSection.classList.remove("hidden");
      loginPage.loginSection.classList.add("hidden");
    });

    loginPage.loginSectionBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      loginPage.registerSection.classList.add("hidden");
      loginPage.loginSection.classList.remove("hidden");
    });
  }
});
