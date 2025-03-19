import React, { useEffect, useState } from 'react'
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { BiMaleFemale } from "react-icons/bi";
import Axios from '@/config/axios';
import { decryptedData, encryptedData } from '@/utilities/features';
import { Stats } from '@/types/types';
import { CategoryItem, LatestProducts, RecentOrders, WidgetItem } from '@/components/DashboardTable';
import { DoughnutChart, LineChart } from '@/components/Charts';

const dashboard = ({ data }: { data: string }) => {

  const [dashboardStats, setDashboardStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (data) {
      setDashboardStats(decryptedData(data));
    }
  }, [data]);


  return (
    <main className='w-full flex flex-col gap-6 px-4'>
      {/* <div className="bar w-full flex flex-row justify-end items-center gap-4 border-b border-black text-lg p-2">
          <BsSearch />
          <input className='p-1 text-sm w-1/6 border-2 border-gray-300 rounded-lg' type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <Image className="rounded-full flex justify-center items-center" src={`/download.jpeg`} alt="User" width={40} height={40} />

        </div> */}

      <section className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        <WidgetItem
          percent={dashboardStats?.changePercent.revenue!}
          amount={true}
          value={dashboardStats?.count.revenue!}
          heading="Revenue"
          color="rgb(0,115,255)"
        />
        <WidgetItem
          percent={dashboardStats?.changePercent.user!}
          value={dashboardStats?.count.user!}
          heading="Users"
          color="rgb(0 198 202)"
        />
        <WidgetItem
          percent={dashboardStats?.changePercent.order!}
          value={dashboardStats?.count.order!}
          heading="Transactions"
          color="rgb(255 196 0)"
        />
        <WidgetItem
          percent={dashboardStats?.changePercent.product!}
          value={dashboardStats?.count.product!}
          heading="Products"
          color="rgb(76 0 255)"
        />
      </section>

      <section className="w-full">
        {/* {dashboardStats?.chart.revenue && <OrdersChart state={dashboardStats?.chart.revenue} />} */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <h3 className="w-full text-center heading text-gray-800 dark:text-gray-200 text-lg font-semibold mb-4">Revenue Chart</h3>
          {dashboardStats?.chart.revenue &&
            <LineChart
              data={dashboardStats?.chart.revenue}
              label="Revenue"
              backgroundColor="#3b82f6"
              borderColor="#3b82f6"
            />
          }
        </div>


      </section>

      <section className="transaction-container w-full lg:h-[600px] flex flex-col justify-center gap-6 lg:flex-row">
        <div className="gender-chart bg-white dark:bg-slate-800 rounded-lg w-full lg:w-[35%] p-4 relative flex flex-col justify-center items-center gap-3">
          <h2 className='heading text-sm sm:text-xl'>Gender Ratio</h2>

          <div className="chart-container">
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />
          </div>

          <p className='absolute top-[45%] left-[48%]'>
            <BiMaleFemale />
          </p>
        </div>

        <div className='w-full lg:w-[70%] h-full rounded-lg bg-white dark:bg-slate-800'>
          <h3 className="w-full text-center heading text-gray-800 dark:text-gray-200 text-lg font-semibold m-4">Recent Orders</h3>
          <div className='w-full lg:h-[90%] p-3'>
            {dashboardStats?.recentOrder && dashboardStats.recentOrder.length && <RecentOrders data={dashboardStats.recentOrder} />}
          </div>
        </div>
      </section>

      <section className='w-full h-fit flex flex-col lg:flex-row justify-between gap-6'>
        <div className='w-full lg:w-[70%] rounded-lg bg-white dark:bg-slate-800'>
          <h3 className="w-full heading text-gray-800 dark:text-gray-200 text-lg font-semibold m-4">Latest Products</h3>
          <div className='p-4'>
            {Array.isArray(dashboardStats?.latestProducts) && <LatestProducts data={dashboardStats.latestProducts} />}
          </div>
        </div>
        <div className="dashboard-categories bg-white dark:bg-slate-800 rounded-lg w-full flex flex-col items-center gap-3 p-5 xl:w-[30%] xl:h-full">
          <h2 className='heading text-sm sm:text-xl'>Inventory</h2>
          <div className='w-full'>
            {dashboardStats?.categoriesCount && dashboardStats.categoriesCount.map((i) => {
              const [heading, value] = Object.entries(i)[0];
              return (
                <CategoryItem
                  key={heading}
                  heading={heading}
                  value={value}
                  color={`hsl(${value * Math.random()},${value}%,50%)`}
                />
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default dashboard;

export const getServerSideProps = async () => {

  let stats = null;

  try {
    const { data } = await Axios.get('/dashboard/stats');

    if (data) {
      stats = encryptedData(data.stats);
    }

  } catch (error) {
    console.log(error);
  }

  return {
    props: { data: stats }
  };
}
