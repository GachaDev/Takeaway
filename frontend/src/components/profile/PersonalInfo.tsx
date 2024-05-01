import Button from '../common/Button';
import Input from '../common/Input';

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
                <Input
                    id="first_name"
                    label="Nombre"
                    placeholder="Nombre"
                    type="text"
                    minLength={2}
                />
                <Input
                    id="last_name"
                    label="Apellidos"
                    placeholder="Apellidos"
                    type="text"
                    minLength={2}
                />
                <Input
                    id="phone"
                    label="Teléfono"
                    placeholder="Teléfono"
                    type="tel"
                    minLength={9}
                />
            </div>
            <Button style="greenLigth" text="Guardar cambios" />
        </form>
    );
}
