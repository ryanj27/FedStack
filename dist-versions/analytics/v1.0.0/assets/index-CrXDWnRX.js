import './analytics__mf_v__runtimeInit__mf_v__-DbtG7uBC.js';
import { j as jsxRuntimeExports } from './jsx-runtime-Bx4h0SFP.js';
import { a as analytics__loadShare__react__loadShare__ } from './analytics__loadShare__react__loadShare__-DF7DD1yK.js';
import { a as analytics__loadShare__react_mf_2_dom__loadShare__ } from './CssBaseline-CvzCdVqY.js';
import { A as App } from './App-CSLAs_wK.js';
import './_commonjsHelpers-Dj2_voLF.js';
import './emotion-serialize.esm-DpD3M_lx.js';
import './createSvgIcon-Du4kc-bh.js';
import './analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__-oxwLZa1Q.js';
import './emotion-cache.browser.esm-BasAJTkK.js';
import './MetricsSummary-C3ZkKAf2.js';
import './preload-helper-BelkbqnE.js';
import './AnalyticsPage-D6SLVmur.js';

true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

var createRoot;
var m = analytics__loadShare__react_mf_2_dom__loadShare__;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}

const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare__react__loadShare__.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
}
