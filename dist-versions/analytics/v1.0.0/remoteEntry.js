const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-VBwl8x_k.js","assets/_commonjsHelpers-Dj2_voLF.js","assets/index-a3H_CsAJ.js","assets/analytics__loadShare__react__loadShare__-DF7DD1yK.js","assets/analytics__mf_v__runtimeInit__mf_v__-DbtG7uBC.js","assets/jsx-runtime-Bx4h0SFP.js","assets/index-CSNU9wvR.js","assets/createSvgIcon-Du4kc-bh.js","assets/emotion-serialize.esm-DpD3M_lx.js","assets/analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__-oxwLZa1Q.js","assets/emotion-cache.browser.esm-BasAJTkK.js","assets/CssBaseline-CvzCdVqY.js","assets/index-SMWQwpBC.js","assets/emotion-styled.browser.esm-BNWbe3UA.js","assets/emotion-utils.browser.esm-W1JC3mQq.js","assets/emotion-react.browser.esm-M-NLDpP1.js"])))=>i.map(i=>d[i]);
import { i as init_1, a as analytics__mf_v__runtimeInit__mf_v__ } from './assets/analytics__mf_v__runtimeInit__mf_v__-DbtG7uBC.js';
import exposesMap from './assets/virtualExposes-DQhpd0WN.js';
import { _ as __vitePreload } from './assets/preload-helper-BelkbqnE.js';

const importMap = {
      
        "react": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-VBwl8x_k.js').then(n => n.i),true?__vite__mapDeps([0,1]):void 0);
          return pkg
        }
      ,
        "@tanstack/react-query": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-a3H_CsAJ.js'),true?__vite__mapDeps([2,3,1,4,5]):void 0);
          return pkg
        }
      ,
        "@mui/material": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-CSNU9wvR.js'),true?__vite__mapDeps([6,7,8,3,1,4,5,9,10,11]):void 0);
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await __vitePreload(() => import('./assets/index-SMWQwpBC.js').then(n => n.i),true?__vite__mapDeps([12,1,3,4]):void 0);
          return pkg
        }
      ,
        "@emotion/styled": async () => {
          let pkg = await __vitePreload(() => import('./assets/emotion-styled.browser.esm-BNWbe3UA.js'),true?__vite__mapDeps([13,8,9,4,14,3,1]):void 0);
          return pkg
        }
      ,
        "@emotion/react": async () => {
          let pkg = await __vitePreload(() => import('./assets/emotion-react.browser.esm-M-NLDpP1.js'),true?__vite__mapDeps([15,3,1,4,10,8,14]):void 0);
          return pkg
        }
      
    };
      const usedShared = {
      
          "react": {
            name: "react",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "analytics",
            async get () {
              usedShared["react"].loaded = true;
              const {"react": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^18.3.0"
            }
          }
        ,
          "@tanstack/react-query": {
            name: "@tanstack/react-query",
            version: "5.84.2",
            scope: ["default"],
            loaded: false,
            from: "analytics",
            async get () {
              usedShared["@tanstack/react-query"].loaded = true;
              const {"@tanstack/react-query": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.84.2"
            }
          }
        ,
          "@mui/material": {
            name: "@mui/material",
            version: "5.18.0",
            scope: ["default"],
            loaded: false,
            from: "analytics",
            async get () {
              usedShared["@mui/material"].loaded = true;
              const {"@mui/material": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.18.0"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "analytics",
            async get () {
              usedShared["react-dom"].loaded = true;
              const {"react-dom": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^18.3.0"
            }
          }
        ,
          "@emotion/styled": {
            name: "@emotion/styled",
            version: "11.14.1",
            scope: ["default"],
            loaded: false,
            from: "analytics",
            async get () {
              usedShared["@emotion/styled"].loaded = true;
              const {"@emotion/styled": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.14.1"
            }
          }
        ,
          "@emotion/react": {
            name: "@emotion/react",
            version: "11.14.0",
            scope: ["default"],
            loaded: false,
            from: "analytics",
            async get () {
              usedShared["@emotion/react"].loaded = true;
              const {"@emotion/react": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.14.0"
            }
          }
        
    };
      const usedRemotes = [
      ];

const initTokens = {};
  const shareScopeName = "default";
  const mfName = "analytics";
  async function init(shared = {}, initScope = []) {
    const initRes = init_1({
      name: mfName,
      remotes: usedRemotes,
      shared: usedShared,
      plugins: [],
      shareStrategy: 'version-first'
    });
    // handling circular init calls
    var initToken = initTokens[shareScopeName];
    if (!initToken)
      initToken = initTokens[shareScopeName] = { from: mfName };
    if (initScope.indexOf(initToken) >= 0) return;
    initScope.push(initToken);
    initRes.initShareScopeMap('default', shared);
    try {
      await Promise.all(await initRes.initializeSharing('default', {
        strategy: 'version-first',
        from: "build",
        initScope
      }));
    } catch (e) {
      console.error(e);
    }
    analytics__mf_v__runtimeInit__mf_v__.initResolve(initRes);
    return initRes
  }

  function getExposes(moduleName) {
    if (!(moduleName in exposesMap)) throw new Error(`Module ${moduleName} does not exist in container.`)
    return (exposesMap[moduleName])().then(res => () => res)
  }

export { getExposes as get, init };
