import createRouter from "./button-router.js";

const container = document.querySelector("main");
const pages = {
  home: () => (container.innerText = "MyHome Page"),
  eunji: () => (container.innerHTML = "Eunji Page"),
  board: (params) => (container.innerHTML = `Age: ${params.age}, Address: ${params.address}`)
};

window.addEventListener("click", (event) => {
  if (event.target.matches("[data-navigate]")) {
    router.navigate(event.target.dataset.navigate);
  }
});

const router = createRouter();
router
  .addRoute("/", pages.home)
  .addRoute("/eunji", pages.eunji)
  .addRoute("/eunji/:age/:address", pages.board)
  .start();
