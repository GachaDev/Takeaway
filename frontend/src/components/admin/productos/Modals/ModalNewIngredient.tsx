import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@/components/common/Button';
import InputClient from '@/components/common/InputClient';
import { Modal } from '@mantine/core';

interface ModalNewProductProps {
    createIngredient(val: string): void;
    open: boolean;
    close: () => void;
}

export default function ModalNewIngredient({
    open,
    close,
    createIngredient
}: ModalNewProductProps) {
    const [ingredient, setIngredient] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createIngredient(ingredient);
        setIngredient('');
        close();
    };

    return (
        <Modal opened={open} onClose={close} title="Crear nuevo ingrediente" centered>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <InputClient
                        id="name"
                        label="Nombre"
                        onChange={value => setIngredient(value)}
                        placeholder="Introduce el nombre del ingrediente"
                        type="text"
                        value={ingredient}
                        minLength={2}
                        required
                    />
                    <Button style="brown" text="Crear ingrediente" />
                </div>
            </form>
        </Modal>
    );
}
