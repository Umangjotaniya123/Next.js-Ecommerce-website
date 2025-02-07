import { NextRouter } from "next/router";
import toast from "react-hot-toast";

export const responseToast = (res: any, router: NextRouter, url: string) =>{

    if(res.data) {
        toast.success(res.data.message);
        router.push(url);
    }

    else {
        const err = res.error;
        toast.error(err.data.message);
    }

};