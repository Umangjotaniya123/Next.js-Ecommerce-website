import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import TableHook from "@/components/TableHook";
import userImage from "../../../public/download.jpeg"
import { Tooltip } from "@heroui/react";
import { GetServerSideProps } from "next";
import Axios from "@/config/axios";
import { decryptedData, encryptedData, responseToast } from "@/utilities/features";
import { User } from "@/types/types";
import { useAuth } from "@/context/AuthContext";

const AdminSidebar = dynamic(() => import('@/components/AdminSidebar'));

const columns = [
  { name: "Avatar", uid: "avatar" },
  { name: "Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Gender", uid: "gender" },
  { name: "Role", uid: "role" },
  { name: "ACTIONS", uid: "action" },
];

type Props = {
  data: string;
}

const Customers = ({ data }: Props) => {

  const [usersData, setUsersData] = useState<User[] | []>([]);
  const { user, getUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setUsersData(decryptedData(data));
  }, [data])

  const users = usersData?.map((user, index: number) => {
    return (
      {
        _id: user._id,
        avatar: (
          <div className="w-full flex justify-center">
            {user.photo ? (
              <Image
                className="rounded-full w-14 h-14"
                src={`${process.env.NEXT_PUBLIC_SERVER}/${user.photo}`}
                alt="avatar"
                width={0}
                height={0}
                sizes="100vw"
              />
            ) : <Image
              className="rounded-full w-14 h-14"
              src={userImage}
              alt="avatar"
              width={0}
              height={0}
              sizes="100vw"
            />}
          </div>
        ),
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: (
          <select
            className="border border-gray-300 bg-white rounded-md p-1 cursor-pointer"
            name="role"
            id="role"
            defaultValue={user.role}
            onChange={(e) => handleChange(e, user._id)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        ),
        action: (
          <button>
            <Tooltip color="danger" content="Delete user" className="font-semibold">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <FaTrash onClick={() => handleDelete(user._id)} />
              </span>
            </Tooltip>
          </button>
        ),
      }
    )
  });

  const handleDelete = async (_id: string) => {
    try {
      const res = await Axios.delete(`/user/${_id}?id=${user?._id}`);

      // if (res.data)
      //   getUser();
      responseToast(res, router, '/admin/customers');

    } catch (error: any) {
      responseToast(error.response)
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>, _id: string) => {
    try {
      const res = await Axios.put(`/user/${_id}?id=${user?._id}`, {
        role: e.target.value,
      });

      responseToast(res, router, '/admin/customers');

    } catch (error: any) {
      responseToast(error.response)
    }
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="w-full flex flex-col items-center max-w-[calc(100% - 360px)] overflow-y-scroll">
        <h1 className="w-[80%] heading text-2xl font-semibold m-4">All Customers</h1>
        <div className="m-8 w-[80%]">
          {users && users.length > 0 && <TableHook columns={columns} items={users} />}
        </div>
      </main>
    </div>
  );
};

export default Customers;

export const getServerSideProps: GetServerSideProps = async (context) => {

  let users = null;

  try {
    const { data } = await Axios.get('/user/all');

    if (data) {
      users = encryptedData(data?.users);
    }
  } catch (error) {
    console.log('Error --- ', error);
  }

  return {
    props: { data: users },
  }
}
