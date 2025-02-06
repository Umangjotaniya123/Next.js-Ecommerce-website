module.exports = {

"[project]/public/temp.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "sideBarData": (()=>sideBarData)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/ri/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/io/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/ai/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa/index.mjs [ssr] (ecmascript)");
;
;
;
;
const sideBarData = {
    dashboard: [
        {
            url: "/admin/dashboard",
            text: "Dashboard",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["RiDashboardFill"]
        },
        {
            url: "/admin/products",
            text: "Product",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["RiShoppingBag3Fill"]
        },
        {
            url: "/admin/customers",
            text: "Customer",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["IoIosPeople"]
        },
        {
            url: "/admin/orders",
            text: "Order",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ai$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["AiFillFileText"]
        }
    ],
    Charts: [
        {
            url: "/admin/chart/barCharts",
            text: "Bar",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaChartBar"]
        },
        {
            url: "/admin/chart/pieCharts",
            text: "Pie",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaChartPie"]
        },
        {
            url: "/admin/chart/lineCharts",
            text: "Line",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaChartLine"]
        }
    ],
    Apps: [
        {
            url: "/admin/app/stopwatch",
            text: "Stopwatch",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaStopwatch"]
        },
        {
            url: "/admin/app/coupon",
            text: "Coupon",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$ri$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["RiCoupon3Fill"]
        },
        {
            url: "/admin/app/toss",
            text: "Toss",
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaGamepad"]
        }
    ]
};
}}),
"[project]/src/components/AdminSidebar.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_import__("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_import__("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$temp$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/temp.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/hi/index.mjs [ssr] (ecmascript)");
;
;
;
;
;
;
const AdminSidebar = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // console.log(router);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [phoneActive, setPhoneActive] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Define the resize handler
        const resizeHandler = ()=>{
            setPhoneActive(window.innerWidth < 1200);
        };
        // Set the initial state on the client side
        resizeHandler();
        // Add the event listener
        window.addEventListener("resize", resizeHandler);
        // Clean up the event listener on component unmount
        return ()=>{
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!phoneActive) setShowModal(true);
        else setShowModal(false);
    }, [
        phoneActive
    ]);
    const DataDiv = ({ data: [name, value], router })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "w-[85%]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h5", {
                    className: "heading opacity-50 my-3",
                    children: name
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminSidebar.tsx",
                    lineNumber: 63,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                    className: "flex flex-col justify-center items-center gap-2 w-full",
                    children: value.map((i, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Li, {
                            data: i,
                            router: router
                        }, index, false, {
                            fileName: "[project]/src/components/AdminSidebar.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/AdminSidebar.tsx",
                    lineNumber: 64,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AdminSidebar.tsx",
            lineNumber: 62,
            columnNumber: 5
        }, this);
    const Li = ({ data: { url, text, Icon }, router })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
            className: "px-4 py-2 rounded-md w-full",
            style: {
                backgroundColor: router.pathname.includes(url) ? "rgba(0,115,255,0.1)" : "white"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "flex flex-row justify-start items-center gap-4",
                href: url,
                style: {
                    color: router.pathname.includes(url) ? "rgb(0,115,255)" : "black"
                },
                onClick: ()=>setShowModal(phoneActive ? false : true),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {}, void 0, false, {
                            fileName: "[project]/src/components/AdminSidebar.tsx",
                            lineNumber: 89,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminSidebar.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminSidebar.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminSidebar.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/AdminSidebar.tsx",
            lineNumber: 73,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            phoneActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                className: "text-xl fixed p-4",
                id: "hamburger",
                onClick: ()=>setShowModal(true),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["HiMenuAlt4"], {}, void 0, false, {
                    fileName: "[project]/src/components/AdminSidebar.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AdminSidebar.tsx",
                lineNumber: 98,
                columnNumber: 23
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                className: `${phoneActive ? 'absolute transition-all duration-600 w-[90%] max-w-[360px] z-20 h-[calc(100vh-5rem)]' : 'w-[360px]'} rounded-lg flex flex-col items-center gap-2 bg-green-200`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "heading m-4 flex justify-center items-center",
                        children: "LOGO"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminSidebar.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$public$2f$temp$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["sideBarData"]).map((data, index)=>{
                        // console.log(data)
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(DataDiv, {
                            data: data,
                            router: router
                        }, index, false, {
                            fileName: "[project]/src/components/AdminSidebar.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this);
                    }),
                    phoneActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        className: "bg-red-500 rounded-md my-3 px-8 py-1",
                        id: "close-sidebar",
                        onClick: ()=>setShowModal(false),
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminSidebar.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminSidebar.tsx",
                lineNumber: 102,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = AdminSidebar;
}}),

};

//# sourceMappingURL=_78701a._.js.map