import Axios from "@/config/axios";
import { includes } from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { User } from "./types/types";

const notLoggedUserRoute = ['/login', '/signUp'];
const loggedUserRoute = ['/login', '/signUp', '/', '/search', '/cart'];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const cookies = (req.cookies).get('token')?.value;


    if (!cookies && !loggedUserRoute.includes(path))
        return NextResponse.redirect(new URL('/', req.nextUrl));

    if (cookies && notLoggedUserRoute.includes(path))
        return NextResponse.redirect(new URL('/', req.nextUrl));

    if (path.includes('/admin')) {
        let user:User | null = null;

        try {
            const { data } = await Axios.get(`/user/verify?token=${cookies}`);
            
            if (data)
                user = data.user;

        } catch (error) {
            
        }

        if (user && user?.role !== 'admin')
            return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    if (path.includes('/api'))
        return NextResponse.redirect(new URL('/', req.nextUrl));


    return NextResponse.next();
};

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}