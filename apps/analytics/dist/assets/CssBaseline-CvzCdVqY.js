import { g as getDefaultExportFromCjs } from './_commonjsHelpers-Dj2_voLF.js';
import { a as analytics__mf_v__runtimeInit__mf_v__, b as index_cjs } from './analytics__mf_v__runtimeInit__mf_v__-DbtG7uBC.js';
import { _ as _extends } from './emotion-serialize.esm-DpD3M_lx.js';
import { f as createTheme, G as GlobalStyles$2, h as internal_serializeStyles, _ as _objectWithoutPropertiesLoose, aa as DefaultPropsProvider, T as THEME_ID, y as defaultTheme, S as useDefaultProps } from './createSvgIcon-Du4kc-bh.js';
import { a as analytics__loadShare__react__loadShare__, b as React } from './analytics__loadShare__react__loadShare__-DF7DD1yK.js';
import { j as jsxRuntimeExports } from './jsx-runtime-Bx4h0SFP.js';
import { a as analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__ } from './analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__-oxwLZa1Q.js';

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = analytics__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("react-dom", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^18.3.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var analytics__loadShare__react_mf_2_dom__loadShare__ = exportModule;

const ReactDOM = /*@__PURE__*/getDefaultExportFromCjs(analytics__loadShare__react_mf_2_dom__loadShare__);

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme$2(defaultTheme = null) {
  const contextTheme = analytics__loadShare__react__loadShare__.useContext(analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__.ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

const systemDefaultTheme = createTheme();
function useTheme$1(defaultTheme = systemDefaultTheme) {
  return useTheme$2(defaultTheme);
}

function wrapGlobalLayer(styles) {
  const serialized = internal_serializeStyles(styles);
  if (styles !== serialized && serialized.styles) {
    if (!serialized.styles.match(/^@layer\s+[^{]*$/)) {
      serialized.styles = `@layer global{${serialized.styles}}`;
    }
    return serialized;
  }
  return styles;
}
function GlobalStyles$1({
  styles,
  themeId,
  defaultTheme = {}
}) {
  const upperTheme = useTheme$1(defaultTheme);
  const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
  let globalStyles = typeof styles === "function" ? styles(resolvedTheme) : styles;
  if (resolvedTheme.modularCssLayers) {
    if (Array.isArray(globalStyles)) {
      globalStyles = globalStyles.map((styleArg) => {
        if (typeof styleArg === "function") {
          return wrapGlobalLayer(styleArg(resolvedTheme));
        }
        return wrapGlobalLayer(styleArg);
      });
    } else {
      globalStyles = wrapGlobalLayer(globalStyles);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalStyles$2, {
    styles: globalStyles
  });
}

/**
 * A version of `React.useLayoutEffect` that does not show a warning when server-side rendering.
 * This is useful for effects that are only needed for client-side rendering but not for SSR.
 *
 * Before you use this hook, make sure to read https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * and confirm it doesn't apply to your use-case.
 */
const useEnhancedEffect = typeof window !== 'undefined' ? analytics__loadShare__react__loadShare__.useLayoutEffect : analytics__loadShare__react__loadShare__.useEffect;

let globalId = 0;
function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = analytics__loadShare__react__loadShare__.useState(idOverride);
  const id = idOverride || defaultId;
  analytics__loadShare__react__loadShare__.useEffect(() => {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}

// downstream bundlers may remove unnecessary concatenation, but won't remove toString call -- Workaround for https://github.com/webpack/webpack/issues/14814
const maybeReactUseId = React['useId'.toString()];
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
function useId(idOverride) {
  if (maybeReactUseId !== undefined) {
    const reactId = maybeReactUseId();
    return idOverride != null ? idOverride : reactId;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.
  return useGlobalId(idOverride);
}

const ThemeContext = /* @__PURE__ */ analytics__loadShare__react__loadShare__.createContext(null);

function useTheme() {
  const theme = analytics__loadShare__react__loadShare__.useContext(ThemeContext);
  return theme;
}

const hasSymbol = typeof Symbol === 'function' && Symbol.for;
const nested = hasSymbol ? Symbol.for('mui.nested') : '__THEME_NESTED__';

function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    return mergedTheme;
  }
  return _extends({}, outerTheme, localTheme);
}
function ThemeProvider$2(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme();
  const theme = analytics__loadShare__react__loadShare__.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, {
    value: theme,
    children
  });
}

const _excluded$1 = ["value"];
const RtlContext = /* @__PURE__ */ analytics__loadShare__react__loadShare__.createContext();
function RtlProvider(_ref) {
  let {
    value
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RtlContext.Provider, _extends({
    value: value != null ? value : true
  }, props));
}
const useRtl = () => {
  const value = analytics__loadShare__react__loadShare__.useContext(RtlContext);
  return value != null ? value : false;
};

function useLayerOrder(theme) {
  const upperTheme = useTheme$2();
  const id = useId() || '';
  const {
    modularCssLayers
  } = theme;
  let layerOrder = 'mui.global, mui.components, mui.theme, mui.custom, mui.sx';
  if (!modularCssLayers || upperTheme !== null) {
    // skip this hook if upper theme exists.
    layerOrder = '';
  } else if (typeof modularCssLayers === 'string') {
    layerOrder = modularCssLayers.replace(/mui(?!\.)/g, layerOrder);
  } else {
    layerOrder = `@layer ${layerOrder};`;
  }
  useEnhancedEffect(() => {
    const head = document.querySelector('head');
    if (!head) {
      return;
    }
    const firstChild = head.firstChild;
    if (layerOrder) {
      var _firstChild$hasAttrib;
      // Only insert if first child doesn't have data-mui-layer-order attribute
      if (firstChild && (_firstChild$hasAttrib = firstChild.hasAttribute) != null && _firstChild$hasAttrib.call(firstChild, 'data-mui-layer-order') && firstChild.getAttribute('data-mui-layer-order') === id) {
        return;
      }
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-mui-layer-order', id);
      styleElement.textContent = layerOrder;
      head.prepend(styleElement);
    } else {
      var _head$querySelector;
      (_head$querySelector = head.querySelector(`style[data-mui-layer-order="${id}"]`)) == null || _head$querySelector.remove();
    }
  }, [layerOrder, id]);
  if (!layerOrder) {
    return null;
  }
  return /*#__PURE__*/jsxRuntimeExports.jsx(GlobalStyles$1, {
    styles: layerOrder
  });
}

const EMPTY_THEME = {};
function useThemeScoping(themeId, upperTheme, localTheme, isPrivate = false) {
  return analytics__loadShare__react__loadShare__.useMemo(() => {
    const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
    if (typeof localTheme === "function") {
      const mergedTheme = localTheme(resolvedTheme);
      const result = themeId ? _extends({}, upperTheme, {
        [themeId]: mergedTheme
      }) : mergedTheme;
      if (isPrivate) {
        return () => result;
      }
      return result;
    }
    return themeId ? _extends({}, upperTheme, {
      [themeId]: localTheme
    }) : _extends({}, upperTheme, localTheme);
  }, [themeId, upperTheme, localTheme, isPrivate]);
}
function ThemeProvider$1(props) {
  const {
    children,
    theme: localTheme,
    themeId
  } = props;
  const upperTheme = useTheme$2(EMPTY_THEME);
  const upperPrivateTheme = useTheme() || EMPTY_THEME;
  const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
  const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
  const rtlValue = engineTheme.direction === "rtl";
  const layerOrder = useLayerOrder(engineTheme);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider$2, {
    theme: privateTheme,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__.ThemeContext.Provider, {
      value: engineTheme,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(RtlProvider, {
        value: rtlValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DefaultPropsProvider, {
          value: engineTheme == null ? void 0 : engineTheme.components,
          children: [layerOrder, children]
        })
      })
    })
  });
}

const _excluded = ["theme"];
function ThemeProvider(_ref) {
  let {
    theme: themeInput
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const scopedTheme = themeInput[THEME_ID];
  let finalTheme = scopedTheme || themeInput;
  if (typeof themeInput !== "function") {
    if (scopedTheme && !scopedTheme.vars) {
      finalTheme = _extends({}, scopedTheme, {
        vars: null
      });
    } else if (themeInput && !themeInput.vars) {
      finalTheme = _extends({}, themeInput, {
        vars: null
      });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider$1, _extends({}, props, {
    themeId: scopedTheme ? THEME_ID : void 0,
    theme: finalTheme
  }));
}

function GlobalStyles(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalStyles$1, _extends({}, props, {
    defaultTheme,
    themeId: THEME_ID
  }));
}

const html = (theme, enableColorScheme) => _extends({
  WebkitFontSmoothing: "antialiased",
  // Antialiasing.
  MozOsxFontSmoothing: "grayscale",
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: "100%"
}, enableColorScheme && !theme.vars && {
  colorScheme: theme.palette.mode
});
const body = (theme) => _extends({
  color: (theme.vars || theme).palette.text.primary
}, theme.typography.body1, {
  backgroundColor: (theme.vars || theme).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (theme.vars || theme).palette.common.white
  }
});
const styles = (theme, enableColorScheme = false) => {
  var _theme$components;
  const colorSchemeStyles = {};
  if (enableColorScheme && theme.colorSchemes) {
    Object.entries(theme.colorSchemes).forEach(([key, scheme]) => {
      var _scheme$palette;
      colorSchemeStyles[theme.getColorSchemeSelector(key).replace(/\s*&/, "")] = {
        colorScheme: (_scheme$palette = scheme.palette) == null ? void 0 : _scheme$palette.mode
      };
    });
  }
  let defaultStyles = _extends({
    html: html(theme, enableColorScheme),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: theme.typography.fontWeightBold
    },
    body: _extends({
      margin: 0
    }, body(theme), {
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: (theme.vars || theme).palette.background.default
      }
    })
  }, colorSchemeStyles);
  const themeOverrides = (_theme$components = theme.components) == null || (_theme$components = _theme$components.MuiCssBaseline) == null ? void 0 : _theme$components.styleOverrides;
  if (themeOverrides) {
    defaultStyles = [defaultStyles, themeOverrides];
  }
  return defaultStyles;
};
function CssBaseline(inProps) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCssBaseline"
  });
  const {
    children,
    enableColorScheme = false
  } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare__react__loadShare__.Fragment, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(GlobalStyles, {
      styles: (theme) => styles(theme, enableColorScheme)
    }), children]
  });
}

export { CssBaseline as C, GlobalStyles as G, ReactDOM as R, ThemeProvider as T, analytics__loadShare__react_mf_2_dom__loadShare__ as a, useTheme$2 as b, useEnhancedEffect as c, useTheme as d, ThemeProvider$1 as e, useId as f, useRtl as g, html as h, body as i, useTheme$1 as u };
