import { h as host__mf_v__runtimeInit__mf_v__, a as index_cjs } from './host__mf_v__runtimeInit__mf_v__-SjEEibwd.js';

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = host__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("@emotion/react", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^11.14.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var host__loadShare___mf_0_emotion_mf_1_react__loadShare__ = exportModule;

export { host__loadShare___mf_0_emotion_mf_1_react__loadShare__ as h };
