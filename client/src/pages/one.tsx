import { LineChart, Line, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import { useState } from "react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Sales",
      value: "34,945",
      percentage: "1.56%",
      icon: "🛍️",
      color: "bg-green-500",
      trend: "up",
      chartColor: "#22c55e",
      fillColor: "rgba(34, 197, 94, 0.2)", // Light green for fill
      data: [
        { value: 50 },
        { value: 7 },
        { value: 65 },
        { value: 900 },
        { value: 8 },
        { value: 100 },
      ],
    },
    {
      title: "Total Income",
      value: "$37,802",
      percentage: "1.56%",
      icon: "💰",
      color: "bg-orange-500",
      trend: "down",
      chartColor: "#f97316",
      fillColor: "rgba(249, 115, 22, 0.2)", // Light orange for fill
      data: [
        { value: 40 },
        { value: 600 },
        { value: 55 },
        { value: 825 },
        { value: 75 },
        { value: 905 },
      ],
    },
    {
      title: "Orders Paid",
      value: "34,945",
      percentage: "0.00%",
      icon: "📄",
      color: "bg-gray-500",
      trend: "neutral",
      chartColor: "#9ca3af",
      fillColor: "rgba(156, 163, 175, 0.2)", // Light gray for fill
      data: [
        { value: 30 },
        { value: 50 },
        { value: 459 },
        { value: 0 },
        { value: 605 },
        { value: 85 },
      ],
    },
    {
      title: "Total Visitors",
      value: "34,945",
      percentage: "1.56%",
      icon: "👥",
      color: "bg-blue-500",
      trend: "up",
      chartColor: "#3b82f6",
      fillColor: "rgba(59, 130, 246, 0.2)", // Light blue for fill
      data: [
        { value: 60 },
        { value: 8 },
        { value: 75 },
        { value: 100 },
        { value: 90 },
        { value: 110 },
      ],
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 min-h-screen">
        {stats.map((stat, index) => (
          <Card key={index} stat={stat} />
        ))}
      </div>
      <OrdersChart />
      <StackedAreaChart />
    </>
  );
}

const Card = ({ stat }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`p-3 ${stat.color} text-white rounded-lg`}>
            {stat.icon}
          </span>
          <h3 className="text-gray-700">{stat.title}</h3>
        </div>
        <span className="text-xl text-black">{stat.value}</span>
      </div>

      {/* Chart with Colored Fill */}
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={stat.data}>
            <defs>
              <linearGradient id={`color${stat.chartColor}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={stat.chartColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={stat.fillColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "6px",
                color: "#fff",
                padding: "5px",
              }}
              cursor={{ stroke: stat.chartColor, strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={stat.chartColor}
              strokeWidth={3}
              fill={`url(#color${stat.chartColor})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Section */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-400">Trend:</span>
        <span
          className={`${stat.trend === "up"
              ? "text-green-400"
              : stat.trend === "down"
                ? "text-red-400"
                : "text-gray-400"
            }`}
        >
          {stat.trend === "up" ? "📈" : stat.trend === "down" ? "📉" : "➖"}{" "}
          {stat.percentage}
        </span>
      </div>
    </div>
  );
};

const data = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 40 },
  { month: "Apr", value: 70 },
  { month: "May", value: 49 },
  { month: "Jun", value: 65 },
  { month: "Jul", value: 55 },
  { month: "Aug", value: 75 },
  { month: "Sep", value: 80 },
  { month: "Oct", value: 68 },
  { month: "Nov", value: 72 },
  { month: "Dec", value: 35 },
];

export function OrdersChart() {
  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-gray-300 text-lg font-semibold mb-4">Recent Order</h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
          {/* Gradient for the Fill Color */}
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* X-Axis (Months) */}
          <XAxis dataKey="month" stroke="#9ca3af" />

          {/* Y-Axis (Values) */}
          <YAxis stroke="#9ca3af" />

          {/* Tooltip on Hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "6px",
              color: "#fff",
              padding: "5px",
              border: "none",
            }}
            cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
          />

          {/* Line with Gradient Fill */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorBlue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const datas = [
  { month: "Jan", website: 500, ecommerce: 30, store: 20 },
  { month: "Feb", website: 60, ecommerce: 35, store: 25 },
  { month: "Mar", website: 55, ecommerce: 405, store: 30 },
  { month: "Apr", website: 45, ecommerce: 322, store: 22 },
  { month: "May", website: 42, ecommerce: 34, store: 24 },
  { month: "Jun", website: 90, ecommerce: 38, store: 28 },
  { month: "Jul", website: 750, ecommerce: 30, store: 18 },
  { month: "Aug", website: 80, ecommerce: 35, store: 22 },
  { month: "Sep", website: 10, ecommerce: 302, store: 500 },
  { month: "Oct", website: 85, ecommerce: 40, store: 30 },
  { month: "Nov", website: 95, ecommerce: 42, store: 35 },
  { month: "Dec", website: 100, ecommerce: 45, store: 8 },
];

export function StackedAreaChart() {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-300">Earnings</h3>
      </div>

      {/* Revenue Data */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-300">
          <span className="text-sm text-blue-400">● Website</span>
          <h3 className="text-2xl font-bold">$37,802</h3>
          <span className="text-green-400 text-xs">▲ 0.56%</span>
        </div>
        <div className="text-gray-300">
          <span className="text-sm text-orange-400">● E-commerce</span>
          <h3 className="text-2xl font-bold">$28,305</h3>
          <span className="text-green-400 text-xs">▲ 0.56%</span>
        </div>
        <div className="text-gray-300">
          <span className="text-sm text-purple-400">● Store</span>
          <h3 className="text-2xl font-bold">$28,305</h3>
          <span className="text-green-400 text-xs">▲ 0.56%</span>
        </div>
      </div>

      {/* Stacked Area Chart */}
      <ResponsiveContainer width="100%" height={850}>
        <AreaChart data={datas}>
          <XAxis dataKey="month" tick={{ fill: "#9CA3AF" }} />
          <YAxis tick={{ fill: "#9CA3AF" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "#E5E7EB" }}
            labelStyle={{ color: "#93C5FD" }}
            cursor={{ stroke: "white", strokeWidth: 1 }}
          />
          <Area type="monotone" dataKey="website" stackId="1" stroke="#6366F1" fill="#fefefe" fillOpacity={0.4} />
          <Area type="monotone" dataKey="ecommerce" stackId="1" stroke="#F97316" fill="#F97316" fillOpacity={0.4} />
          <Area type="monotone" dataKey="store" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

