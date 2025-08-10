import { j as jsxRuntimeExports } from './jsx-runtime-Bx4h0SFP.js';
import { a as analytics__mf_v__runtimeInit__mf_v__, b as index_cjs } from './analytics__mf_v__runtimeInit__mf_v__-DbtG7uBC.js';
import { a as createSvgIcon } from './createSvgIcon-Du4kc-bh.js';

// dev uses dynamic import to separate chunks
    
    const {loadShare: loadShare$1} = index_cjs;
    const {initPromise: initPromise$1} = analytics__mf_v__runtimeInit__mf_v__;
    const res$1 = initPromise$1.then(_ => loadShare$1("@tanstack/react-query", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^5.84.2"
    }}}));
    const exportModule$1 = await res$1.then(factory => factory());
    var analytics__loadShare___mf_0_tanstack_mf_1_react_mf_2_query__loadShare__ = exportModule$1;

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = analytics__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("@mui/material", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^5.18.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var analytics__loadShare___mf_0_mui_mf_1_material__loadShare__ = exportModule;

const RevenueIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4"
}), 'AttachMoney');

const PeopleIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"
}), 'People');

const PerformanceIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "m20.38 8.57-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83"
}), 'Speed');

const TrendingUpIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
}), 'TrendingUp');

const fetchMetrics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    totalUsers: 12450,
    revenue: 89600,
    conversionRate: 3.4,
    performanceScore: 94,
    userGrowth: 12.3,
    revenueGrowth: 8.7
  };
};
const MetricsSummary = () => {
  const {
    data: metrics,
    isLoading,
    error
  } = analytics__loadShare___mf_0_tanstack_mf_1_react_mf_2_query__loadShare__.useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Analytics Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { mt: 2 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.LinearProgress, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", sx: { mt: 1 }, children: "Loading metrics..." })
      ] })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Analytics Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { color: "error", children: "Failed to load metrics data" })
    ] }) });
  }
  if (!metrics) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Analytics Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { children: "No metrics data available" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { elevation: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { display: "flex", alignItems: "center", mb: 2 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUpIcon, { color: "primary", sx: { mr: 1 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", children: "Analytics Overview" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { container: true, spacing: 2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PeopleIcon, { color: "primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h4", component: "div", children: metrics.totalUsers.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", color: "text.secondary", children: "Total Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Chip,
          {
            label: `+${metrics.userGrowth}%`,
            color: "success",
            size: "small",
            sx: { mt: 0.5 }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueIcon, { color: "primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h4", component: "div", children: [
          "$",
          metrics.revenue.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", color: "text.secondary", children: "Revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Chip,
          {
            label: `+${metrics.revenueGrowth}%`,
            color: "success",
            size: "small",
            sx: { mt: 0.5 }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h4", component: "div", children: [
          metrics.conversionRate,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", color: "text.secondary", children: "Conversion Rate" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceIcon, { color: "primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h4", component: "div", children: metrics.performanceScore }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", color: "text.secondary", children: "Performance Score" })
      ] }) })
    ] })
  ] }) });
};

const MetricsSummary$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: MetricsSummary
}, Symbol.toStringTag, { value: 'Module' }));

export { MetricsSummary as M, analytics__loadShare___mf_0_mui_mf_1_material__loadShare__ as a, analytics__loadShare___mf_0_tanstack_mf_1_react_mf_2_query__loadShare__ as b, MetricsSummary$1 as c };
