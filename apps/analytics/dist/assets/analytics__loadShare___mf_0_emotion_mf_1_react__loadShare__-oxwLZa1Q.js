import { a as analytics__mf_v__runtimeInit__mf_v__, b as index_cjs } from './analytics__mf_v__runtimeInit__mf_v__-DbtG7uBC.js';

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = analytics__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("@emotion/react", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^11.14.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__ = exportModule;

export { analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__ as a };
