export default function ChangePassword() {
    async function savePassword(formData: FormData) {
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
        <form action={savePassword} className="flex flex-col justify-between gap-4 p-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-center">Contraseña</h1>
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
            </div>
            <button className="bg-[--header] font-bold text-white p-2 rounded-xl" type="submit">
                Cambiar Contraseña
            </button>
        </form>
    );
}
