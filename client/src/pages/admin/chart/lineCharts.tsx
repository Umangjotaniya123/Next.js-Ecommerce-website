import dynamic from "next/dynamic";
import { LineChart } from "@/components/Charts";

const AdminSidebar = dynamic(() => import('@/components/AdminSidebar'));

const LineCharts = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container w-full bg-white py-8 px-6 overflow-y-auto flex flex-col items-center">
        <h1 className="heading p-6 text-center text-small md:text-lg xl:text-2xl">Line Charts</h1>
        <section className="my-4 p-3 md:p-12 rounded-lg w-full md:w-[80%] shadow-lg">
          <LineChart
            data={[
              200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
            ]}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgba(53, 162, 255,0.5)"
          />
          <h2 className="heading text-center text-sm md:text-lg md:mt-8 xl:text-xl">Active Users</h2>
        </section>
        <section className="my-4 p-3 md:p-12 rounded-lg w-full md:w-[80%] shadow-lg">
          <LineChart
            data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            label="Products"
          />
          <h2 className="heading text-center text-sm md:text-lg md:mt-8 xl:text-xl">Total Products (SKU)</h2>
        </section>

        <section className="my-4 p-3 md:p-12 rounded-lg w-full md:w-[80%] shadow-lg">
          <LineChart
            data={[
              24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
              144400, 100000, 120000,
            ]}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
          />
          <h2 className="heading text-center text-sm md:text-lg md:mt-8 xl:text-xl">Total Revenue</h2>
        </section>

        <section className="my-4 p-3 md:p-12 rounded-lg w-full md:w-[80%] shadow-lg">
          <LineChart
            data={[
              9000, 12000, 11000, 9000, 1000, 5000, 4000, 1200, 1100, 1500,
              2000, 5000,
            ]}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
          />
          <h2 className="heading text-center text-sm md:text-lg md:mt-8 xl:text-xl">Discount Allotted</h2>
        </section>
      </main>
    </div>
  );
};

export default LineCharts;
