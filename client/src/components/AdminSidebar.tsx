import { sideBarData } from "@/utilities/data";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { HiMenuAlt4 } from "react-icons/hi";

type dataProps = {
  data: [name: string, value: {
    url: string;
    text: string;
    Icon: IconType;
  }[]],
  router: any
}


interface LiProps {
  data: {
    url: string;
    text: string;
    Icon: IconType;
  }
  router: any;
}

const AdminSidebar = () => {
  const router = useRouter();
  // console.log(router);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(false);

  useEffect(() => {
    // Define the resize handler
    const resizeHandler = () => {
      setPhoneActive(window.innerWidth < 1200);
    };

    // Set the initial state on the client side
    resizeHandler();

    // Add the event listener
    window.addEventListener("resize", resizeHandler);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (!phoneActive)
      setShowModal(true);
    else
      setShowModal(false);
  }, [phoneActive])

  const DataDiv = ({ data: [name, value], router }: dataProps) => (
    <div className="w-[85%] py-3">
      <h5 className="heading text-white opacity-50 py-3">{name}</h5>
      <ul className="flex flex-col justify-center items-center gap-2 w-full">
        {value.map((i, index) => (
          <Li data={i} router={router} key={index} />
        ))}
      </ul>
    </div>
  );

  const Li = ({ data: { url, text, Icon }, router }: LiProps) => (
    <li
      className={`rounded-md w-full ${router.pathname.includes(url) ? 'bg-orange-200 dark:bg-white dark:text-black': 'bg-orange-50 dark:bg-slate-700'}`}
    >
      <Link
        className="px-4 py-2 flex flex-row justify-start items-center gap-4"
        href={url}
        onClick={() => setShowModal(phoneActive ? false : true)}
      >
        <p><Icon /></p>
        <p>{text}</p>
      </Link>
    </li>
  );
  

  return (
    <>
      {phoneActive && <button className="text-xl fixed top-5 left-20 p-4 z-50" id="hamburger" onClick={() => setShowModal(true)}>
        <HiMenuAlt4 />
      </button>}

      {showModal && <aside
        className={ `${phoneActive ? 
          'fixed left-3 transition-all duration-600 w-[90%] max-w-[360px] z-20 h-screen' :
          'w-[360px]'
        } rounded-lg flex flex-col bg-gray-500 dark:bg-slate-600 items-center pb-6 gap-2`}
      >
        {/* <h2 className="heading m-4 flex justify-center text-white items-center">LOGO</h2> */}

        {Object.entries(sideBarData).map((data, index) => {
          // console.log(data)
          return (
            <DataDiv data={data} router={router} key={index} />
          )
        })}

        {phoneActive && (
          <button
            className="bg-red-500 rounded-md my-3 px-8 py-1"
            id="close-sidebar"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        )}
      </aside>
      }
    </>
  );
};

export default AdminSidebar;
