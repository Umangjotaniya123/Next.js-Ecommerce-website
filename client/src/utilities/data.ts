import {
    FaBlender,
    FaBook,
    FaBox,
    FaChartBar,
    FaChartLine,
    FaChartPie,
    FaClock,
    FaCouch,
    FaGamepad,
    FaHome,
    FaLaptop,
    FaMobileAlt,
    FaPaintBrush,
    FaSearch,
    FaShippingFast,
    FaShoePrints,
    FaShoppingBag,
    FaStopwatch,
    FaTools,
    FaTshirt,
    FaUserEdit,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText, AiFillProduct } from "react-icons/ai";
import {
    RiBillFill,
    RiCoupon3Fill,
    RiDashboardFill,
    RiHeartLine,
    RiHome5Fill,
    RiShoppingBag3Fill,
} from "react-icons/ri";
import { MdCategory } from "react-icons/md";

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
    Management: [
        {
            url: "/admin/manage/category",
            text: "Categories",
            Icon: MdCategory,
        }, {
            url: "/admin/manage/coupon",
            text: "Coupon",
            Icon: RiCoupon3Fill,
        }
    ],

}

export const navbarData = {
    nav: [
        {
            name: 'Home',
            url: '/',
            Icon: RiHome5Fill
        },
        {
            name: 'Our Products',
            url: '/search',
            Icon: AiFillProduct
        },
        {
            name: 'Wishlist',
            url: '/wishlist',
            Icon: RiHeartLine
        },
        {
            name: 'Shipping Info',
            url: '/shipping',
            Icon: FaShippingFast
        },
    ],
    dialoag: [
        {
            name: 'Dashboard',
            url: '/admin/dashboard',
            Icon: RiDashboardFill
        },
        {
            name: 'Profile',
            url: '/profile',
            Icon: FaUserEdit
        },
        {
            name: 'My Orders',
            url: '/order',
            Icon: RiBillFill
        }
    ]
}

export const categoriesWithIcons = [
    { name: "Clothing", icon: FaTshirt  },
    { name: "Footwear", icon: FaShoePrints },
    { name: "Mobile Phones", icon: FaMobileAlt },
    { name: "Laptops", icon: FaLaptop },
    { name: "Smartwatches", icon: FaClock },
    { name: "Furniture", icon: FaCouch },
    { name: "Home Decor", icon: FaHome },
    { name: "Kitchen Appliances", icon: FaBlender },
    { name: "Toys", icon: FaGamepad },
    { name: "Packaged Food", icon: FaBox },
    { name: "E-books", icon: FaBook },
    { name: "Makeup", icon: FaPaintBrush },
    { name: "Accessories", icon: FaShoppingBag },
    { name: "Hardware Tools", icon: FaTools }
];

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];