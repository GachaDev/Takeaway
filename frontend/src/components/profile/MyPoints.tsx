export default function MyPoints({ points }: { points: number }) {
    return (
        <div className="flex flex-col justify-between gap-4 p-6">
            <h1 className="text-xl font-semibold text-center">Mis puntos</h1>
            <h2 className="text-center text-lg">
                Ahora mismo tienes un total de <span className="text-green-700">{points}</span>{' '}
                puntos
            </h2>
        </div>
    );
}
