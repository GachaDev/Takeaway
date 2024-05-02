import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function getSession(): Promise<Session | false> {
    try {
        const token = cookies().get('token')?.value;

        if (!token) return false;

        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.COOKIE_TOKEN_JWT)
        );

        if (
            payload &&
            typeof payload === 'object' &&
            'id' in payload &&
            'email' in payload &&
            'employee' in payload
        ) {
            return payload as Session;
        }

        return false;
    } catch (e) {
        return false;
    }
}
