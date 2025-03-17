import dynamic from "next/dynamic";
import { BarChart } from "@/components/Charts";
import { months } from "@/utilities/data";

const AdminSidebar = dynamic(() => import('@/components/AdminSidebar'));

const BarCharts = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container w-full py-8 px-6 overflow-y-auto flex flex-col items-center ">
        <h1 className="heading p-6 text-center text-small md:text-lg xl:text-2xl">Bar Charts</h1>
        <section className="my-4 p-12 bg-white dark:bg-slate-800 rounded-lg w-full md:w-[80%] shadow-lg">
          <BarChart
            data_1={[200, 444, 343, 556, 778, 455, 990]}
            data_2={[300, 144, 433, 655, 237, 755, 190]}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260,50%,30%)`}
            bgColor_2={`hsl(360,90%,90%)`}
          />
          <h2 className="heading my-6 text-center text-sm md:text-lg xl:text-xl">Top Selling Products & Top Customers</h2>
        </section>
        <section className="my-4 p-12 bg-white dark:bg-slate-800 rounded-lg w-full md:w-[80%] shadow-lg">
          <BarChart
            horizontal={true}
            data_1={[
              200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909,
            ]}
            data_2={[]}
            title_1="Products"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={months}
          />
          <h2 className="heading my-6 text-center text-sm md:text-lg xl:text-xl">Orders throughout the year</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;