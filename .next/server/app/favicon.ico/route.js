"use strict";
(() => {
var exports = {};
exports.id = 155;
exports.ids = [155];
exports.modules = {

/***/ 4021:
/***/ ((module) => {

module.exports = import("next/dist/compiled/@vercel/og/index.node.js");;

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 282:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&isDynamic=0!./app/favicon.ico?__next_metadata_route__
var favicon_next_metadata_route_namespaceObject = {};
__webpack_require__.r(favicon_next_metadata_route_namespaceObject);
__webpack_require__.d(favicon_next_metadata_route_namespaceObject, {
  GET: () => (GET),
  dynamic: () => (dynamic)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./node_modules/next/server.js
var server = __webpack_require__(514);
;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&isDynamic=0!./app/favicon.ico?__next_metadata_route__


const contentType = "image/x-icon"
const buffer = Buffer.from("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", 'base64'
  )

function GET() {
  return new server.NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': "public, max-age=0, must-revalidate",
    },
  })
}

const dynamic = 'force-static'

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Ffavicon.ico%2Froute&name=app%2Ffavicon.ico%2Froute&pagePath=private-next-app-dir%2Ffavicon.ico&appDir=%2FUsers%2Fanti-aguilar%2Fdev_code%2Fportfolio1%2Fapp&appPaths=%2Ffavicon.ico&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/favicon.ico/route",
        pathname: "/favicon.ico",
        filename: "favicon",
        bundlePath: "app/favicon.ico/route"
    },
    resolvedPagePath: "next-metadata-route-loader?page=%2Ffavicon.ico%2Froute&isDynamic=0!/Users/anti-aguilar/dev_code/portfolio1/app/favicon.ico?__next_metadata_route__",
    nextConfigOutput,
    userland: favicon_next_metadata_route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/favicon.ico/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,218], () => (__webpack_exec__(282)));
module.exports = __webpack_exports__;

})();