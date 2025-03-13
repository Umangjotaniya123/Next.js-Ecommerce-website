import AdminSidebar from '@/components/AdminSidebar';
import React, { useEffect, useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { BiMaleFemale } from "react-icons/bi";
import Image from 'next/image';
import { BarChart, DoughnutChart } from '@/components/Charts';
import data from '../../../public/data.json';
import TableHook from '@/components/TableHook';
import { OrdersChart } from '../one';
import Axios from '@/config/axios';
import { decryptedData, encryptedData } from '@/utilities/features';
import { Stats } from '@/types/types';

const columns = [
  {
    name: "User",
    uid: "user",
  },
  {
    name: "Products",
    uid: "products"
  },
  {
    name: "Amount",
    uid: "amount",
  },
  {
    name: "Action",
    uid: "action",
  },
];

const dashboard = ({ data }: { data: string }) => {

  const [dashboardStats, setDashboardStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (data) {
      setDashboardStats(decryptedData(data));
    }
  }, [data]);


  return (
    <div className='admin-container'>
      <AdminSidebar />
      <main className='w-full flex flex-col gap-4 max-w-[calc(100% - 360px)] overflow-y-scroll'>
        <div className="bar w-full flex flex-row justify-end items-center gap-4 border-b border-black text-lg p-2">
          <BsSearch />
          <input className='p-1 text-sm w-1/6 border-2 border-gray-300 rounded-lg' type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <Image className="rounded-full flex justify-center items-center" src={`/download.jpeg`} alt="User" width={40} height={40} />

        </div>

        <section className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 px-8">
          <WidgetItem
            percent={40}
            amount={true}
            value={340000}
            heading="Revenue"
            color="rgb(0,115,255)"
          />
          <WidgetItem
            percent={-14}
            value={400}
            heading="Users"
            color="rgb(0 198 202)"
          />
          <WidgetItem
            percent={80}
            value={23000}
            heading="Transactions"
            color="rgb(255 196 0)"
          />
          <WidgetItem
            percent={30}
            value={1000}
            heading="Products"
            color="rgb(76 0 255)"
          />
        </section>

        <section className="w-full px-8">
          {dashboardStats?.chart.revenue && <OrdersChart state={dashboardStats?.chart.revenue} />}

          {/* <div className="dashboard-categories bg-white rounded-lg w-full max-w-80 flex flex-col items-center justify-center gap-3 p-5 xl:w-1/5 xl:h-full">
            <h2 className='heading text-sm sm:text-xl'>Inventory</h2>
            <div className='overflow-y-auto scrollbar-hide w-full'>
              {data.categories.map((i) => (
                <CategoryItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value * 4},${i.value}%,50%)`}
                />
              ))}
            </div>
          </div> */}
        </section>

        <section className="transaction-container flex flex-col items-center justify-center gap-3 p-4 sm:flex-row">
          <div className="gender-chart bg-white rounded-lg w-full max-w-80 p-4 relative flex flex-col justify-center items-center gap-3">
            <h2 className='heading text-sm sm:text-xl'>Gender Ratio</h2>

            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />

            <p className='absolute top-[45%] left-[48%]'>
              <BiMaleFemale />
            </p>
          </div>

          <TableHook items={data.transaction} columns={columns} />
        </section>
      </main>
    </div>
  )
}

export default dashboard;

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="w-full flex flex-row justify-between items-stretch p-6 rounded-lg bg-white shadow-md">
    <div className="widget-info flex flex-col items-start justify-center gap-4">
      <p className='heading text-gray-400 text-medium'>{heading}</p>
      <h4 className='text-lg font-semibold'>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="text-green-500 flex flex-row items-center gap-1">
          <HiTrendingUp /> +{percent}%{" "}
        </span>
      ) : (
        <span className="text-red-500 flex flex-row items-center gap-1">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>

    <div
      className="relative w-20 h-20 rounded-full flex-none grid place-items-center z-0 bg-aquamarine before:content-[''] before:absolute before:w-16 before:h-16 before:bg-white before:rounded-full"
      style={{
        backgroundColor: 'aquamarine',
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span className='relative'
        style={{
          color,
        }}
      >
        {percent}%
      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="w-full flex flex-row items-center justify-between gap-3 my-3">
    <h5 className='tracking-wider font-light w-1/5'>{heading}</h5>
    <div className='w-2/5 h-2 mx-2 bg-gray-300 rounded-full flex-none'>
      <div
        className='h-full bg-blue-500 rounded-full'
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span className='text-small w-1/5 font-medium'>{value}%</span>
  </div>
);

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
