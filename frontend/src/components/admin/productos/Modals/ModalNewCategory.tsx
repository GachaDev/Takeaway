import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@/components/common/Button';
import InputClient from '@/components/common/InputClient';
import { Modal } from '@mantine/core';

interface ModalNewProductProps {
    createCategory(name: string, label: string): void;
    open: boolean;
    close: () => void;
}

export default function ModalNewCategory({ open, close, createCategory }: ModalNewProductProps) {
    const [name, setName] = useState('');
    const [label, setLabel] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createCategory(name, label);
        setName('');
        setLabel('');
        close();
    };

    return (
        <Modal opened={open} onClose={close} title="Crear nueva categoría" centered>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <InputClient
                        id="category"
                        label="Nombre interno"
                        onChange={value => setName(value)}
                        placeholder="Introduce el nombre interno de la categoría"
                        type="text"
                        value={name}
                        minLength={2}
                        required
                    />
                    <InputClient
                        id="category"
                        label="Nombre visible"
                        onChange={value => setLabel(value)}
                        placeholder="Introduce el nombre visible de la categoría"
                        type="text"
                        value={label}
                        minLength={2}
                        required
                    />
                    <Button style="brown" text="Crear Categoría" />
                </div>
            </form>
        </Modal>
    );
}
