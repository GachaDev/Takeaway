import Button from '../common/Button';
import Input from '../common/Input';

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
                <Input
                    id="old_password"
                    label="Antigua Contraseña"
                    placeholder="Contraseña Antigua"
                    type="password"
                    minLength={8}
                    required
                />
                <Input
                    id="password"
                    label="Nueva Contraseña"
                    placeholder="Contraseña Nueva"
                    type="password"
                    minLength={8}
                    required
                />
            </div>
            <Button style="greenLigth" text="Cambiar contraseña" />
        </form>
    );
}
