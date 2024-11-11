export default function createRouter() {
  const routes = [];
  
  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
  const URL_REGEXP = '([^\\/]+)';

  const router = {
    addRoute(fragment, component) {
      const params = [];
      const parsedFragment = fragment.replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName); // 예: ["age", "address"]
        return URL_REGEXP;
      }).replace(/\//g, "\\/");

      routes.push({
        fragmentRegExp: new RegExp(`^${parsedFragment}$`),
        component,
        params,
      });

      return this;
    },
    start() {
      const getUrlParams = (route, hash) => {
        const params = {};
        const matches = hash.match(route.fragmentRegExp);

        if (matches) {
          matches.shift(); // 첫 번째 값 제거 (전체 URL 매치)
          matches.forEach((paramValue, index) => {
            const paramName = route.params[index];
            params[paramName] = paramValue;
          });
        }

        return params;
      };

      const checkRoutes = () => {
        const hash = window.location.hash.slice(1); // 현재 해시에서 '#' 제거

        const currentRoute = routes.find(route =>
          route.fragmentRegExp.test(hash)
        );

        if (currentRoute) {
          if (currentRoute.params.length) {
            const urlParams = getUrlParams(currentRoute, hash);
            currentRoute.component(urlParams);
          } else {
            currentRoute.component();
          }
        } else {
          console.warn(`No route found for ${hash}`);
        }
      };

      window.addEventListener('hashchange', checkRoutes);
      checkRoutes();
    },
    navigate(fragment) {
      window.location.hash = `#${fragment}`;
    },
  };

  return router;
}
