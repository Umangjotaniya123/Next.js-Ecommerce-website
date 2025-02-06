import {
    FaChartBar,
    FaChartLine,
    FaChartPie,
    FaGamepad,
    FaStopwatch,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import {
    RiCoupon3Fill,
    RiDashboardFill,
    RiShoppingBag3Fill,
} from "react-icons/ri";

export const sideBarData = {
    dashboard: [
        {
            url: "/admin/dashboard",
            text: "Dashboard",
            Icon: RiDashboardFill,
        }, {
            url: "/admin/products",
            text: "Product",
            Icon: RiShoppingBag3Fill,
        }, {
            url: "/admin/customers",
            text: "Customer",
            Icon: IoIosPeople,
        }, {
            url: "/admin/orders",
            text: "Order",
            Icon: AiFillFileText,
        },
    ],
    Charts: [
        {
            url: "/admin/chart/barCharts",
            text: "Bar",
            Icon: FaChartBar,
        }, {
            url: "/admin/chart/pieCharts",
            text: "Pie",
            Icon: FaChartPie,
        }, {
            url: "/admin/chart/lineCharts",
            text: "Line",
            Icon: FaChartLine,
        }
    ],
    Apps: [
        {
            url: "/admin/app/stopwatch",
            text: "Stopwatch",
            Icon: FaStopwatch,
        }, {
            url: "/admin/app/coupon",
            text: "Coupon",
            Icon: RiCoupon3Fill,
        }, {
            url: "/admin/app/toss",
            text: "Toss",
            Icon: FaGamepad,
        }
    ],

}