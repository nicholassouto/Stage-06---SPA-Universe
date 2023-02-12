export class Router {
  routes = {};

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
        this.changeBG();
      });
  }

  changeBG() {
    const { pathname } = window.location;
    if (pathname == "/universe") {
      document.body.style.backgroundImage = "url(./assets/universe.jpg)";
      this.navSelection();
    }
    if (pathname == "/exploration") {
      document.body.style.backgroundImage = "url(./assets/exploration.jpg)";
      this.navSelection();
    }
    if (pathname == "/") {
      document.body.style.backgroundImage = "url(./assets/home.jpg)";
      this.navSelection();
    }
  }

  navSelection() {
    const { pathname } = window.location;
    if (pathname == "/universe") {
      document.getElementById("universe").style.fontWeight = "700";
      document.getElementById("home").style.fontWeight = "400";
      document.getElementById("exploration").style.fontWeight = "400";
    }
    if (pathname == "/exploration") {
      document.getElementById("universe").style.fontWeight = "400";
      document.getElementById("home").style.fontWeight = "400";
      document.getElementById("exploration").style.fontWeight = "700";
    }
    if (pathname == "/") {
      document.getElementById("universe").style.fontWeight = "400";
      document.getElementById("home").style.fontWeight = "700";
      document.getElementById("exploration").style.fontWeight = "400";
    }
  }
}
