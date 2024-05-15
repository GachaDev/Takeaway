import Button from '@/components/common/Button';
import InputClient from '@/components/common/InputClient';
import { Modal } from '@mantine/core';
import { useState } from 'react';

export default function ModalNewProduct({ open, close }: { open: boolean; close(): void }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);

    return (
        <Modal opened={open} onClose={close} title="Crear nuevo producto" centered>
            <div className="flex flex-col gap-4">
                <InputClient
                    id={'name'}
                    label="Nombre"
                    onChange={(val: string) => {
                        setName(val);
                    }}
                    placeholder="Introduce el nombre del producto"
                    type="text"
                    value={name}
                    minLength={2}
                    required
                />
                <InputClient
                    id={'description'}
                    label="Descripción"
                    onChange={(val: string) => {
                        setDescription(val);
                    }}
                    placeholder="Introduce la descripción del producto"
                    type="text"
                    value={description}
                    minLength={2}
                    required
                />
                <InputClient
                    id={'image'}
                    label="Url de la imagen"
                    onChange={(val: string) => {
                        setImage(val);
                    }}
                    placeholder="Introduce la url de la imagen"
                    type="text"
                    value={image}
                    minLength={2}
                    required
                />
                <InputClient
                    id={'price'}
                    label="Precio del producto"
                    onChange={(val: string) => {
                        setPrice(parseInt(val));
                    }}
                    placeholder="Introduce el precio del producto"
                    type="number"
                    value={price.toString()}
                    required
                />
                <Button
                    style="yellow"
                    text="Crear producto"
                    handleClick={() => {
                        console.log('ee');
                        close();
                    }}
                />
            </div>
        </Modal>
    );
}
