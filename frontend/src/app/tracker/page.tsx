import Tracker from '@/components/tracker/Tracker';
import { getSession } from '@/components/utils/getSession';

export default async function Trackerpage() {
    const session = (await getSession()) as Session;

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold">Estado actual del pedido</h1>
            <Tracker userId={session.id} />
        </div>
    );
}
