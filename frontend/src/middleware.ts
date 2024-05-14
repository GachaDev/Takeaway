import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const isValidToken = async (token: RequestCookie | undefined) => {
    try {
        const { payload } = await jwtVerify(
            token?.value as string,
            new TextEncoder().encode(process.env.COOKIE_TOKEN_JWT as string)
        );
        if (!payload.id) return false;
        return payload;
    } catch (e) {
        return false;
    }
};

const protectedRoutes = ['/admin', '/admin/ventas', '/admin/productos'];

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const tokenValid = await isValidToken(token);
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

    if (path === '/login' || path === '/register') {
        if (tokenValid) {
            return NextResponse.redirect(new URL('/profile', request.nextUrl));
        } else {
            return NextResponse.next();
        }
    }

    if (path === '/profile' || path === '/order') {
        if (!tokenValid) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        } else {
            return NextResponse.next();
        }
    }

    if (isProtectedRoute && tokenValid && tokenValid.employee) {
        return NextResponse.next();
    } else {
        if (!isProtectedRoute) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }
    }
}

export const config = {
    matcher: [
        '/login',
        '/register',
        '/profile',
        '/admin',
        '/order',
        '/admin/ventas',
        '/admin/productos'
    ]
};
