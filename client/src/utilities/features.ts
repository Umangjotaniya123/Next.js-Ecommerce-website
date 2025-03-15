import { MessageResponse } from "@/types/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import crypto from 'crypto'
import { log } from "console";
import { months } from "./data";

export const SERVER = process.env.NEXT_PUBLIC_SERVER;

export const responseToast = (res: any, router?: NextRouter, url?: string) => {

    if (res?.data?.success) {
        toast.success(res.data.message);
        if (router && url)
            router.push(url);
    }

    else {
        const messageResponse = res?.data as MessageResponse;
        toast.error(messageResponse?.message);
    }

};

export const encryptedData = (data: any) => {

    const key = process.env.NEXT_PUBLIC_KEY!
    const iv = crypto.randomBytes(12).toString('base64');

    const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        Buffer.from(key, 'base64'),
        iv,
        { 'authTagLength': 16 }
    );

    let encryptData = cipher.update(JSON.stringify(data), 'utf8', 'base64');
    encryptData += cipher.final('base64');

    return `${iv}.${encryptData}.${cipher.getAuthTag().toString('base64')}`; //encryptData.toString('base64');

}


export const decryptedData = (encryptData: string) => {

    const key = process.env.NEXT_PUBLIC_KEY!;

    const [iv, data, tag] = encryptData.split('.');

    const decipher = crypto.createDecipheriv(
        'aes-256-gcm', Buffer.from(key, 'base64'), iv,
        { 'authTagLength': 16 }
    );

    decipher.setAuthTag(Buffer.from(tag, 'base64'));
    let decryptData = decipher.update(data, 'base64', 'utf8');
    decryptData += decipher.final('utf8')

    return JSON.parse(decryptData); //messagetext.toString('utf8');
}

export const monthSequence = (state: number[]) => {
    const today = new Date();
    const data = state && state.length > 0 ? state.map((item, index) => {
        const monthDiff = (today.getMonth() + 1 + index) % 12;

        return months[monthDiff] ;
        
    }) : [];

    return data;
}