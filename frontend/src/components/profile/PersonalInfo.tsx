export default function PersonalInfo() {
    async function savePersonalInfo(formData: FormData) {
        'use server';
        // const result = await useFetch(
        //     '/users',
        //     'POST',
        //     JSON.stringify({
        //         email: formData.get('email'),
        //         first_name: formData.get('first_name'),
        //         last_name: formData.get('last_name'),
        //         phone: formData.get('phone'),
        //         password: formData.get('password')
        //     })
        // );
        // if (result.ok) {
        //     redirect('/login');
        // }
    }
    return (
        <form action={savePersonalInfo} className="flex flex-col justify-between gap-4 p-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-center">Información personal</h1>
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
            </div>
            <button className="bg-[--header] font-bold text-white p-2 rounded-xl" type="submit">
                Guardar Cambios
            </button>
        </form>
    );
}
