'use client';
import { useState } from 'react';
import Button from '../common/Button';
import { toast } from 'sonner';
import InputClient from '../common/InputClient';

export default function ChangePassword({
    savePassword
}: {
    savePassword(formData: FormData): Promise<boolean | undefined>;
}) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSavePassword = async (form: FormData) => {
        const savedPassword = await savePassword(form);
        if (savedPassword) {
            toast.success('Contraseña actualizada con éxito');
            setNewPassword('');
            setOldPassword('');
        } else {
            toast.error(
                'La contraseña no se ha podido actualizar ya que no has introducido una contraseña correcta'
            );
        }
    };

    return (
        <form
            action={handleSavePassword}
            className="flex flex-col justify-between gap-4 p-6 shadow-box"
        >
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-center">Contraseña</h1>
                <InputClient
                    id="old_password"
                    label="Antigua Contraseña"
                    placeholder="Contraseña Antigua"
                    type="password"
                    minLength={8}
                    required
                    value={oldPassword}
                    onChange={setOldPassword}
                />
                <InputClient
                    id="password"
                    label="Nueva Contraseña"
                    placeholder="Contraseña Nueva"
                    type="password"
                    minLength={8}
                    required
                    value={newPassword}
                    onChange={setNewPassword}
                />
            </div>
            <Button style="greenDark" text="Cambiar contraseña" />
        </form>
    );
}
