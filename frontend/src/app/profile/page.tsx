export default function Profile() {
    return (
        <main className="p-5 w-full">
            <h1 className="text-3xl text-center">Mi cuenta</h1>
            <div className="grid sm:grid-cols-2 gap-10 justify-center mt-8 py-5">
                <div className="shadow-md p-6 rounded-lg border border-gray-200">
                    <h1 className="text-xl font-semibold text-center">Información personal</h1>
                    <form action="" className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="first_name">
                                Nombre
                            </label>
                            <input
                                id="first_name"
                                name="first_name"
                                required
                                minLength={2}
                                type="text"
                                className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="first_name">
                                Apellidos
                            </label>
                            <input
                                id="last_name"
                                name="last_name"
                                required
                                minLength={2}
                                type="text"
                                className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                                placeholder="Apellidos"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="first_name">
                                Teléfono
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                required
                                minLength={2}
                                type="tel"
                                className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                                placeholder="Teléfono"
                            />
                        </div>
                        <button
                            className="bg-[--header] font-bold text-white p-2 rounded-xl"
                            type="submit"
                        >
                            GUARDAR CAMBIOS
                        </button>
                    </form>
                </div>
                <div className="shadow-md p-6 rounded-lg border border-gray-200">
                    <h1 className="text-xl font-semibold text-center">Contraseña</h1>
                    <form action="" className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="first_name">
                                Vieja Contraseña
                            </label>
                            <input
                                id="old_password"
                                name="old_password"
                                required
                                minLength={2}
                                type="password"
                                className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold" htmlFor="first_name">
                                Nueva Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                required
                                minLength={2}
                                type="password"
                                className="focus:outline-none focus:border focus:border-neutral-400 border-neutral-200 border bg-neutral-100 rounded-lg p-2"
                                placeholder="Contraseña"
                            />
                        </div>
                        <button
                            className="bg-[--header] font-bold text-white p-2 rounded-xl"
                            type="submit"
                        >
                            CAMBIAR CONTRASEÑA
                        </button>
                    </form>
                </div>
                <div className="shadow-md p-6 rounded-lg border border-gray-200">
                    <h1 className="text-xl font-semibold text-center">Mis ultimos pedidos</h1>
                </div>
                <div className="shadow-md p-6 rounded-lg border border-gray-200">
                    <h1 className="text-xl font-semibold text-center">Mis puntos</h1>
                </div>
            </div>
            <div className="flex justify-center mt-8 w-full">
                <button className="bg-[--cartel] text-white p-3 w-full rounded-xl font-bold">
                    <span>CERRAR SESIÓN</span>
                </button>
            </div>
        </main>
    );
}
