import { c as createSignal, a as createEffect, b as createRenderEffect, u as useContext, S as ShadowDomTargetContext, d as createMemo, t as template, i as insert, m as memo, e as createComponent, f as className, s as setAttribute, g as delegateEvents, h as mergeProps, j as useDevtoolsOnClose, k as invariant, l as spread, n as addEventListener, r as rootRouteId, o as trimPath, p as interpolatePath, q as Show, v as createUniqueId, D as DevtoolsOnCloseContext, w as Dynamic } from './App-CSLAs_wK.js';
import { d as clsx } from './createSvgIcon-Du4kc-bh.js';
import './jsx-runtime-Bx4h0SFP.js';
import './analytics__loadShare__react__loadShare__-DF7DD1yK.js';
import './_commonjsHelpers-Dj2_voLF.js';
import './analytics__mf_v__runtimeInit__mf_v__-DbtG7uBC.js';
import './CssBaseline-CvzCdVqY.js';
import './emotion-serialize.esm-DpD3M_lx.js';
import './analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__-oxwLZa1Q.js';
import './MetricsSummary-C3ZkKAf2.js';
import './preload-helper-BelkbqnE.js';
import './AnalyticsPage-D6SLVmur.js';
import './emotion-cache.browser.esm-BasAJTkK.js';

const isServer = typeof window === "undefined";
function getStatusColor(match) {
  const colorMap = {
    pending: "yellow",
    success: "green",
    error: "red",
    notFound: "purple",
    redirected: "gray"
  };
  return match.isFetching && match.status === "success" ? match.isFetching === "beforeLoad" ? "purple" : "blue" : colorMap[match.status];
}
function getRouteStatusColor(matches, route) {
  const found = matches.find((d) => d.routeId === route.id);
  if (!found) return "gray";
  return getStatusColor(found);
}
function useIsMounted() {
  const [isMounted, setIsMounted] = createSignal(false);
  const effect = isServer ? createEffect : createRenderEffect;
  effect(() => {
    setIsMounted(true);
  });
  return isMounted;
}
const displayValue = (value) => {
  const name = Object.getOwnPropertyNames(Object(value));
  const newValue = typeof value === "bigint" ? `${value.toString()}n` : value;
  try {
    return JSON.stringify(newValue, name);
  } catch (e) {
    return `unable to stringify`;
  }
};
function multiSortBy(arr, accessors = [(d) => d]) {
  return arr.map((d, i) => [d, i]).sort(([a, ai], [b, bi]) => {
    for (const accessor of accessors) {
      const ao = accessor(a);
      const bo = accessor(b);
      if (typeof ao === "undefined") {
        if (typeof bo === "undefined") {
          continue;
        }
        return 1;
      }
      if (ao === bo) {
        continue;
      }
      return ao > bo ? 1 : -1;
    }
    return ai - bi;
  }).map(([d]) => d);
}

let e={data:""},t=t=>"object"==typeof window?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||e,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,a=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,o=(e,t)=>{let r="",l="",a="";for(let n in e){let c=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+c+";":l+="f"==n[1]?o(c,n):n+"{"+o(c,"k"==n[1]?"":t)+"}":"object"==typeof c?l+=o(c,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=c&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=o.p?o.p(n,c):n+":"+c+";");}return r+(t&&a?t+"{"+a+"}":a)+l},c={},s=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+s(e[r]);return t}return e},i=(e,t,r,i,p)=>{let u=s(e),d=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return "go"+r})(u));if(!c[d]){let t=u!==e?e:(e=>{let t,r,o=[{}];for(;t=l.exec(e.replace(a,""));)t[4]?o.shift():t[3]?(r=t[3].replace(n," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(n," ").trim();return o[0]})(e);c[d]=o(p?{["@keyframes "+d]:t}:t,r?"":"."+d);}let f=r&&c.g?c.g:null;return r&&(c.g=c[d]),((e,t,r,l)=>{l?t.data=t.data.replace(l,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e);})(c[d],t,i,f),d},p=(e,t,r)=>e.reduce((e,l,a)=>{let n=t[a];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":o(e,""):false===e?"":e;}return e+l+(null==n?"":n)},"");function u(e){let r=this||{},l=e.call?e(r.p):e;return i(l.unshift?l.raw?p(l,[].slice.call(arguments,1),r.p):l.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):l,t(r.target),r.g,r.o,r.k)}u.bind({g:1});u.bind({k:1});

const tokens = {
  colors: {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000000",
    white: "#ffffff",
    neutral: {
      50: "#f9fafb",
      100: "#f2f4f7",
      200: "#eaecf0",
      300: "#d0d5dd",
      400: "#98a2b3",
      500: "#667085",
      600: "#475467",
      700: "#344054",
      800: "#1d2939",
      900: "#101828"
    },
    darkGray: {
      50: "#525c7a",
      100: "#49536e",
      200: "#414962",
      300: "#394056",
      400: "#313749",
      500: "#292e3d",
      600: "#212530",
      700: "#191c24",
      800: "#111318",
      900: "#0b0d10"
    },
    gray: {
      50: "#f9fafb",
      100: "#f2f4f7",
      200: "#eaecf0",
      300: "#d0d5dd",
      400: "#98a2b3",
      500: "#667085",
      600: "#475467",
      700: "#344054",
      800: "#1d2939",
      900: "#101828"
    },
    blue: {
      25: "#F5FAFF",
      50: "#EFF8FF",
      100: "#D1E9FF",
      200: "#B2DDFF",
      300: "#84CAFF",
      400: "#53B1FD",
      500: "#2E90FA",
      600: "#1570EF",
      700: "#175CD3",
      800: "#1849A9",
      900: "#194185"
    },
    green: {
      25: "#F6FEF9",
      50: "#ECFDF3",
      100: "#D1FADF",
      200: "#A6F4C5",
      300: "#6CE9A6",
      400: "#32D583",
      500: "#12B76A",
      600: "#039855",
      700: "#027A48",
      800: "#05603A",
      900: "#054F31"
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a"
    },
    yellow: {
      25: "#FFFCF5",
      50: "#FFFAEB",
      100: "#FEF0C7",
      200: "#FEDF89",
      300: "#FEC84B",
      400: "#FDB022",
      500: "#F79009",
      600: "#DC6803",
      700: "#B54708",
      800: "#93370D",
      900: "#7A2E0E"
    },
    purple: {
      25: "#FAFAFF",
      50: "#F4F3FF",
      100: "#EBE9FE",
      200: "#D9D6FE",
      300: "#BDB4FE",
      400: "#9B8AFB",
      500: "#7A5AF8",
      600: "#6938EF",
      700: "#5925DC",
      800: "#4A1FB8",
      900: "#3E1C96"
    },
    teal: {
      25: "#F6FEFC",
      50: "#F0FDF9",
      100: "#CCFBEF",
      200: "#99F6E0",
      300: "#5FE9D0",
      400: "#2ED3B7",
      500: "#15B79E",
      600: "#0E9384",
      700: "#107569",
      800: "#125D56",
      900: "#134E48"
    },
    pink: {
      25: "#fdf2f8",
      50: "#fce7f3",
      100: "#fbcfe8",
      200: "#f9a8d4",
      300: "#f472b6",
      400: "#ec4899",
      500: "#db2777",
      600: "#be185d",
      700: "#9d174d",
      800: "#831843",
      900: "#500724"
    },
    cyan: {
      25: "#ecfeff",
      50: "#cffafe",
      100: "#a5f3fc",
      200: "#67e8f9",
      300: "#22d3ee",
      400: "#06b6d4",
      500: "#0891b2",
      600: "#0e7490",
      700: "#155e75",
      800: "#164e63",
      900: "#083344"
    }
  },
  alpha: {
    90: "e5",
    70: "b3",
    20: "33"
  },
  font: {
    size: {
      "2xs": "calc(var(--tsrd-font-size) * 0.625)",
      xs: "calc(var(--tsrd-font-size) * 0.75)",
      sm: "calc(var(--tsrd-font-size) * 0.875)",
      md: "var(--tsrd-font-size)"
    },
    lineHeight: {
      xs: "calc(var(--tsrd-font-size) * 1)",
      sm: "calc(var(--tsrd-font-size) * 1.25)"
    },
    weight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700"
    },
    fontFamily: {
      sans: "ui-sans-serif, Inter, system-ui, sans-serif, sans-serif",
      mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`
    }
  },
  border: {
    radius: {
      xs: "calc(var(--tsrd-font-size) * 0.125)",
      sm: "calc(var(--tsrd-font-size) * 0.25)",
      md: "calc(var(--tsrd-font-size) * 0.375)",
      full: "9999px"
    }
  },
  size: {
    0: "0px",
    0.5: "calc(var(--tsrd-font-size) * 0.125)",
    1: "calc(var(--tsrd-font-size) * 0.25)",
    1.5: "calc(var(--tsrd-font-size) * 0.375)",
    2: "calc(var(--tsrd-font-size) * 0.5)",
    2.5: "calc(var(--tsrd-font-size) * 0.625)",
    3: "calc(var(--tsrd-font-size) * 0.75)",
    3.5: "calc(var(--tsrd-font-size) * 0.875)",
    4: "calc(var(--tsrd-font-size) * 1)",
    5: "calc(var(--tsrd-font-size) * 1.25)",
    8: "calc(var(--tsrd-font-size) * 2)"
  }
};

const stylesFactory$1 = (shadowDOMTarget) => {
  const {
    colors,
    font,
    size,
    alpha,
    border
  } = tokens;
  const {
    fontFamily,
    lineHeight,
    size: fontSize
  } = font;
  const css = shadowDOMTarget ? u.bind({
    target: shadowDOMTarget
  }) : u;
  return {
    devtoolsPanelContainer: css`
      direction: ltr;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 99999;
      width: 100%;
      max-height: 90%;
      border-top: 1px solid ${colors.gray[700]};
      transform-origin: top;
    `,
    devtoolsPanelContainerVisibility: (isOpen) => {
      return css`
        visibility: ${isOpen ? "visible" : "hidden"};
      `;
    },
    devtoolsPanelContainerResizing: (isResizing) => {
      if (isResizing()) {
        return css`
          transition: none;
        `;
      }
      return css`
        transition: all 0.4s ease;
      `;
    },
    devtoolsPanelContainerAnimation: (isOpen, height) => {
      if (isOpen) {
        return css`
          pointer-events: auto;
          transform: translateY(0);
        `;
      }
      return css`
        pointer-events: none;
        transform: translateY(${height}px);
      `;
    },
    logo: css`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      font-family: ${fontFamily.sans};
      gap: ${tokens.size[0.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    tanstackLogo: css`
      font-size: ${font.size.md};
      font-weight: ${font.weight.bold};
      line-height: ${font.lineHeight.xs};
      white-space: nowrap;
      color: ${colors.gray[300]};
    `,
    routerLogo: css`
      font-weight: ${font.weight.semibold};
      font-size: ${font.size.xs};
      background: linear-gradient(to right, #84cc16, #10b981);
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,
    devtoolsPanel: css`
      display: flex;
      font-size: ${fontSize.sm};
      font-family: ${fontFamily.sans};
      background-color: ${colors.darkGray[700]};
      color: ${colors.gray[300]};

      @media (max-width: 700px) {
        flex-direction: column;
      }
      @media (max-width: 600px) {
        font-size: ${fontSize.xs};
      }
    `,
    dragHandle: css`
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      cursor: row-resize;
      z-index: 100000;
      &:hover {
        background-color: ${colors.purple[400]}${alpha[90]};
      }
    `,
    firstContainer: css`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      border-right: 1px solid ${colors.gray[700]};
      display: flex;
      flex-direction: column;
    `,
    routerExplorerContainer: css`
      overflow-y: auto;
      flex: 1;
    `,
    routerExplorer: css`
      padding: ${tokens.size[2]};
    `,
    row: css`
      display: flex;
      align-items: center;
      padding: ${tokens.size[2]} ${tokens.size[2.5]};
      gap: ${tokens.size[2.5]};
      border-bottom: ${colors.darkGray[500]} 1px solid;
      align-items: center;
    `,
    detailsHeader: css`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${colors.darkGray[600]};
      padding: 0px ${tokens.size[2]};
      font-weight: ${font.weight.medium};
      font-size: ${font.size.xs};
      min-height: ${tokens.size[8]};
      line-height: ${font.lineHeight.xs};
      text-align: left;
      display: flex;
      align-items: center;
    `,
    maskedBadge: css`
      background: ${colors.yellow[900]}${alpha[70]};
      color: ${colors.yellow[300]};
      display: inline-block;
      padding: ${tokens.size[0]} ${tokens.size[2.5]};
      border-radius: ${border.radius.full};
      font-size: ${font.size.xs};
      font-weight: ${font.weight.normal};
      border: 1px solid ${colors.yellow[300]};
    `,
    maskedLocation: css`
      color: ${colors.yellow[300]};
    `,
    detailsContent: css`
      padding: ${tokens.size[1.5]} ${tokens.size[2]};
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${font.size.xs};
    `,
    routeMatchesToggle: css`
      display: flex;
      align-items: center;
      border: 1px solid ${colors.gray[500]};
      border-radius: ${border.radius.sm};
      overflow: hidden;
    `,
    routeMatchesToggleBtn: (active, showBorder) => {
      const base = css`
        appearance: none;
        border: none;
        font-size: 12px;
        padding: 4px 8px;
        background: transparent;
        cursor: pointer;
        font-family: ${fontFamily.sans};
        font-weight: ${font.weight.medium};
      `;
      const classes = [base];
      if (active) {
        const activeStyles = css`
          background: ${colors.darkGray[400]};
          color: ${colors.gray[300]};
        `;
        classes.push(activeStyles);
      } else {
        const inactiveStyles = css`
          color: ${colors.gray[500]};
          background: ${colors.darkGray[800]}${alpha[20]};
        `;
        classes.push(inactiveStyles);
      }
      if (showBorder) {
        classes.push(css`
          border-right: 1px solid ${tokens.colors.gray[500]};
        `);
      }
      return classes;
    },
    detailsHeaderInfo: css`
      flex: 1;
      justify-content: flex-end;
      display: flex;
      align-items: center;
      font-weight: ${font.weight.normal};
      color: ${colors.gray[400]};
    `,
    matchRow: (active) => {
      const base = css`
        display: flex;
        border-bottom: 1px solid ${colors.darkGray[400]};
        cursor: pointer;
        align-items: center;
        padding: ${size[1]} ${size[2]};
        gap: ${size[2]};
        font-size: ${fontSize.xs};
        color: ${colors.gray[300]};
      `;
      const classes = [base];
      if (active) {
        const activeStyles = css`
          background: ${colors.darkGray[500]};
        `;
        classes.push(activeStyles);
      }
      return classes;
    },
    matchIndicator: (color) => {
      const base = css`
        flex: 0 0 auto;
        width: ${size[3]};
        height: ${size[3]};
        background: ${colors[color][900]};
        border: 1px solid ${colors[color][500]};
        border-radius: ${border.radius.full};
        transition: all 0.25s ease-out;
        box-sizing: border-box;
      `;
      const classes = [base];
      if (color === "gray") {
        const grayStyles = css`
          background: ${colors.gray[700]};
          border-color: ${colors.gray[400]};
        `;
        classes.push(grayStyles);
      }
      return classes;
    },
    matchID: css`
      flex: 1;
      line-height: ${lineHeight["xs"]};
    `,
    ageTicker: (showWarning) => {
      const base = css`
        display: flex;
        gap: ${size[1]};
        font-size: ${fontSize.xs};
        color: ${colors.gray[400]};
        font-variant-numeric: tabular-nums;
        line-height: ${lineHeight["xs"]};
      `;
      const classes = [base];
      if (showWarning) {
        const warningStyles = css`
          color: ${colors.yellow[400]};
        `;
        classes.push(warningStyles);
      }
      return classes;
    },
    secondContainer: css`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      border-right: 1px solid ${colors.gray[700]};
      display: flex;
      flex-direction: column;
    `,
    thirdContainer: css`
      flex: 1 1 500px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      border-right: 1px solid ${colors.gray[700]};

      @media (max-width: 700px) {
        border-top: 2px solid ${colors.gray[700]};
      }
    `,
    fourthContainer: css`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
    `,
    routesContainer: css`
      overflow-x: auto;
      overflow-y: visible;
    `,
    routesRowContainer: (active, isMatch) => {
      const base = css`
        display: flex;
        border-bottom: 1px solid ${colors.darkGray[400]};
        align-items: center;
        padding: ${size[1]} ${size[2]};
        gap: ${size[2]};
        font-size: ${fontSize.xs};
        color: ${colors.gray[300]};
        cursor: ${isMatch ? "pointer" : "default"};
        line-height: ${lineHeight["xs"]};
      `;
      const classes = [base];
      if (active) {
        const activeStyles = css`
          background: ${colors.darkGray[500]};
        `;
        classes.push(activeStyles);
      }
      return classes;
    },
    routesRow: (isMatch) => {
      const base = css`
        flex: 1 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${fontSize.xs};
        line-height: ${lineHeight["xs"]};
      `;
      const classes = [base];
      if (!isMatch) {
        const matchStyles = css`
          color: ${colors.gray[400]};
        `;
        classes.push(matchStyles);
      }
      return classes;
    },
    routesRowInner: css`
      display: 'flex';
      align-items: 'center';
      flex-grow: 1;
      min-width: 0;
    `,
    routeParamInfo: css`
      color: ${colors.gray[400]};
      font-size: ${fontSize.xs};
      line-height: ${lineHeight["xs"]};
    `,
    nestedRouteRow: (isRoot) => {
      const base = css`
        margin-left: ${isRoot ? 0 : size[3.5]};
        border-left: ${isRoot ? "" : `solid 1px ${colors.gray[700]}`};
      `;
      return base;
    },
    code: css`
      font-size: ${fontSize.xs};
      line-height: ${lineHeight["xs"]};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    matchesContainer: css`
      flex: 1 1 auto;
      overflow-y: auto;
    `,
    cachedMatchesContainer: css`
      flex: 1 1 auto;
      overflow-y: auto;
      max-height: 50%;
    `,
    maskedBadgeContainer: css`
      flex: 1;
      justify-content: flex-end;
      display: flex;
    `,
    matchDetails: css`
      display: flex;
      flex-direction: column;
      padding: ${tokens.size[2]};
      font-size: ${tokens.font.size.xs};
      color: ${tokens.colors.gray[300]};
      line-height: ${tokens.font.lineHeight.sm};
    `,
    matchStatus: (status, isFetching) => {
      const colorMap = {
        pending: "yellow",
        success: "green",
        error: "red",
        notFound: "purple",
        redirected: "gray"
      };
      const color = isFetching && status === "success" ? isFetching === "beforeLoad" ? "purple" : "blue" : colorMap[status];
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-radius: ${tokens.border.radius.sm};
        font-weight: ${tokens.font.weight.normal};
        background-color: ${tokens.colors[color][900]}${tokens.alpha[90]};
        color: ${tokens.colors[color][300]};
        border: 1px solid ${tokens.colors[color][600]};
        margin-bottom: ${tokens.size[2]};
        transition: all 0.25s ease-out;
      `;
    },
    matchDetailsInfo: css`
      display: flex;
      justify-content: flex-end;
      flex: 1;
    `,
    matchDetailsInfoLabel: css`
      display: flex;
    `,
    mainCloseBtn: css`
      background: ${colors.darkGray[700]};
      padding: ${size[1]} ${size[2]} ${size[1]} ${size[1.5]};
      border-radius: ${border.radius.md};
      position: fixed;
      z-index: 99999;
      display: inline-flex;
      width: fit-content;
      cursor: pointer;
      appearance: none;
      border: 0;
      gap: 8px;
      align-items: center;
      border: 1px solid ${colors.gray[500]};
      font-size: ${font.size.xs};
      cursor: pointer;
      transition: all 0.25s ease-out;

      &:hover {
        background: ${colors.darkGray[500]};
      }
    `,
    mainCloseBtnPosition: (position) => {
      const base = css`
        ${position === "top-left" ? `top: ${size[2]}; left: ${size[2]};` : ""}
        ${position === "top-right" ? `top: ${size[2]}; right: ${size[2]};` : ""}
        ${position === "bottom-left" ? `bottom: ${size[2]}; left: ${size[2]};` : ""}
        ${position === "bottom-right" ? `bottom: ${size[2]}; right: ${size[2]};` : ""}
      `;
      return base;
    },
    mainCloseBtnAnimation: (isOpen) => {
      if (!isOpen) {
        return css`
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
        `;
      }
      return css`
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      `;
    },
    routerLogoCloseButton: css`
      font-weight: ${font.weight.semibold};
      font-size: ${font.size.xs};
      background: linear-gradient(to right, #98f30c, #00f4a3);
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,
    mainCloseBtnDivider: css`
      width: 1px;
      background: ${tokens.colors.gray[600]};
      height: 100%;
      border-radius: 999999px;
      color: transparent;
    `,
    mainCloseBtnIconContainer: css`
      position: relative;
      width: ${size[5]};
      height: ${size[5]};
      background: pink;
      border-radius: 999999px;
      overflow: hidden;
    `,
    mainCloseBtnIconOuter: css`
      width: ${size[5]};
      height: ${size[5]};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(3px) saturate(1.8) contrast(2);
    `,
    mainCloseBtnIconInner: css`
      width: ${size[4]};
      height: ${size[4]};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    panelCloseBtn: css`
      position: absolute;
      cursor: pointer;
      z-index: 100001;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${colors.darkGray[700]};
      &:hover {
        background-color: ${colors.darkGray[500]};
      }

      top: 0;
      right: ${size[2]};
      transform: translate(0, -100%);
      border-right: ${colors.darkGray[300]} 1px solid;
      border-left: ${colors.darkGray[300]} 1px solid;
      border-top: ${colors.darkGray[300]} 1px solid;
      border-bottom: none;
      border-radius: ${border.radius.sm} ${border.radius.sm} 0px 0px;
      padding: ${size[1]} ${size[1.5]} ${size[0.5]} ${size[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${size[2.5]};
        height: ${size[1.5]};
        width: calc(100% + ${size[5]});
      }
    `,
    panelCloseBtnIcon: css`
      color: ${colors.gray[400]};
      width: ${size[2]};
      height: ${size[2]};
    `,
    navigateButton: css`
      background: none;
      border: none;
      padding: 0 0 0 4px;
      margin: 0;
      color: ${colors.gray[400]};
      font-size: ${fontSize.md};
      cursor: pointer;
      line-height: 1;
      vertical-align: middle;
      margin-right: 0.5ch;
      flex-shrink: 0;
      &:hover {
        color: ${colors.blue[300]};
      }
    `
  };
};
function useStyles$1() {
  const shadowDomTarget = useContext(ShadowDomTargetContext);
  const [_styles] = createSignal(stylesFactory$1(shadowDomTarget));
  return _styles;
}

const getItem = (key) => {
  try {
    const itemValue = localStorage.getItem(key);
    if (typeof itemValue === "string") {
      return JSON.parse(itemValue);
    }
    return void 0;
  } catch {
    return void 0;
  }
};
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = createSignal();
  createEffect(() => {
    const initialValue = getItem(key);
    if (typeof initialValue === "undefined" || initialValue === null) {
      setValue(
        typeof defaultValue === "function" ? defaultValue() : defaultValue
      );
    } else {
      setValue(initialValue);
    }
  });
  const setter = (updater) => {
    setValue((old) => {
      let newVal = updater;
      if (typeof updater == "function") {
        newVal = updater(old);
      }
      try {
        localStorage.setItem(key, JSON.stringify(newVal));
      } catch {
      }
      return newVal;
    });
  };
  return [value, setter];
}

var _tmpl$$5 = /* @__PURE__ */ template(`<span><svg xmlns=http://www.w3.org/2000/svg width=12 height=12 fill=none viewBox="0 0 24 24"><path stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M9 18l6-6-6-6">`), _tmpl$2$1 = /* @__PURE__ */ template(`<div>`), _tmpl$3$1 = /* @__PURE__ */ template(`<button><span> `), _tmpl$4$1 = /* @__PURE__ */ template(`<div><div><button> [<!> ... <!>]`), _tmpl$5$1 = /* @__PURE__ */ template(`<button><span></span> 🔄 `), _tmpl$6$1 = /* @__PURE__ */ template(`<span>:`), _tmpl$7$1 = /* @__PURE__ */ template(`<span>`);
const Expander = ({
  expanded,
  style = {}
}) => {
  const styles = useStyles();
  return (() => {
    var _el$ = _tmpl$$5(), _el$2 = _el$.firstChild;
    createRenderEffect((_p$) => {
      var _v$ = styles().expander, _v$2 = clsx(styles().expanderIcon(expanded));
      _v$ !== _p$.e && className(_el$, _p$.e = _v$);
      _v$2 !== _p$.t && setAttribute(_el$2, "class", _p$.t = _v$2);
      return _p$;
    }, {
      e: void 0,
      t: void 0
    });
    return _el$;
  })();
};
function chunkArray(array, size) {
  if (size < 1) return [];
  let i = 0;
  const result = [];
  while (i < array.length) {
    result.push(array.slice(i, i + size));
    i = i + size;
  }
  return result;
}
function isIterable(x) {
  return Symbol.iterator in x;
}
function Explorer({
  value,
  defaultExpanded,
  pageSize = 100,
  filterSubEntries,
  ...rest
}) {
  const [expanded, setExpanded] = createSignal(Boolean(defaultExpanded));
  const toggleExpanded = () => setExpanded((old) => !old);
  const type = createMemo(() => typeof value());
  const subEntries = createMemo(() => {
    let entries = [];
    const makeProperty = (sub) => {
      const subDefaultExpanded = defaultExpanded === true ? {
        [sub.label]: true
      } : defaultExpanded == null ? void 0 : defaultExpanded[sub.label];
      return {
        ...sub,
        value: () => sub.value,
        defaultExpanded: subDefaultExpanded
      };
    };
    if (Array.isArray(value())) {
      entries = value().map((d, i) => makeProperty({
        label: i.toString(),
        value: d
      }));
    } else if (value() !== null && typeof value() === "object" && isIterable(value()) && typeof value()[Symbol.iterator] === "function") {
      entries = Array.from(value(), (val, i) => makeProperty({
        label: i.toString(),
        value: val
      }));
    } else if (typeof value() === "object" && value() !== null) {
      entries = Object.entries(value()).map(([key, val]) => makeProperty({
        label: key,
        value: val
      }));
    }
    return filterSubEntries ? filterSubEntries(entries) : entries;
  });
  const subEntryPages = createMemo(() => chunkArray(subEntries(), pageSize));
  const [expandedPages, setExpandedPages] = createSignal([]);
  const [valueSnapshot, setValueSnapshot] = createSignal(void 0);
  const styles = useStyles();
  const refreshValueSnapshot = () => {
    setValueSnapshot(value()());
  };
  const handleEntry = (entry) => createComponent(Explorer, mergeProps({
    value,
    filterSubEntries
  }, rest, entry));
  return (() => {
    var _el$3 = _tmpl$2$1();
    insert(_el$3, (() => {
      var _c$ = memo(() => !!subEntryPages().length);
      return () => _c$() ? [(() => {
        var _el$4 = _tmpl$3$1(), _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild;
        _el$4.$$click = () => toggleExpanded();
        insert(_el$4, createComponent(Expander, {
          get expanded() {
            return expanded() ?? false;
          }
        }), _el$5);
        insert(_el$4, () => rest.label, _el$5);
        insert(_el$5, () => String(type).toLowerCase() === "iterable" ? "(Iterable) " : "", _el$6);
        insert(_el$5, () => subEntries().length, _el$6);
        insert(_el$5, () => subEntries().length > 1 ? `items` : `item`, null);
        createRenderEffect((_p$) => {
          var _v$3 = styles().expandButton, _v$4 = styles().info;
          _v$3 !== _p$.e && className(_el$4, _p$.e = _v$3);
          _v$4 !== _p$.t && className(_el$5, _p$.t = _v$4);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$4;
      })(), memo(() => memo(() => !!(expanded() ?? false))() ? memo(() => subEntryPages().length === 1)() ? (() => {
        var _el$7 = _tmpl$2$1();
        insert(_el$7, () => subEntries().map((entry, index) => handleEntry(entry)));
        createRenderEffect(() => className(_el$7, styles().subEntries));
        return _el$7;
      })() : (() => {
        var _el$8 = _tmpl$2$1();
        insert(_el$8, () => subEntryPages().map((entries, index) => {
          return (() => {
            var _el$9 = _tmpl$4$1(), _el$0 = _el$9.firstChild, _el$1 = _el$0.firstChild, _el$10 = _el$1.firstChild, _el$15 = _el$10.nextSibling, _el$12 = _el$15.nextSibling, _el$16 = _el$12.nextSibling;
            _el$16.nextSibling;
            _el$1.$$click = () => setExpandedPages((old) => old.includes(index) ? old.filter((d) => d !== index) : [...old, index]);
            insert(_el$1, createComponent(Expander, {
              get expanded() {
                return expandedPages().includes(index);
              }
            }), _el$10);
            insert(_el$1, index * pageSize, _el$15);
            insert(_el$1, index * pageSize + pageSize - 1, _el$16);
            insert(_el$0, (() => {
              var _c$3 = memo(() => !!expandedPages().includes(index));
              return () => _c$3() ? (() => {
                var _el$17 = _tmpl$2$1();
                insert(_el$17, () => entries.map((entry) => handleEntry(entry)));
                createRenderEffect(() => className(_el$17, styles().subEntries));
                return _el$17;
              })() : null;
            })(), null);
            createRenderEffect((_p$) => {
              var _v$5 = styles().entry, _v$6 = clsx(styles().labelButton, "labelButton");
              _v$5 !== _p$.e && className(_el$0, _p$.e = _v$5);
              _v$6 !== _p$.t && className(_el$1, _p$.t = _v$6);
              return _p$;
            }, {
              e: void 0,
              t: void 0
            });
            return _el$9;
          })();
        }));
        createRenderEffect(() => className(_el$8, styles().subEntries));
        return _el$8;
      })() : null)] : (() => {
        var _c$2 = memo(() => type() === "function");
        return () => _c$2() ? createComponent(Explorer, {
          get label() {
            return (() => {
              var _el$18 = _tmpl$5$1(), _el$19 = _el$18.firstChild;
              _el$18.$$click = refreshValueSnapshot;
              insert(_el$19, () => rest.label);
              createRenderEffect(() => className(_el$18, styles().refreshValueBtn));
              return _el$18;
            })();
          },
          value: valueSnapshot,
          defaultExpanded: {}
        }) : [(() => {
          var _el$20 = _tmpl$6$1(), _el$21 = _el$20.firstChild;
          insert(_el$20, () => rest.label, _el$21);
          return _el$20;
        })(), " ", (() => {
          var _el$22 = _tmpl$7$1();
          insert(_el$22, () => displayValue(value()));
          createRenderEffect(() => className(_el$22, styles().value));
          return _el$22;
        })()];
      })();
    })());
    createRenderEffect(() => className(_el$3, styles().entry));
    return _el$3;
  })();
}
const stylesFactory = (shadowDOMTarget) => {
  const {
    colors,
    font,
    size
  } = tokens;
  const {
    fontFamily,
    lineHeight,
    size: fontSize
  } = font;
  const css = shadowDOMTarget ? u.bind({
    target: shadowDOMTarget
  }) : u;
  return {
    entry: css`
      font-family: ${fontFamily.mono};
      font-size: ${fontSize.xs};
      line-height: ${lineHeight.sm};
      outline: none;
      word-break: break-word;
    `,
    labelButton: css`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      background: transparent;
      border: none;
      padding: 0;
    `,
    expander: css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${size[3]};
      height: ${size[3]};
      padding-left: 3px;
      box-sizing: content-box;
    `,
    expanderIcon: (expanded) => {
      if (expanded) {
        return css`
          transform: rotate(90deg);
          transition: transform 0.1s ease;
        `;
      }
      return css`
        transform: rotate(0deg);
        transition: transform 0.1s ease;
      `;
    },
    expandButton: css`
      display: flex;
      gap: ${size[1]};
      align-items: center;
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      background: transparent;
      border: none;
      padding: 0;
    `,
    value: css`
      color: ${colors.purple[400]};
    `,
    subEntries: css`
      margin-left: ${size[2]};
      padding-left: ${size[2]};
      border-left: 2px solid ${colors.darkGray[400]};
    `,
    info: css`
      color: ${colors.gray[500]};
      font-size: ${fontSize["2xs"]};
      padding-left: ${size[1]};
    `,
    refreshValueBtn: css`
      appearance: none;
      border: 0;
      cursor: pointer;
      background: transparent;
      color: inherit;
      padding: 0;
      font-family: ${fontFamily.mono};
      font-size: ${fontSize.xs};
    `
  };
};
function useStyles() {
  const shadowDomTarget = useContext(ShadowDomTargetContext);
  const [_styles] = createSignal(stylesFactory(shadowDomTarget));
  return _styles;
}
delegateEvents(["click"]);

var _tmpl$$4 = /* @__PURE__ */ template(`<div><div></div><div>/</div><div></div><div>/</div><div>`);
function formatTime(ms) {
  const units = ["s", "min", "h", "d"];
  const values = [ms / 1e3, ms / 6e4, ms / 36e5, ms / 864e5];
  let chosenUnitIndex = 0;
  for (let i = 1; i < values.length; i++) {
    if (values[i] < 1) break;
    chosenUnitIndex = i;
  }
  const formatter = new Intl.NumberFormat(navigator.language, {
    compactDisplay: "short",
    notation: "compact",
    maximumFractionDigits: 0
  });
  return formatter.format(values[chosenUnitIndex]) + units[chosenUnitIndex];
}
function AgeTicker({
  match,
  router
}) {
  const styles = useStyles$1();
  if (!match) {
    return null;
  }
  const route = router().looseRoutesById[match.routeId];
  if (!route.options.loader) {
    return null;
  }
  const age = Date.now() - match.updatedAt;
  const staleTime = route.options.staleTime ?? router().options.defaultStaleTime ?? 0;
  const gcTime = route.options.gcTime ?? router().options.defaultGcTime ?? 30 * 60 * 1e3;
  return (() => {
    var _el$ = _tmpl$$4(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling;
    insert(_el$2, () => formatTime(age));
    insert(_el$4, () => formatTime(staleTime));
    insert(_el$6, () => formatTime(gcTime));
    createRenderEffect(() => className(_el$, clsx(styles().ageTicker(age > staleTime))));
    return _el$;
  })();
}

var _tmpl$$3 = /* @__PURE__ */ template(`<button type=button>➔`);
function NavigateButton({
  to,
  params,
  search,
  router
}) {
  const styles = useStyles$1();
  return (() => {
    var _el$ = _tmpl$$3();
    _el$.$$click = (e) => {
      e.stopPropagation();
      router().navigate({
        to,
        params,
        search
      });
    };
    setAttribute(_el$, "title", `Navigate to ${to}`);
    createRenderEffect(() => className(_el$, styles().navigateButton));
    return _el$;
  })();
}
delegateEvents(["click"]);

var _tmpl$$2 = /* @__PURE__ */ template(`<button><div>TANSTACK</div><div>TanStack Router v1`), _tmpl$2 = /* @__PURE__ */ template(`<div><div>`), _tmpl$3 = /* @__PURE__ */ template(`<code> `), _tmpl$4 = /* @__PURE__ */ template(`<code>`), _tmpl$5 = /* @__PURE__ */ template(`<div><div role=button><div>`), _tmpl$6 = /* @__PURE__ */ template(`<div>`), _tmpl$7 = /* @__PURE__ */ template(`<div><button><svg xmlns=http://www.w3.org/2000/svg width=10 height=6 fill=none viewBox="0 0 10 6"><path stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.667 d="M1 1l4 4 4-4"></path></svg></button><div><div></div><div><div></div></div></div><div><div><div><span>Pathname</span></div><div><code></code></div><div><div><button type=button>Routes</button><button type=button>Matches</button></div><div><div>age / staleTime / gcTime</div></div></div><div>`), _tmpl$8 = /* @__PURE__ */ template(`<div><span>masked`), _tmpl$9 = /* @__PURE__ */ template(`<div role=button><div>`), _tmpl$0 = /* @__PURE__ */ template(`<div><div><div>Cached Matches</div><div>age / staleTime / gcTime</div></div><div>`), _tmpl$1 = /* @__PURE__ */ template(`<div><div>Match Details</div><div><div><div><div></div></div><div><div>ID:</div><div><code></code></div></div><div><div>State:</div><div></div></div><div><div>Last Updated:</div><div></div></div></div></div><div>Explorer</div><div>`), _tmpl$10 = /* @__PURE__ */ template(`<div>Loader Data`), _tmpl$11 = /* @__PURE__ */ template(`<div><div>Search Params</div><div>`);
function Logo(props) {
  const {
    className: className$1,
    ...rest
  } = props;
  const styles = useStyles$1();
  return (() => {
    var _el$ = _tmpl$$2(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
    spread(_el$, mergeProps(rest, {
      get ["class"]() {
        return clsx(styles().logo, className$1 ? className$1() : "");
      }
    }), false, true);
    createRenderEffect((_p$) => {
      var _v$ = styles().tanstackLogo, _v$2 = styles().routerLogo;
      _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
      _v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
      return _p$;
    }, {
      e: void 0,
      t: void 0
    });
    return _el$;
  })();
}
function NavigateLink(props) {
  return (() => {
    var _el$4 = _tmpl$2(), _el$5 = _el$4.firstChild;
    _el$4.style.setProperty("display", "flex");
    _el$4.style.setProperty("align-items", "center");
    _el$4.style.setProperty("width", "100%");
    insert(_el$4, () => props.left, _el$5);
    _el$5.style.setProperty("flex-grow", "1");
    _el$5.style.setProperty("min-width", "0");
    insert(_el$5, () => props.children);
    insert(_el$4, () => props.right, null);
    createRenderEffect(() => className(_el$4, props.class));
    return _el$4;
  })();
}
function RouteComp({
  routerState,
  router,
  route,
  isRoot,
  activeId,
  setActiveId
}) {
  const styles = useStyles$1();
  const matches = createMemo(() => routerState().pendingMatches || routerState().matches);
  const match = createMemo(() => routerState().matches.find((d) => d.routeId === route.id));
  const param = createMemo(() => {
    var _a, _b;
    try {
      if ((_a = match()) == null ? void 0 : _a.params) {
        const p = (_b = match()) == null ? void 0 : _b.params;
        const r = route.path || trimPath(route.id);
        if (r.startsWith("$")) {
          const trimmed = r.slice(1);
          if (p[trimmed]) {
            return `(${p[trimmed]})`;
          }
        }
      }
      return "";
    } catch (error) {
      return "";
    }
  });
  const navigationTarget = createMemo(() => {
    if (isRoot) return void 0;
    if (!route.path) return void 0;
    const allParams = Object.assign({}, ...matches().map((m) => m.params));
    const interpolated = interpolatePath({
      path: route.fullPath,
      params: allParams,
      leaveWildcards: false,
      leaveParams: false,
      decodeCharMap: router().pathParamsDecodeCharMap
    });
    return !interpolated.isMissingParams ? interpolated.interpolatedPath : void 0;
  });
  return (() => {
    var _el$6 = _tmpl$5(), _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild;
    _el$7.$$click = () => {
      if (match()) {
        setActiveId(activeId() === route.id ? "" : route.id);
      }
    };
    insert(_el$7, createComponent(NavigateLink, {
      get ["class"]() {
        return clsx(styles().routesRow(!!match()));
      },
      get left() {
        return createComponent(Show, {
          get when() {
            return navigationTarget();
          },
          children: (navigate) => createComponent(NavigateButton, {
            get to() {
              return navigate();
            },
            router
          })
        });
      },
      get right() {
        return createComponent(AgeTicker, {
          get match() {
            return match();
          },
          router
        });
      },
      get children() {
        return [(() => {
          var _el$9 = _tmpl$3(), _el$0 = _el$9.firstChild;
          insert(_el$9, () => isRoot ? rootRouteId : route.path || trimPath(route.id), _el$0);
          createRenderEffect(() => className(_el$9, styles().code));
          return _el$9;
        })(), (() => {
          var _el$1 = _tmpl$4();
          insert(_el$1, param);
          createRenderEffect(() => className(_el$1, styles().routeParamInfo));
          return _el$1;
        })()];
      }
    }), null);
    insert(_el$6, (() => {
      var _c$ = memo(() => {
        var _a;
        return !!((_a = route.children) == null ? void 0 : _a.length);
      });
      return () => _c$() ? (() => {
        var _el$10 = _tmpl$6();
        insert(_el$10, () => [...route.children].sort((a, b) => {
          return a.rank - b.rank;
        }).map((r) => createComponent(RouteComp, {
          routerState,
          router,
          route: r,
          activeId,
          setActiveId
        })));
        createRenderEffect(() => className(_el$10, styles().nestedRouteRow(!!isRoot)));
        return _el$10;
      })() : null;
    })(), null);
    createRenderEffect((_p$) => {
      var _v$3 = `Open match details for ${route.id}`, _v$4 = clsx(styles().routesRowContainer(route.id === activeId(), !!match())), _v$5 = clsx(styles().matchIndicator(getRouteStatusColor(matches(), route)));
      _v$3 !== _p$.e && setAttribute(_el$7, "aria-label", _p$.e = _v$3);
      _v$4 !== _p$.t && className(_el$7, _p$.t = _v$4);
      _v$5 !== _p$.a && className(_el$8, _p$.a = _v$5);
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    });
    return _el$6;
  })();
}
const BaseTanStackRouterDevtoolsPanel = function BaseTanStackRouterDevtoolsPanel2({
  ...props
}) {
  const {
    isOpen = true,
    setIsOpen,
    handleDragStart,
    router,
    routerState,
    shadowDOMTarget,
    ...panelProps
  } = props;
  const {
    onCloseClick
  } = useDevtoolsOnClose();
  const styles = useStyles$1();
  const {
    className: className$1,
    style,
    ...otherPanelProps
  } = panelProps;
  invariant(router);
  const [showMatches, setShowMatches] = useLocalStorage("tanstackRouterDevtoolsShowMatches", true);
  const [activeId, setActiveId] = useLocalStorage("tanstackRouterDevtoolsActiveRouteId", "");
  const activeMatch = createMemo(() => {
    const matches = [...routerState().pendingMatches ?? [], ...routerState().matches, ...routerState().cachedMatches];
    return matches.find((d) => d.routeId === activeId() || d.id === activeId());
  });
  const hasSearch = createMemo(() => Object.keys(routerState().location.search).length);
  const explorerState = createMemo(() => {
    return {
      ...router(),
      state: routerState()
    };
  });
  const routerExplorerValue = createMemo(() => Object.fromEntries(multiSortBy(Object.keys(explorerState()), ["state", "routesById", "routesByPath", "flatRoutes", "options", "manifest"].map((d) => (dd) => dd !== d)).map((key) => [key, explorerState()[key]]).filter((d) => typeof d[1] !== "function" && !["__store", "basepath", "injectedHtml", "subscribers", "latestLoadPromise", "navigateTimeout", "resetNextScroll", "tempLocationKey", "latestLocation", "routeTree", "history"].includes(d[0]))));
  const activeMatchLoaderData = createMemo(() => {
    var _a;
    return (_a = activeMatch()) == null ? void 0 : _a.loaderData;
  });
  const activeMatchValue = createMemo(() => activeMatch());
  const locationSearchValue = createMemo(() => routerState().location.search);
  return (() => {
    var _el$11 = _tmpl$7(), _el$12 = _el$11.firstChild, _el$13 = _el$12.firstChild, _el$14 = _el$12.nextSibling, _el$15 = _el$14.firstChild, _el$16 = _el$15.nextSibling, _el$17 = _el$16.firstChild, _el$18 = _el$14.nextSibling, _el$19 = _el$18.firstChild, _el$20 = _el$19.firstChild;
    _el$20.firstChild;
    var _el$22 = _el$20.nextSibling, _el$23 = _el$22.firstChild, _el$24 = _el$22.nextSibling, _el$25 = _el$24.firstChild, _el$26 = _el$25.firstChild, _el$27 = _el$26.nextSibling, _el$28 = _el$25.nextSibling, _el$29 = _el$24.nextSibling;
    spread(_el$11, mergeProps({
      get ["class"]() {
        return clsx(styles().devtoolsPanel, "TanStackRouterDevtoolsPanel", className$1 ? className$1() : "");
      },
      get style() {
        return style ? style() : "";
      }
    }, otherPanelProps), false, true);
    insert(_el$11, handleDragStart ? (() => {
      var _el$30 = _tmpl$6();
      addEventListener(_el$30, "mousedown", handleDragStart, true);
      createRenderEffect(() => className(_el$30, styles().dragHandle));
      return _el$30;
    })() : null, _el$12);
    _el$12.$$click = (e) => {
      if (setIsOpen) {
        setIsOpen(false);
      }
      onCloseClick(e);
    };
    insert(_el$15, createComponent(Logo, {
      "aria-hidden": true,
      onClick: (e) => {
        if (setIsOpen) {
          setIsOpen(false);
        }
        onCloseClick(e);
      }
    }));
    insert(_el$17, createComponent(Explorer, {
      label: "Router",
      value: routerExplorerValue,
      defaultExpanded: {
        state: {},
        context: {},
        options: {}
      },
      filterSubEntries: (subEntries) => {
        return subEntries.filter((d) => typeof d.value() !== "function");
      }
    }));
    insert(_el$20, (() => {
      var _c$2 = memo(() => !!routerState().location.maskedLocation);
      return () => _c$2() ? (() => {
        var _el$31 = _tmpl$8(), _el$32 = _el$31.firstChild;
        createRenderEffect((_p$) => {
          var _v$22 = styles().maskedBadgeContainer, _v$23 = styles().maskedBadge;
          _v$22 !== _p$.e && className(_el$31, _p$.e = _v$22);
          _v$23 !== _p$.t && className(_el$32, _p$.t = _v$23);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$31;
      })() : null;
    })(), null);
    insert(_el$23, () => routerState().location.pathname);
    insert(_el$22, (() => {
      var _c$3 = memo(() => !!routerState().location.maskedLocation);
      return () => _c$3() ? (() => {
        var _el$33 = _tmpl$4();
        insert(_el$33, () => {
          var _a;
          return (_a = routerState().location.maskedLocation) == null ? void 0 : _a.pathname;
        });
        createRenderEffect(() => className(_el$33, styles().maskedLocation));
        return _el$33;
      })() : null;
    })(), null);
    _el$26.$$click = () => {
      setShowMatches(false);
    };
    _el$27.$$click = () => {
      setShowMatches(true);
    };
    insert(_el$29, (() => {
      var _c$4 = memo(() => !!!showMatches());
      return () => _c$4() ? createComponent(RouteComp, {
        routerState,
        router,
        get route() {
          return router().routeTree;
        },
        isRoot: true,
        activeId,
        setActiveId
      }) : (() => {
        var _el$34 = _tmpl$6();
        insert(_el$34, () => {
          var _a, _b;
          return (_b = ((_a = routerState().pendingMatches) == null ? void 0 : _a.length) ? routerState().pendingMatches : routerState().matches) == null ? void 0 : _b.map((match, _i) => {
            return (() => {
              var _el$35 = _tmpl$9(), _el$36 = _el$35.firstChild;
              _el$35.$$click = () => setActiveId(activeId() === match.id ? "" : match.id);
              insert(_el$35, createComponent(NavigateLink, {
                get left() {
                  return createComponent(NavigateButton, {
                    get to() {
                      return match.pathname;
                    },
                    get params() {
                      return match.params;
                    },
                    get search() {
                      return match.search;
                    },
                    router
                  });
                },
                get right() {
                  return createComponent(AgeTicker, {
                    match,
                    router
                  });
                },
                get children() {
                  var _el$37 = _tmpl$4();
                  insert(_el$37, () => `${match.routeId === rootRouteId ? rootRouteId : match.pathname}`);
                  createRenderEffect(() => className(_el$37, styles().matchID));
                  return _el$37;
                }
              }), null);
              createRenderEffect((_p$) => {
                var _v$24 = `Open match details for ${match.id}`, _v$25 = clsx(styles().matchRow(match === activeMatch())), _v$26 = clsx(styles().matchIndicator(getStatusColor(match)));
                _v$24 !== _p$.e && setAttribute(_el$35, "aria-label", _p$.e = _v$24);
                _v$25 !== _p$.t && className(_el$35, _p$.t = _v$25);
                _v$26 !== _p$.a && className(_el$36, _p$.a = _v$26);
                return _p$;
              }, {
                e: void 0,
                t: void 0,
                a: void 0
              });
              return _el$35;
            })();
          });
        });
        return _el$34;
      })();
    })());
    insert(_el$18, (() => {
      var _c$5 = memo(() => !!routerState().cachedMatches.length);
      return () => _c$5() ? (() => {
        var _el$38 = _tmpl$0(), _el$39 = _el$38.firstChild, _el$40 = _el$39.firstChild, _el$41 = _el$40.nextSibling, _el$42 = _el$39.nextSibling;
        insert(_el$42, () => routerState().cachedMatches.map((match) => {
          return (() => {
            var _el$43 = _tmpl$9(), _el$44 = _el$43.firstChild;
            _el$43.$$click = () => setActiveId(activeId() === match.id ? "" : match.id);
            insert(_el$43, createComponent(NavigateLink, {
              get left() {
                return createComponent(NavigateButton, {
                  get to() {
                    return match.pathname;
                  },
                  get params() {
                    return match.params;
                  },
                  get search() {
                    return match.search;
                  },
                  router
                });
              },
              get right() {
                return createComponent(AgeTicker, {
                  match,
                  router
                });
              },
              get children() {
                var _el$45 = _tmpl$4();
                insert(_el$45, () => `${match.id}`);
                createRenderEffect(() => className(_el$45, styles().matchID));
                return _el$45;
              }
            }), null);
            createRenderEffect((_p$) => {
              var _v$30 = `Open match details for ${match.id}`, _v$31 = clsx(styles().matchRow(match === activeMatch())), _v$32 = clsx(styles().matchIndicator(getStatusColor(match)));
              _v$30 !== _p$.e && setAttribute(_el$43, "aria-label", _p$.e = _v$30);
              _v$31 !== _p$.t && className(_el$43, _p$.t = _v$31);
              _v$32 !== _p$.a && className(_el$44, _p$.a = _v$32);
              return _p$;
            }, {
              e: void 0,
              t: void 0,
              a: void 0
            });
            return _el$43;
          })();
        }));
        createRenderEffect((_p$) => {
          var _v$27 = styles().cachedMatchesContainer, _v$28 = styles().detailsHeader, _v$29 = styles().detailsHeaderInfo;
          _v$27 !== _p$.e && className(_el$38, _p$.e = _v$27);
          _v$28 !== _p$.t && className(_el$39, _p$.t = _v$28);
          _v$29 !== _p$.a && className(_el$41, _p$.a = _v$29);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        });
        return _el$38;
      })() : null;
    })(), null);
    insert(_el$11, (() => {
      var _c$6 = memo(() => {
        var _a;
        return !!(activeMatch() && ((_a = activeMatch()) == null ? void 0 : _a.status));
      });
      return () => _c$6() ? (() => {
        var _el$46 = _tmpl$1(), _el$47 = _el$46.firstChild, _el$48 = _el$47.nextSibling, _el$49 = _el$48.firstChild, _el$50 = _el$49.firstChild, _el$51 = _el$50.firstChild, _el$52 = _el$50.nextSibling, _el$53 = _el$52.firstChild, _el$54 = _el$53.nextSibling, _el$55 = _el$54.firstChild, _el$56 = _el$52.nextSibling, _el$57 = _el$56.firstChild, _el$58 = _el$57.nextSibling, _el$59 = _el$56.nextSibling, _el$60 = _el$59.firstChild, _el$61 = _el$60.nextSibling, _el$62 = _el$48.nextSibling, _el$63 = _el$62.nextSibling;
        insert(_el$51, (() => {
          var _c$8 = memo(() => {
            var _a, _b;
            return !!(((_a = activeMatch()) == null ? void 0 : _a.status) === "success" && ((_b = activeMatch()) == null ? void 0 : _b.isFetching));
          });
          return () => {
            var _a;
            return _c$8() ? "fetching" : (_a = activeMatch()) == null ? void 0 : _a.status;
          };
        })());
        insert(_el$55, () => {
          var _a;
          return (_a = activeMatch()) == null ? void 0 : _a.id;
        });
        insert(_el$58, (() => {
          var _c$9 = memo(() => {
            var _a;
            return !!((_a = routerState().pendingMatches) == null ? void 0 : _a.find((d) => {
              var _a2;
              return d.id === ((_a2 = activeMatch()) == null ? void 0 : _a2.id);
            }));
          });
          return () => _c$9() ? "Pending" : routerState().matches.find((d) => {
            var _a;
            return d.id === ((_a = activeMatch()) == null ? void 0 : _a.id);
          }) ? "Active" : "Cached";
        })());
        insert(_el$61, (() => {
          var _c$0 = memo(() => {
            var _a;
            return !!((_a = activeMatch()) == null ? void 0 : _a.updatedAt);
          });
          return () => {
            var _a;
            return _c$0() ? new Date((_a = activeMatch()) == null ? void 0 : _a.updatedAt).toLocaleTimeString() : "N/A";
          };
        })());
        insert(_el$46, (() => {
          var _c$1 = memo(() => !!activeMatchLoaderData());
          return () => _c$1() ? [(() => {
            var _el$64 = _tmpl$10();
            createRenderEffect(() => className(_el$64, styles().detailsHeader));
            return _el$64;
          })(), (() => {
            var _el$65 = _tmpl$6();
            insert(_el$65, createComponent(Explorer, {
              label: "loaderData",
              value: activeMatchLoaderData,
              defaultExpanded: {}
            }));
            createRenderEffect(() => className(_el$65, styles().detailsContent));
            return _el$65;
          })()] : null;
        })(), _el$62);
        insert(_el$63, createComponent(Explorer, {
          label: "Match",
          value: activeMatchValue,
          defaultExpanded: {}
        }));
        createRenderEffect((_p$) => {
          var _a, _b;
          var _v$33 = styles().thirdContainer, _v$34 = styles().detailsHeader, _v$35 = styles().matchDetails, _v$36 = styles().matchStatus((_a = activeMatch()) == null ? void 0 : _a.status, (_b = activeMatch()) == null ? void 0 : _b.isFetching), _v$37 = styles().matchDetailsInfoLabel, _v$38 = styles().matchDetailsInfo, _v$39 = styles().matchDetailsInfoLabel, _v$40 = styles().matchDetailsInfo, _v$41 = styles().matchDetailsInfoLabel, _v$42 = styles().matchDetailsInfo, _v$43 = styles().detailsHeader, _v$44 = styles().detailsContent;
          _v$33 !== _p$.e && className(_el$46, _p$.e = _v$33);
          _v$34 !== _p$.t && className(_el$47, _p$.t = _v$34);
          _v$35 !== _p$.a && className(_el$49, _p$.a = _v$35);
          _v$36 !== _p$.o && className(_el$50, _p$.o = _v$36);
          _v$37 !== _p$.i && className(_el$52, _p$.i = _v$37);
          _v$38 !== _p$.n && className(_el$54, _p$.n = _v$38);
          _v$39 !== _p$.s && className(_el$56, _p$.s = _v$39);
          _v$40 !== _p$.h && className(_el$58, _p$.h = _v$40);
          _v$41 !== _p$.r && className(_el$59, _p$.r = _v$41);
          _v$42 !== _p$.d && className(_el$61, _p$.d = _v$42);
          _v$43 !== _p$.l && className(_el$62, _p$.l = _v$43);
          _v$44 !== _p$.u && className(_el$63, _p$.u = _v$44);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
          d: void 0,
          l: void 0,
          u: void 0
        });
        return _el$46;
      })() : null;
    })(), null);
    insert(_el$11, (() => {
      var _c$7 = memo(() => !!hasSearch());
      return () => _c$7() ? (() => {
        var _el$66 = _tmpl$11(), _el$67 = _el$66.firstChild, _el$68 = _el$67.nextSibling;
        insert(_el$68, createComponent(Explorer, {
          value: locationSearchValue,
          get defaultExpanded() {
            return Object.keys(routerState().location.search).reduce((obj, next) => {
              obj[next] = {};
              return obj;
            }, {});
          }
        }));
        createRenderEffect((_p$) => {
          var _v$45 = styles().fourthContainer, _v$46 = styles().detailsHeader, _v$47 = styles().detailsContent;
          _v$45 !== _p$.e && className(_el$66, _p$.e = _v$45);
          _v$46 !== _p$.t && className(_el$67, _p$.t = _v$46);
          _v$47 !== _p$.a && className(_el$68, _p$.a = _v$47);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        });
        return _el$66;
      })() : null;
    })(), null);
    createRenderEffect((_p$) => {
      var _v$6 = styles().panelCloseBtn, _v$7 = styles().panelCloseBtnIcon, _v$8 = styles().firstContainer, _v$9 = styles().row, _v$0 = styles().routerExplorerContainer, _v$1 = styles().routerExplorer, _v$10 = styles().secondContainer, _v$11 = styles().matchesContainer, _v$12 = styles().detailsHeader, _v$13 = styles().detailsContent, _v$14 = styles().detailsHeader, _v$15 = styles().routeMatchesToggle, _v$16 = !showMatches(), _v$17 = clsx(styles().routeMatchesToggleBtn(!showMatches(), true)), _v$18 = showMatches(), _v$19 = clsx(styles().routeMatchesToggleBtn(!!showMatches(), false)), _v$20 = styles().detailsHeaderInfo, _v$21 = clsx(styles().routesContainer);
      _v$6 !== _p$.e && className(_el$12, _p$.e = _v$6);
      _v$7 !== _p$.t && setAttribute(_el$13, "class", _p$.t = _v$7);
      _v$8 !== _p$.a && className(_el$14, _p$.a = _v$8);
      _v$9 !== _p$.o && className(_el$15, _p$.o = _v$9);
      _v$0 !== _p$.i && className(_el$16, _p$.i = _v$0);
      _v$1 !== _p$.n && className(_el$17, _p$.n = _v$1);
      _v$10 !== _p$.s && className(_el$18, _p$.s = _v$10);
      _v$11 !== _p$.h && className(_el$19, _p$.h = _v$11);
      _v$12 !== _p$.r && className(_el$20, _p$.r = _v$12);
      _v$13 !== _p$.d && className(_el$22, _p$.d = _v$13);
      _v$14 !== _p$.l && className(_el$24, _p$.l = _v$14);
      _v$15 !== _p$.u && className(_el$25, _p$.u = _v$15);
      _v$16 !== _p$.c && (_el$26.disabled = _p$.c = _v$16);
      _v$17 !== _p$.w && className(_el$26, _p$.w = _v$17);
      _v$18 !== _p$.m && (_el$27.disabled = _p$.m = _v$18);
      _v$19 !== _p$.f && className(_el$27, _p$.f = _v$19);
      _v$20 !== _p$.y && className(_el$28, _p$.y = _v$20);
      _v$21 !== _p$.g && className(_el$29, _p$.g = _v$21);
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0,
      h: void 0,
      r: void 0,
      d: void 0,
      l: void 0,
      u: void 0,
      c: void 0,
      w: void 0,
      m: void 0,
      f: void 0,
      y: void 0,
      g: void 0
    });
    return _el$11;
  })();
};
delegateEvents(["click", "mousedown"]);

var _tmpl$$1 = /* @__PURE__ */ template(`<svg xmlns=http://www.w3.org/2000/svg enable-background="new 0 0 634 633"viewBox="0 0 634 633"><g transform=translate(1)><linearGradient x1=-641.486 x2=-641.486 y1=856.648 y2=855.931 gradientTransform="matrix(633 0 0 -633 406377 542258)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#6bdaff></stop><stop offset=0.319 stop-color=#f9ffb5></stop><stop offset=0.706 stop-color=#ffa770></stop><stop offset=1 stop-color=#ff7373></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5 fill-rule=evenodd clip-rule=evenodd></circle><defs><filter width=454 height=396.9 x=-137.5 y=412 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=454 height=396.9 x=-137.5 y=412 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><ellipse cx=89.5 cy=610.5 fill=#015064 fill-rule=evenodd stroke=#00CFE2 stroke-width=25 clip-rule=evenodd rx=214.5 ry=186></ellipse><defs><filter width=454 height=396.9 x=316.5 y=412 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=454 height=396.9 x=316.5 y=412 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><ellipse cx=543.5 cy=610.5 fill=#015064 fill-rule=evenodd stroke=#00CFE2 stroke-width=25 clip-rule=evenodd rx=214.5 ry=186></ellipse><defs><filter width=454 height=396.9 x=-137.5 y=450 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=454 height=396.9 x=-137.5 y=450 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><ellipse cx=89.5 cy=648.5 fill=#015064 fill-rule=evenodd stroke=#00A8B8 stroke-width=25 clip-rule=evenodd rx=214.5 ry=186></ellipse><defs><filter width=454 height=396.9 x=316.5 y=450 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=454 height=396.9 x=316.5 y=450 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><ellipse cx=543.5 cy=648.5 fill=#015064 fill-rule=evenodd stroke=#00A8B8 stroke-width=25 clip-rule=evenodd rx=214.5 ry=186></ellipse><defs><filter width=454 height=396.9 x=-137.5 y=486 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=454 height=396.9 x=-137.5 y=486 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><ellipse cx=89.5 cy=684.5 fill=#015064 fill-rule=evenodd stroke=#007782 stroke-width=25 clip-rule=evenodd rx=214.5 ry=186></ellipse><defs><filter width=454 height=396.9 x=316.5 y=486 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=454 height=396.9 x=316.5 y=486 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><ellipse cx=543.5 cy=684.5 fill=#015064 fill-rule=evenodd stroke=#007782 stroke-width=25 clip-rule=evenodd rx=214.5 ry=186></ellipse><defs><filter width=176.9 height=129.3 x=272.2 y=308 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=176.9 height=129.3 x=272.2 y=308 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><g><path fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11 d="M436 403.2l-5 28.6m-140-90.3l-10.9 62m52.8-19.4l-4.3 27.1"></path><linearGradient x1=-645.656 x2=-646.499 y1=854.878 y2=854.788 gradientTransform="matrix(-184.159 -32.4722 11.4608 -64.9973 -128419.844 34938.836)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ee2700></stop><stop offset=1 stop-color=#ff008e></stop></linearGradient><path fill-rule=evenodd d="M344.1 363l97.7 17.2c5.8 2.1 8.2 6.2 7.1 12.1-1 5.9-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1.8-12.8 3.7-3.7 8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd></path><path fill=#D8D8D8 fill-rule=evenodd stroke=#FFF stroke-linecap=round stroke-linejoin=bevel stroke-width=7 d="M428.3 384.5l.9-6.5m-33.9 1.5l.9-6.5m-34 .5l.9-6.1m-38.9-16.1l4.2-3.9m-25.2-16.1l4.2-3.9"clip-rule=evenodd></path></g><defs><filter width=280.6 height=317.4 x=73.2 y=113.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=280.6 height=317.4 x=73.2 y=113.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><g><linearGradient x1=-646.8 x2=-646.8 y1=854.844 y2=853.844 gradientTransform="matrix(-100.1751 48.8587 -97.9753 -200.879 19124.773 203538.61)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#a17500></stop><stop offset=1 stop-color=#5d2100></stop></linearGradient><path fill-rule=evenodd d="M192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.2-2.9 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6-3.4-18.7-10.8-51.8-22.2-99.6l-25.3 4.6"clip-rule=evenodd></path><linearGradient x1=-635.467 x2=-635.467 y1=852.115 y2=851.115 gradientTransform="matrix(92.6873 4.8575 2.0257 -38.6535 57323.695 36176.047)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#2f8a00></stop><stop offset=1 stop-color=#90ff57></stop></linearGradient><path fill-rule=evenodd stroke=#2F8A00 stroke-width=13 d="M195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd></path><linearGradient x1=-636.573 x2=-636.573 y1=855.444 y2=854.444 gradientTransform="matrix(109.9945 5.7646 6.3597 -121.3507 64719.133 107659.336)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#2f8a00></stop><stop offset=1 stop-color=#90ff57></stop></linearGradient><path fill-rule=evenodd stroke=#2F8A00 stroke-width=13 d="M194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.3 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20 49.6-53.1 49.6-53.1z"clip-rule=evenodd></path><linearGradient x1=-632.145 x2=-632.145 y1=854.174 y2=853.174 gradientTransform="matrix(62.9558 3.2994 3.5021 -66.8246 37035.367 59284.227)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#2f8a00></stop><stop offset=1 stop-color=#90ff57></stop></linearGradient><path fill-rule=evenodd stroke=#2F8A00 stroke-width=13 d="M195 183.9c-.8-21.9 6-38 20.6-48.2 14.6-10.2 29.8-15.3 45.5-15.3-6.1 21.4-14.5 35.8-25.2 43.4-10.7 7.5-24.4 14.2-40.9 20.1z"clip-rule=evenodd></path><linearGradient x1=-638.224 x2=-638.224 y1=853.801 y2=852.801 gradientTransform="matrix(152.4666 7.9904 3.0934 -59.0251 94939.86 55646.855)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#2f8a00></stop><stop offset=1 stop-color=#90ff57></stop></linearGradient><path fill-rule=evenodd stroke=#2F8A00 stroke-width=13 d="M194.9 184.5c31.9-30 64.1-39.7 96.7-29 32.6 10.7 50.8 30.4 54.6 59.1-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd></path><linearGradient x1=-637.723 x2=-637.723 y1=855.103 y2=854.103 gradientTransform="matrix(136.467 7.1519 5.2165 -99.5377 82830.875 89859.578)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#2f8a00></stop><stop offset=1 stop-color=#90ff57></stop></linearGradient><path fill-rule=evenodd stroke=#2F8A00 stroke-width=13 d="M194.9 184.5c35.8-7.6 65.6-.2 89.2 22 23.6 22.2 37.7 49 42.3 80.3-39.8-9.7-68.3-23.8-85.5-42.4-17.2-18.5-32.5-38.5-46-59.9z"clip-rule=evenodd></path><linearGradient x1=-631.79 x2=-631.79 y1=855.872 y2=854.872 gradientTransform="matrix(60.8683 3.19 8.7771 -167.4773 31110.818 145537.61)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#2f8a00></stop><stop offset=1 stop-color=#90ff57></stop></linearGradient><path fill-rule=evenodd stroke=#2F8A00 stroke-width=13 d="M194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6-6.5 29.9-3.6 63.1 8.7 99.6 27.4-40.3 43.2-69.6 47.4-88 4.2-18.3 5.5-44.1 4-77.2z"clip-rule=evenodd></path><path fill=none stroke=#2F8A00 stroke-linecap=round stroke-width=8 d="M196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4-5.7 18-9.4 33-11.1 45.1"></path><path fill=none stroke=#2F8A00 stroke-linecap=round stroke-width=8 d="M194.8 185.7c-24.4 1.7-43.8 9-58.1 21.8-14.3 12.8-24.7 25.4-31.3 37.8m99.1-68.9c29.7-6.7 52-8.4 67-5 15 3.4 26.9 8.7 35.8 15.9m-110.8-5.9c20.3 9.9 38.2 20.5 53.9 31.9 15.7 11.4 27.4 22.1 35.1 32"></path></g><defs><filter width=532 height=633 x=50.5 y=399 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=532 height=633 x=50.5 y=399 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><linearGradient x1=-641.104 x2=-641.278 y1=856.577 y2=856.183 gradientTransform="matrix(532 0 0 -633 341484.5 542657)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#fff400></stop><stop offset=1 stop-color=#3c8700></stop></linearGradient><ellipse cx=316.5 cy=715.5 fill-rule=evenodd clip-rule=evenodd rx=266 ry=316.5></ellipse><defs><filter width=288 height=283 x=391 y=-24 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"></feColorMatrix></filter></defs><mask width=288 height=283 x=391 y=-24 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#FFF fill-rule=evenodd clip-rule=evenodd></circle></g></mask><g><g transform="translate(397 -24)"><linearGradient x1=-1036.672 x2=-1036.672 y1=880.018 y2=879.018 gradientTransform="matrix(227 0 0 -227 235493 199764)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffdf00></stop><stop offset=1 stop-color=#ff9d00></stop></linearGradient><circle cx=168.5 cy=113.5 r=113.5 fill-rule=evenodd clip-rule=evenodd></circle><linearGradient x1=-1017.329 x2=-1018.602 y1=658.003 y2=657.998 gradientTransform="matrix(30 0 0 -1 30558 771)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffa400></stop><stop offset=1 stop-color=#ff5e00></stop></linearGradient><path fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12 d="M30 113H0"></path><linearGradient x1=-1014.501 x2=-1015.774 y1=839.985 y2=839.935 gradientTransform="matrix(26.5 0 0 -5.5 26925 4696.5)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffa400></stop><stop offset=1 stop-color=#ff5e00></stop></linearGradient><path fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12 d="M33.5 79.5L7 74"></path><linearGradient x1=-1016.59 x2=-1017.862 y1=852.671 y2=852.595 gradientTransform="matrix(29 0 0 -8 29523 6971)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffa400></stop><stop offset=1 stop-color=#ff5e00></stop></linearGradient><path fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12 d="M34 146l-29 8"></path><linearGradient x1=-1011.984 x2=-1013.257 y1=863.523 y2=863.229 gradientTransform="matrix(24 0 0 -13 24339 11407)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffa400></stop><stop offset=1 stop-color=#ff5e00></stop></linearGradient><path fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12 d="M45 177l-24 13"></path><linearGradient x1=-1006.673 x2=-1007.946 y1=869.279 y2=868.376 gradientTransform="matrix(20 0 0 -19 20205 16720)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffa400></stop><stop offset=1 stop-color=#ff5e00></stop></linearGradient><path fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12 d="M67 204l-20 19"></path><linearGradient x1=-992.85 x2=-993.317 y1=871.258 y2=870.258 gradientTransform="matrix(13.8339 0 0 -22.8467 13825.796 20131.938)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffa400></stop><stop offset=1 stop-color=#ff5e00></stop></linearGradient><path fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12 d="M94.4 227l-13.8 22.8"></path><linearGradient x1=-953.835 x2=-953.965 y1=871.9 y2=870.9 gradientTransform="matrix(7.5 0 0 -24.5 7278 21605)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffa400></stop><stop offset=1 stop-color=#ff5e00></stop></linearGradient><path fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12 d="M127.5 243.5L120 268"></path><linearGradient x1=244.504 x2=244.496 y1=871.898 y2=870.898 gradientTransform="matrix(.5 0 0 -24.5 45.5 21614)"gradientUnits=userSpaceOnUse><stop offset=0 stop-color=#ffa400></stop><stop offset=1 stop-color=#ff5e00></stop></linearGradient><path fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12 d="M167.5 252.5l.5 24.5">`);
function TanStackLogo() {
  const id = createUniqueId();
  return (() => {
    var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.firstChild, _el$7 = _el$5.nextSibling, _el$8 = _el$7.firstChild, _el$9 = _el$7.nextSibling, _el$0 = _el$9.nextSibling, _el$1 = _el$0.firstChild, _el$10 = _el$0.nextSibling, _el$11 = _el$10.firstChild, _el$12 = _el$10.nextSibling, _el$13 = _el$12.nextSibling, _el$14 = _el$13.firstChild, _el$15 = _el$13.nextSibling, _el$16 = _el$15.firstChild, _el$17 = _el$15.nextSibling, _el$18 = _el$17.nextSibling, _el$19 = _el$18.firstChild, _el$20 = _el$18.nextSibling, _el$21 = _el$20.firstChild, _el$22 = _el$20.nextSibling, _el$23 = _el$22.nextSibling, _el$24 = _el$23.firstChild, _el$25 = _el$23.nextSibling, _el$26 = _el$25.firstChild, _el$27 = _el$25.nextSibling, _el$28 = _el$27.nextSibling, _el$29 = _el$28.firstChild, _el$30 = _el$28.nextSibling, _el$31 = _el$30.firstChild, _el$32 = _el$30.nextSibling, _el$33 = _el$32.nextSibling, _el$34 = _el$33.firstChild, _el$35 = _el$33.nextSibling, _el$36 = _el$35.firstChild, _el$37 = _el$35.nextSibling, _el$38 = _el$37.firstChild, _el$39 = _el$38.nextSibling, _el$40 = _el$39.nextSibling, _el$41 = _el$37.nextSibling, _el$42 = _el$41.firstChild, _el$43 = _el$41.nextSibling, _el$44 = _el$43.firstChild, _el$45 = _el$43.nextSibling, _el$46 = _el$45.firstChild, _el$47 = _el$46.nextSibling, _el$48 = _el$47.nextSibling, _el$49 = _el$48.nextSibling, _el$50 = _el$49.nextSibling, _el$51 = _el$50.nextSibling, _el$52 = _el$51.nextSibling, _el$53 = _el$52.nextSibling, _el$54 = _el$53.nextSibling, _el$55 = _el$54.nextSibling, _el$56 = _el$55.nextSibling, _el$57 = _el$56.nextSibling, _el$58 = _el$57.nextSibling, _el$59 = _el$58.nextSibling, _el$60 = _el$45.nextSibling, _el$61 = _el$60.firstChild, _el$62 = _el$60.nextSibling, _el$63 = _el$62.firstChild, _el$64 = _el$62.nextSibling, _el$65 = _el$64.nextSibling, _el$66 = _el$65.nextSibling, _el$67 = _el$66.firstChild, _el$68 = _el$66.nextSibling, _el$69 = _el$68.firstChild, _el$70 = _el$68.nextSibling, _el$71 = _el$70.firstChild, _el$72 = _el$71.firstChild, _el$73 = _el$72.nextSibling, _el$74 = _el$73.nextSibling, _el$75 = _el$74.nextSibling, _el$76 = _el$75.nextSibling, _el$77 = _el$76.nextSibling, _el$78 = _el$77.nextSibling, _el$79 = _el$78.nextSibling, _el$80 = _el$79.nextSibling, _el$81 = _el$80.nextSibling, _el$82 = _el$81.nextSibling, _el$83 = _el$82.nextSibling, _el$84 = _el$83.nextSibling, _el$85 = _el$84.nextSibling, _el$86 = _el$85.nextSibling, _el$87 = _el$86.nextSibling, _el$88 = _el$87.nextSibling, _el$89 = _el$88.nextSibling;
    setAttribute(_el$3, "id", `a-${id}`);
    setAttribute(_el$4, "fill", `url(#a-${id})`);
    setAttribute(_el$6, "id", `b-${id}`);
    setAttribute(_el$7, "id", `c-${id}`);
    setAttribute(_el$8, "filter", `url(#b-${id})`);
    setAttribute(_el$9, "mask", `url(#c-${id})`);
    setAttribute(_el$1, "id", `d-${id}`);
    setAttribute(_el$10, "id", `e-${id}`);
    setAttribute(_el$11, "filter", `url(#d-${id})`);
    setAttribute(_el$12, "mask", `url(#e-${id})`);
    setAttribute(_el$14, "id", `f-${id}`);
    setAttribute(_el$15, "id", `g-${id}`);
    setAttribute(_el$16, "filter", `url(#f-${id})`);
    setAttribute(_el$17, "mask", `url(#g-${id})`);
    setAttribute(_el$19, "id", `h-${id}`);
    setAttribute(_el$20, "id", `i-${id}`);
    setAttribute(_el$21, "filter", `url(#h-${id})`);
    setAttribute(_el$22, "mask", `url(#i-${id})`);
    setAttribute(_el$24, "id", `j-${id}`);
    setAttribute(_el$25, "id", `k-${id}`);
    setAttribute(_el$26, "filter", `url(#j-${id})`);
    setAttribute(_el$27, "mask", `url(#k-${id})`);
    setAttribute(_el$29, "id", `l-${id}`);
    setAttribute(_el$30, "id", `m-${id}`);
    setAttribute(_el$31, "filter", `url(#l-${id})`);
    setAttribute(_el$32, "mask", `url(#m-${id})`);
    setAttribute(_el$34, "id", `n-${id}`);
    setAttribute(_el$35, "id", `o-${id}`);
    setAttribute(_el$36, "filter", `url(#n-${id})`);
    setAttribute(_el$37, "mask", `url(#o-${id})`);
    setAttribute(_el$39, "id", `p-${id}`);
    setAttribute(_el$40, "fill", `url(#p-${id})`);
    setAttribute(_el$42, "id", `q-${id}`);
    setAttribute(_el$43, "id", `r-${id}`);
    setAttribute(_el$44, "filter", `url(#q-${id})`);
    setAttribute(_el$45, "mask", `url(#r-${id})`);
    setAttribute(_el$46, "id", `s-${id}`);
    setAttribute(_el$47, "fill", `url(#s-${id})`);
    setAttribute(_el$48, "id", `t-${id}`);
    setAttribute(_el$49, "fill", `url(#t-${id})`);
    setAttribute(_el$50, "id", `u-${id}`);
    setAttribute(_el$51, "fill", `url(#u-${id})`);
    setAttribute(_el$52, "id", `v-${id}`);
    setAttribute(_el$53, "fill", `url(#v-${id})`);
    setAttribute(_el$54, "id", `w-${id}`);
    setAttribute(_el$55, "fill", `url(#w-${id})`);
    setAttribute(_el$56, "id", `x-${id}`);
    setAttribute(_el$57, "fill", `url(#x-${id})`);
    setAttribute(_el$58, "id", `y-${id}`);
    setAttribute(_el$59, "fill", `url(#y-${id})`);
    setAttribute(_el$61, "id", `z-${id}`);
    setAttribute(_el$62, "id", `A-${id}`);
    setAttribute(_el$63, "filter", `url(#z-${id})`);
    setAttribute(_el$64, "id", `B-${id}`);
    setAttribute(_el$65, "fill", `url(#B-${id})`);
    setAttribute(_el$65, "mask", `url(#A-${id})`);
    setAttribute(_el$67, "id", `C-${id}`);
    setAttribute(_el$68, "id", `D-${id}`);
    setAttribute(_el$69, "filter", `url(#C-${id})`);
    setAttribute(_el$70, "mask", `url(#D-${id})`);
    setAttribute(_el$72, "id", `E-${id}`);
    setAttribute(_el$73, "fill", `url(#E-${id})`);
    setAttribute(_el$74, "id", `F-${id}`);
    setAttribute(_el$75, "stroke", `url(#F-${id})`);
    setAttribute(_el$76, "id", `G-${id}`);
    setAttribute(_el$77, "stroke", `url(#G-${id})`);
    setAttribute(_el$78, "id", `H-${id}`);
    setAttribute(_el$79, "stroke", `url(#H-${id})`);
    setAttribute(_el$80, "id", `I-${id}`);
    setAttribute(_el$81, "stroke", `url(#I-${id})`);
    setAttribute(_el$82, "id", `J-${id}`);
    setAttribute(_el$83, "stroke", `url(#J-${id})`);
    setAttribute(_el$84, "id", `K-${id}`);
    setAttribute(_el$85, "stroke", `url(#K-${id})`);
    setAttribute(_el$86, "id", `L-${id}`);
    setAttribute(_el$87, "stroke", `url(#L-${id})`);
    setAttribute(_el$88, "id", `M-${id}`);
    setAttribute(_el$89, "stroke", `url(#M-${id})`);
    return _el$;
  })();
}

var _tmpl$ = /* @__PURE__ */ template(`<button type=button><div><div></div><div></div></div><div>-</div><div>TanStack Router`);
function FloatingTanStackRouterDevtools({
  initialIsOpen,
  panelProps = {},
  closeButtonProps = {},
  toggleButtonProps = {},
  position = "bottom-left",
  containerElement: Container = "footer",
  router,
  routerState,
  shadowDOMTarget
}) {
  const [rootEl, setRootEl] = createSignal();
  let panelRef = void 0;
  const [isOpen, setIsOpen] = useLocalStorage("tanstackRouterDevtoolsOpen", initialIsOpen);
  const [devtoolsHeight, setDevtoolsHeight] = useLocalStorage("tanstackRouterDevtoolsHeight", null);
  const [isResolvedOpen, setIsResolvedOpen] = createSignal(false);
  const [isResizing, setIsResizing] = createSignal(false);
  const isMounted = useIsMounted();
  const styles = useStyles$1();
  const handleDragStart = (panelElement, startEvent) => {
    if (startEvent.button !== 0) return;
    setIsResizing(true);
    const dragInfo = {
      originalHeight: (panelElement == null ? void 0 : panelElement.getBoundingClientRect().height) ?? 0,
      pageY: startEvent.pageY
    };
    const run = (moveEvent) => {
      const delta = dragInfo.pageY - moveEvent.pageY;
      const newHeight = dragInfo.originalHeight + delta;
      setDevtoolsHeight(newHeight);
      if (newHeight < 70) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    const unsub = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", run);
      document.removeEventListener("mouseUp", unsub);
    };
    document.addEventListener("mousemove", run);
    document.addEventListener("mouseup", unsub);
  };
  isOpen() ?? false;
  createEffect(() => {
    setIsResolvedOpen(isOpen() ?? false);
  });
  createEffect(() => {
    var _a, _b, _c;
    if (isResolvedOpen()) {
      const previousValue = (_b = (_a = rootEl()) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.style.paddingBottom;
      const run = () => {
        var _a2;
        const containerHeight = panelRef.getBoundingClientRect().height;
        if ((_a2 = rootEl()) == null ? void 0 : _a2.parentElement) {
          setRootEl((prev) => {
            if (prev == null ? void 0 : prev.parentElement) {
              prev.parentElement.style.paddingBottom = `${containerHeight}px`;
            }
            return prev;
          });
        }
      };
      run();
      if (typeof window !== "undefined") {
        window.addEventListener("resize", run);
        return () => {
          var _a2;
          window.removeEventListener("resize", run);
          if (((_a2 = rootEl()) == null ? void 0 : _a2.parentElement) && typeof previousValue === "string") {
            setRootEl((prev) => {
              prev.parentElement.style.paddingBottom = previousValue;
              return prev;
            });
          }
        };
      }
    } else {
      if ((_c = rootEl()) == null ? void 0 : _c.parentElement) {
        setRootEl((prev) => {
          if (prev == null ? void 0 : prev.parentElement) {
            prev.parentElement.removeAttribute("style");
          }
          return prev;
        });
      }
    }
    return;
  });
  createEffect(() => {
    if (rootEl()) {
      const el = rootEl();
      const fontSize = getComputedStyle(el).fontSize;
      el == null ? void 0 : el.style.setProperty("--tsrd-font-size", fontSize);
    }
  });
  const {
    style: panelStyle = {},
    ...otherPanelProps
  } = panelProps;
  const {
    style: closeButtonStyle = {},
    onClick: onCloseClick,
    ...otherCloseButtonProps
  } = closeButtonProps;
  const {
    onClick: onToggleClick,
    class: toggleButtonClassName,
    ...otherToggleButtonProps
  } = toggleButtonProps;
  if (!isMounted()) return null;
  const resolvedHeight = createMemo(() => devtoolsHeight() ?? 500);
  const basePanelClass = createMemo(() => {
    return clsx(styles().devtoolsPanelContainer, styles().devtoolsPanelContainerVisibility(!!isOpen()), styles().devtoolsPanelContainerResizing(isResizing), styles().devtoolsPanelContainerAnimation(isResolvedOpen(), resolvedHeight() + 16));
  });
  const basePanelStyle = createMemo(() => {
    return {
      height: `${resolvedHeight()}px`,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      ...panelStyle || {}
    };
  });
  const buttonStyle = createMemo(() => {
    return clsx(styles().mainCloseBtn, styles().mainCloseBtnPosition(position), styles().mainCloseBtnAnimation(!!isOpen()), toggleButtonClassName);
  });
  return createComponent(Dynamic, {
    component: Container,
    ref: setRootEl,
    "class": "TanStackRouterDevtools",
    get children() {
      return [createComponent(DevtoolsOnCloseContext.Provider, {
        value: {
          onCloseClick: onCloseClick ?? (() => {
          })
        },
        get children() {
          return createComponent(BaseTanStackRouterDevtoolsPanel, mergeProps({
            ref(r$) {
              var _ref$ = panelRef;
              typeof _ref$ === "function" ? _ref$(r$) : panelRef = r$;
            }
          }, otherPanelProps, {
            router,
            routerState,
            className: basePanelClass,
            style: basePanelStyle,
            get isOpen() {
              return isResolvedOpen();
            },
            setIsOpen,
            handleDragStart: (e) => handleDragStart(panelRef, e),
            shadowDOMTarget
          }));
        }
      }), (() => {
        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$2.nextSibling, _el$6 = _el$5.nextSibling;
        spread(_el$, mergeProps(otherToggleButtonProps, {
          "aria-label": "Open TanStack Router Devtools",
          "onClick": (e) => {
            setIsOpen(true);
            onToggleClick && onToggleClick(e);
          },
          get ["class"]() {
            return buttonStyle();
          }
        }), false, true);
        insert(_el$3, createComponent(TanStackLogo, {}));
        insert(_el$4, createComponent(TanStackLogo, {}));
        createRenderEffect((_p$) => {
          var _v$ = styles().mainCloseBtnIconContainer, _v$2 = styles().mainCloseBtnIconOuter, _v$3 = styles().mainCloseBtnIconInner, _v$4 = styles().mainCloseBtnDivider, _v$5 = styles().routerLogoCloseButton;
          _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
          _v$2 !== _p$.t && className(_el$3, _p$.t = _v$2);
          _v$3 !== _p$.a && className(_el$4, _p$.a = _v$3);
          _v$4 !== _p$.o && className(_el$5, _p$.o = _v$4);
          _v$5 !== _p$.i && className(_el$6, _p$.i = _v$5);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0
        });
        return _el$;
      })()];
    }
  });
}

export { FloatingTanStackRouterDevtools, FloatingTanStackRouterDevtools as default };
