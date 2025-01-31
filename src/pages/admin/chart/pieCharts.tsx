import { DoughnutChart, PieChart } from "@/components/Charts";
import dynamic from "next/dynamic";
import { categories } from "../../../../public/data.json";

const AdminSidebar = dynamic(() => import('@/components/AdminSidebar'));

const PieCharts = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container w-full bg-white py-8 px-6 overflow-y-auto flex flex-col items-center gap-5">
        <h1 className="heading p-6 text-center text-small md:text-lg xl:text-2xl">Pie & Doughnut Charts</h1>
        <div className="grid grod-col-1 items-center justify-center md:grid-cols-2 md:gap-x-80 md:gap-y-32">
          <section className="w-full max-w-64 md:max-w-80">
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 9, 13]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
            <h2 className="heading text-center text-xs md:text-lg">Order Fulfillment Ratio</h2>
          </section>

          <section className="w-full max-w-64 md:max-w-80">
            <DoughnutChart
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
              backgroundColor={categories.map(
                (i) => `hsl(${i.value * 4},${i.value}%, 50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
            <h2 className="heading text-center text-xs md:text-lg">Product Categories Ratio</h2>
          </section>

          <section className="w-full max-w-64 md:max-w-80">
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[40, 20]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
            <h2 className="heading text-center text-xs md:text-lg">Stock Availability</h2>
          </section>

          <section className="w-full max-w-64 md:max-w-80">
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 18, 5, 20, 25]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
            <h2 className="heading text-center text-xs md:text-lg">Revenue Distribution</h2>
          </section>

          <section className="w-full max-w-64 md:max-w-80">
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[30, 250, 70]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
            <h2 className="heading text-center text-xs md:text-lg">Users Age Group</h2>
          </section>

          <section className="w-full max-w-80">
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[40, 250]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default PieCharts;
