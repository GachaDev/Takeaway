'use client';
import { useState } from 'react';
import Button from '../common/Button';
import { toast } from 'sonner';
import InputClient from '../common/InputClient';

export default function PersonalInfo({
    savePersonalInfo,
    infoUser
}: {
    savePersonalInfo(formData: FormData): Promise<boolean | undefined>;
    infoUser: User;
}) {
    const [firstName, setFirstName] = useState(infoUser.first_name);
    const [lastName, setLastName] = useState(infoUser.last_name);
    const [phone, setPhone] = useState(infoUser.phone);

    const handleSaveInfo = async (form: FormData) => {
        const savedInfo = await savePersonalInfo(form);
        if (savedInfo) {
            toast.success('Información actualizada con éxito');
        } else {
            toast.error('Ha surgido un error');
        }
    };
    return (
        <form
            action={handleSaveInfo}
            className="flex flex-col justify-between gap-4 p-6 shadow-box"
        >
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-center">Información personal</h1>
                <InputClient
                    id="first_name"
                    label="Nombre"
                    placeholder="Nombre"
                    type="text"
                    minLength={2}
                    value={firstName}
                    onChange={setFirstName}
                />
                <InputClient
                    id="last_name"
                    label="Apellidos"
                    placeholder="Apellidos"
                    type="text"
                    minLength={2}
                    value={lastName}
                    onChange={setLastName}
                />
                <InputClient
                    id="phone"
                    label="Teléfono"
                    placeholder="Teléfono"
                    type="tel"
                    minLength={9}
                    value={phone}
                    onChange={setPhone}
                />
            </div>
            <Button style="greenLigth" text="Guardar cambios" />
        </form>
    );
}
