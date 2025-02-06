import dynamic from "next/dynamic";
import React from "react";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import TableHook from "@/components/TableHook";
import userImage from "../../../public/download.jpeg"
import { Tooltip } from "@heroui/react";

const AdminSidebar = dynamic(() => import('@/components/AdminSidebar'));

// Column<DataType>[]
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

const usersData = [
  {
    "_id": "677bcb2b119252e3a77cc29b",
    "name": "Umang Jotaniya",
    "email": "umang@gmail.com",
    "role": "admin",
    "gender": "male",
    "dob": "2005-02-15T00:00:00.000Z",
    "addressInfo": [
      {
        "address": "Madhuram, Udaybagar-1, st-15, mavadi chokadi",
        "city": "Rajkot",
        "state": "Gujarat",
        "country": "India",
        "pincode": 360000,
        "addType": "Home",
        "_id": "677e4b698a5f014ef1195ad5"
      },
      {
        "address": "KamleshPark",
        "city": "Nadiad",
        "state": "Gujarat",
        "country": "India",
        "pincode": 387005,
        "addType": "Work",
        "_id": "677e4c3c8a5f014ef1195ade"
      }
    ],
    "createdAt": "2025-01-06T12:23:07.008Z",
    "updatedAt": "2025-01-21T06:11:58.389Z",
    "__v": 30,
    "photo": "uploads/05f9cfce37e05b7b66d13d000.jpeg"
  },
  {
    "_id": "678a52e27f9bfc759701c4f3",
    "name": "Test 1",
    "email": "t@gmail.com",
    "role": "user",
    "gender": "female",
    "dob": "2007-01-01T00:00:00.000Z",
    "addressInfo": [],
    "createdAt": "2024-04-17T12:53:54.663Z",
    "updatedAt": "2025-01-21T05:26:43.203Z",
    "__v": 0
  }
]

const Customers = ({ data }: Props) => {

  // const usersData: User[] = decryptData(data);

  // const router = useRouter();
  // const [deleteUser] = useDeleteUserMutation();
  // console.log(data);

  const users = usersData?.map((user, index: number) => {
    return (
      {
        _id: user._id,
        avatar: user.photo ? (
          <Image
            style={{
              borderRadius: '50%',
            }}
            src={`/${user.photo}`}
            alt="avatar"
            width={50}
            height={50}
          />
        ) : <Image
          style={{
            borderRadius: '50%',
          }}
          src={userImage}
          alt="avatar"
          width={40}
          height={40}
        />,
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        action: (
          <button>
            <Tooltip color="danger" content="Delete user">
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
    // console.log(_id);

    // try {
    //   const res = await deleteUser({ userId: _id });

    //   responseToast(res);
    //   if (res.data) {
    //     router.push('/admin/customers');
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="bg-slate-100 w-full flex justify-center max-w-[calc(100% - 360px)] overflow-y-scroll ">
        <div className="m-16 w-[60%]">
          <TableHook columns={columns} items={users} />
        </div>
      </main>
    </div>
  );
};

export default Customers;
