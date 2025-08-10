import { j as jsxRuntimeExports } from './jsx-runtime-Bx4h0SFP.js';
import { R as React } from './analytics__loadShare__react__loadShare__-DF7DD1yK.js';
import { a as analytics__loadShare___mf_0_mui_mf_1_material__loadShare__, M as MetricsSummary } from './MetricsSummary-C3ZkKAf2.js';
import { a as createSvgIcon } from './createSvgIcon-Du4kc-bh.js';
import './_commonjsHelpers-Dj2_voLF.js';
import './analytics__mf_v__runtimeInit__mf_v__-DbtG7uBC.js';
import './emotion-serialize.esm-DpD3M_lx.js';
import './analytics__loadShare___mf_0_emotion_mf_1_react__loadShare__-oxwLZa1Q.js';
import './emotion-cache.browser.esm-BasAJTkK.js';

const BarChartIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"
}), 'BarChart');

const PieChartIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10m2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99m0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99z"
}), 'PieChart');

const TimelineIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2"
}), 'Timeline');

function TabPanel(props) {
  const { children, value, index } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "tabpanel",
      hidden: value !== index,
      id: `analytics-tabpanel-${index}`,
      "aria-labelledby": `analytics-tab-${index}`,
      children: value === index && /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { p: 3 }, children })
    }
  );
}
const AnalyticsPage = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Container, { maxWidth: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { mb: 4 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h3", component: "h1", gutterBottom: true, children: "Analytics Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", color: "text.secondary", children: "Comprehensive insights and metrics for your business" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { container: true, spacing: 3, sx: { mb: 4 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 12, md: 8, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MetricsSummary, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 12, md: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Quick Actions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", color: "text.secondary", children: "Export reports, configure alerts, and manage dashboards" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Paper, { sx: { width: "100%" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Box, { sx: { borderBottom: 1, borderColor: "divider" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Tabs, { value: tabValue, onChange: handleTabChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Tab,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChartIcon, {}),
            label: "Overview",
            id: "analytics-tab-0",
            "aria-controls": "analytics-tabpanel-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Tab,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChartIcon, {}),
            label: "Demographics",
            id: "analytics-tab-1",
            "aria-controls": "analytics-tabpanel-1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Tab,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineIcon, {}),
            label: "Trends",
            id: "analytics-tab-2",
            "aria-controls": "analytics-tabpanel-2"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabPanel, { value: tabValue, index: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { container: true, spacing: 3, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 12, md: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Traffic Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", children: "Monthly traffic patterns and user engagement metrics" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 12, md: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Conversion Funnel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", children: "User journey and conversion optimization insights" })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabPanel, { value: tabValue, index: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { container: true, spacing: 3, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 12, md: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Age Distribution" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", children: "User age demographics and preferences" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 12, md: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Geographic Distribution" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", children: "Global user distribution and regional insights" })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabPanel, { value: tabValue, index: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { container: true, spacing: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "h6", gutterBottom: true, children: "Performance Trends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(analytics__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { variant: "body2", children: "Historical performance data and predictive analytics" })
      ] }) }) }) }) })
    ] })
  ] });
};

export { AnalyticsPage as default };
