const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-VBwl8x_k.js","assets/_commonjsHelpers-Dj2_voLF.js","assets/index-C-0CK0nd.js","assets/host__loadShare__react__loadShare__-CkNB6A9V.js","assets/host__mf_v__runtimeInit__mf_v__-SjEEibwd.js","assets/jsx-runtime-D7Td02kX.js","assets/index-Csi359tN.js","assets/index-Dgqv89d4.js","assets/CssBaseline-D8jKUyvJ.js","assets/emotion-serialize.esm-DpD3M_lx.js","assets/host__loadShare___mf_0_emotion_mf_1_react__loadShare__-BIBEhxMz.js","assets/emotion-cache.browser.esm-BasAJTkK.js","assets/emotion-styled.browser.esm-BXH5J0HV.js","assets/emotion-utils.browser.esm-BLZ0_g0c.js","assets/emotion-react.browser.esm-CQzqukA0.js"])))=>i.map(i=>d[i]);
import { i as init_1, h as host__mf_v__runtimeInit__mf_v__ } from './host__mf_v__runtimeInit__mf_v__-SjEEibwd.js';
import exposesMap from './virtualExposes-DwA08f_D.js';
import { _ as __vitePreload } from './preload-helper-BelkbqnE.js';

const importMap = {
      
        "react": async () => {
          let pkg = await __vitePreload(() => import('./index-VBwl8x_k.js').then(n => n.i),true?__vite__mapDeps([0,1]):void 0);
          return pkg
        }
      ,
        "@tanstack/react-query": async () => {
          let pkg = await __vitePreload(() => import('./index-C-0CK0nd.js'),true?__vite__mapDeps([2,3,1,4,5]):void 0);
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await __vitePreload(() => import('./index-Csi359tN.js').then(n => n.i),true?__vite__mapDeps([6,1,3,4]):void 0);
          return pkg
        }
      ,
        "@mui/material": async () => {
          let pkg = await __vitePreload(() => import('./index-Dgqv89d4.js'),true?__vite__mapDeps([7,8,1,4,9,3,5,10,11]):void 0);
          return pkg
        }
      ,
        "@emotion/styled": async () => {
          let pkg = await __vitePreload(() => import('./emotion-styled.browser.esm-BXH5J0HV.js'),true?__vite__mapDeps([12,9,10,4,13,3,1]):void 0);
          return pkg
        }
      ,
        "@emotion/react": async () => {
          let pkg = await __vitePreload(() => import('./emotion-react.browser.esm-CQzqukA0.js'),true?__vite__mapDeps([14,3,1,4,11,9,13]):void 0);
          return pkg
        }
      
    };
      const usedShared = {
      
          "react": {
            name: "react",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "host",
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
            from: "host",
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
          "react-dom": {
            name: "react-dom",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "host",
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
          "@mui/material": {
            name: "@mui/material",
            version: "5.18.0",
            scope: ["default"],
            loaded: false,
            from: "host",
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
          "@emotion/styled": {
            name: "@emotion/styled",
            version: "11.14.1",
            scope: ["default"],
            loaded: false,
            from: "host",
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
            from: "host",
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
                {
                  entryGlobalName: "remote",
                  name: "remote",
                  type: "module",
                  entry: "http://localhost:3001/remoteEntry.js",
                  shareScope: "default",
                }
          ,
                {
                  entryGlobalName: "analytics",
                  name: "analytics",
                  type: "module",
                  entry: "http://localhost:3002/remoteEntry.js",
                  shareScope: "default",
                }
          
      ];

const initTokens = {};
  const shareScopeName = "default";
  const mfName = "host";
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
    host__mf_v__runtimeInit__mf_v__.initResolve(initRes);
    return initRes
  }

  function getExposes(moduleName) {
    if (!(moduleName in exposesMap)) throw new Error(`Module ${moduleName} does not exist in container.`)
    return (exposesMap[moduleName])().then(res => () => res)
  }

export { getExposes as get, init };
