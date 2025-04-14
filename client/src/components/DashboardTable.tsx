import { OrderItem, Product } from "@/types/types"
import { SERVER } from "@/utilities/features"
import Image from "next/image"
import Link from "next/link"
import TableHook from "./TableHook"
import { Tooltip } from "@heroui/react"
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi"
import { useRouter } from "next/router"

const orderColumns = [
    {
        name: "Photo",
        uid: 'photo',
    },
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

export const RecentOrders = ({ data }: { data: OrderItem[] }) => {

    const router = useRouter();


    const orders = data.map((item, index) => {
        const URL = router.pathname.includes('/admin') ?
            `/admin/products/details?id=${item.productId}` :
            `/product/${item.productId}`;
        return (
            {
                _id: index,
                photo: (
                    <div className="w-full flex justify-center">
                        <Image
                            src={item.photo ? `${SERVER}/${item.photo}` : '/images/Image-not-found.png'}
                            alt='Product'
                            width={70}
                            height={60}
                            className='rounded-full object-contain'
                        />
                    </div>
                ),
                product: (
                    <Link href={URL}>
                        <span className="text-blue-500 hover:underline">{item.name}</span>
                    </Link>
                ),
                price: item.price,
                quantity: `x${item.quantity}`,
                total: item.price * item.quantity,
            }
        )
    });

    return <TableHook columns={orderColumns} items={orders} />

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

export const LatestProducts = ({ data }: { data: Product[] }) => {
    const products = data && data.length ? data.map((product) => (
        {
            _id: product._id,
            photo: (
                <div className="w-full flex justify-center">
                    <Image
                        src={product.photos && product.photos.length ? `${SERVER}/${product.photos[0]}` : '/images/Image-not-found.png'}
                        alt='Product'
                        width={70}
                        height={60}
                        className='rounded-full object-contain'
                    />
                </div>
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

    return <TableHook columns={productsColumns} items={products} />
}


interface WidgetItemProps {
    heading: string;
    value: number;
    percent: number;
    color: string;
    amount?: boolean;
}

export const WidgetItem = ({
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
                {percent >= 0 && `${percent > 10000 ? 9999 : percent}%`}
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

export const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
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
