import { MessageResponse } from "@/types/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import crypto from 'crypto'
import { log } from "console";


export const responseToast = (res: any, router?: NextRouter, url?: string) =>{

    if(res?.data?.success) {
        toast.success(res.data.message);
        if(router && url)
            router.push(url);
    }

    else {
        const messageResponse = res?.data as MessageResponse;
        toast.error(messageResponse?.message);
    }

};

export const encryptedData = (data: any) => {
    
    const key = process.env.KEY || '';
    const iv = process.env.iv || '';

    // console.log(key);

    // console.log('iv---', iv);
    
    
    const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        Buffer.from(key, 'base64'),
        iv
    );

    let encrypData = cipher.update(JSON.stringify(data), 'utf8', 'base64');
    encrypData += cipher.final('base64');

    const tag = JSON.stringify(cipher.getAuthTag());

    return `${iv}.${encrypData}.${tag}`;
}


export const decryptedData = (data: string) => {

    const key = process.env.KEY || '';
    const iv = process.env.iv || '';

    const tag = JSON.parse(data.split('.')[2]);
    console.log(tag)

    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        Buffer.from(key, 'base64'),
        Buffer.from(iv, 'base64')
    );

    decipher.setAuthTag(Buffer.from(tag.data, 'base64'));

    let decryptData = decipher.update(data, 'base64', 'utf8');
    decryptData += decipher.final('utf8');

    return decryptData;
}