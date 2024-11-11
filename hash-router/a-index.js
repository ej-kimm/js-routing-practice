import createRouter from "./a-router.js";

const container = document.querySelector("main")
const pages = {
  home: () => container.innerText = "MyHome Page",
  eunji: () => container.innerHTML = "Eunji Page"
}

const router = createRouter();
router.addRoute("#/", pages.home)
  .addRoute("#/eunji", pages.eunji)
  .start();