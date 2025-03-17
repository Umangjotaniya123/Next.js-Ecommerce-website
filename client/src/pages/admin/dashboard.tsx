import AdminSidebar from '@/components/AdminSidebar';
import React, { useEffect, useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { BiMaleFemale } from "react-icons/bi";
import Image from 'next/image';
import { DoughnutChart, LineChart } from '@/components/Charts';
import TableHook from '@/components/TableHook';
import Axios from '@/config/axios';
import { decryptedData, encryptedData, monthSequence, SERVER } from '@/utilities/features';
import { OrderItem, Product, Stats } from '@/types/types';
import Link from 'next/link';
import { Tooltip } from '@heroui/react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

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
      <main className='w-full flex flex-col gap-6 max-w-[calc(100% - 360px)] overflow-y-scroll'>
        <div className="bar w-full flex flex-row justify-end items-center gap-4 border-b border-black text-lg p-2">
          <BsSearch />
          <input className='p-1 text-sm w-1/6 border-2 border-gray-300 rounded-lg' type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <Image className="rounded-full flex justify-center items-center" src={`/download.jpeg`} alt="User" width={40} height={40} />

        </div>

        <section className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4 px-8">
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

        <section className="w-full px-8 h-full">
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

        <section className="transaction-container w-full lg:h-[600px] flex flex-col justify-center gap-6 px-8 lg:flex-row">
          <div className="gender-chart bg-white dark:bg-slate-800 rounded-lg w-full lg:w-[30%] p-4 relative flex flex-col justify-center items-center gap-3">
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

          <div className='w-full lg:w-[70%] h-full rounded-lg bg-white dark:bg-slate-800'>
            <h3 className="w-full text-center heading text-gray-800 dark:text-gray-200 text-lg font-semibold m-4">Recent Orders</h3>
            <div className='w-full lg:h-[90%] overflow-y-scroll p-3'>
              {dashboardStats?.recentOrder && dashboardStats.recentOrder.length && <TableHook columns={orderColumns} items={recentOrders(dashboardStats.recentOrder)} />}
            </div>
          </div>
        </section>

        <section className='w-full h-fit flex flex-col lg:flex-row justify-between gap-6 px-8'>
          <div className='w-full lg:w-[70%] bg-white dark:bg-slate-800'>
            <h3 className="w-full heading text-gray-800 dark:text-gray-200 text-lg font-semibold m-4">Latest Products</h3>
            <div className='p-4'>
              {Array.isArray(dashboardStats?.latestProducts) && <TableHook columns={productsColumns} items={latestProducts(dashboardStats?.latestProducts)} />}
            </div>
          </div>
          <div className="dashboard-categories bg-white dark:bg-slate-800 rounded-lg w-full flex flex-col items-center gap-3 p-5 xl:w-[30%] xl:h-full">
            <h2 className='heading text-sm sm:text-xl'>Inventory</h2>
            <div className='overflow-y-auto scrollbar-hide w-full'>
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
  <article className="w-full flex flex-row justify-between items-stretch p-6 rounded-lg bg-white dark:bg-slate-800 shadow-md">
    <div className="widget-info flex flex-col items-start justify-center gap-4">
      <p className='heading text-gray-400 text-medium'>{heading}</p>
      <h4 className='text-lg font-semibold'>{amount ? `₹${value}` : value}</h4>
      {percent > 0 ? (
        <span className="text-green-500 flex flex-row items-center gap-1">
          <HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
        </span>
      ) : (
        <span className="text-red-500 flex flex-row items-center gap-1">
          <HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
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
        {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
        {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
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

const orderColumns = [
  {
    name: "Product",
    uid: "product",
  },
  {
    name: "Price",
    uid: "price"
  },
  {
    name: "Quantity",
    uid: "quantity",
  },
  {
    name: "Total",
    uid: "total",
  },
]

const recentOrders = (data: OrderItem[]) => {
  return data.map((item, index) => {
    return (
      {
        _id: index,
        product: (
          <div className='flex justify-start items-center gap-16 px-4'>
            <Image
              src={item.photo ? `${SERVER}/${item.photo}` : '/images/Image-not-found.png'}
              alt='Product'
              width={0}
              height={0}
              sizes='100vw'
              className='w-16 h-16 rounded-full ml-16 object-contain'
            />
            <Link href={`/admin/products/details?id=${item.productId}`}>
              <span className="text-blue-500 hover:underline">{item.name}</span>
            </Link>
          </div>
        ),
        price: item.price,
        quantity: `x${item.quantity}`,
        total: item.price * item.quantity,
      }
    )
  })
}

const productsColumns = [
  {
    name: "Photo",
    uid: "photo",
  },
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Price",
    uid: "price",
  },
  {
    name: "Discount",
    uid: "discount",
  },
  {
    name: "Stock",
    uid: "stock",
  },
  {
    name: "Action",
    uid: "action",
  },
];

const latestProducts = (data: Product[]) => {
  return data && data.length ? data.map((product) => (
    {
      _id: product._id,
      photo: (
        <Image
          src={product.photos && product.photos.length ? `${SERVER}/${product.photos[0]}` : '/images/Image-not-found.png'}
          alt='Product'
          width={0}
          height={0}
          sizes='100vw'
          className='w-16 h-16 rounded-full ml-16 object-contain'
        />
      ),
      name: (
        <Link href={`/admin/products/details?id=${product._id}`}>
          <span className="text-blue-500 hover:underline">{product.name}</span>
        </Link>
      ),
      price: product.price,
      discount: (
        <span className="text-green-500 font-semibold">
          {product.discount ? `-${product.discount}%` : '0%'}
        </span>
      ),

      stock: product.stock,
      action: (
        <div className="w-full flex gap-6 items-center justify-center">
          <Link href={`/admin/products/details?id=${product._id}`}>
            <Tooltip color="foreground" content='View Product'>
              <span className="cursor-pointer active:opacity-50 bg-foreground-500 py-2 px-4 rounded-3xl text-white font-medium">
                View
              </span>
            </Tooltip>
          </Link >

          {/* <Link href={`/admin/products/${product._id}`}>
            <Tooltip color="foreground" content='Edit Product'>
              <span className="text-xl cursor-pointer active:opacity-50">
                <BiEditAlt />
              </span>
            </Tooltip>
          </Link>

          <Tooltip color="danger" content='Delete Product'>
            <span className="text-lg text-danger-500 cursor-pointer active:opacity-50" onClick={() => handleDelete(product._id)}>
              <FaTrash />
            </span>
          </Tooltip> */}

        </div>
      )
    }
  )) : [];
}

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
