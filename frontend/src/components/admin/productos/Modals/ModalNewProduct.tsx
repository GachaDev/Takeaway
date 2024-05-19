import React, { useState, FormEvent } from 'react';
import Button from '@/components/common/Button';
import InputClient from '@/components/common/InputClient';
import { Modal, MultiSelect, Select } from '@mantine/core';

interface ModalNewProductProps {
    createProduct(val: Product, file: File | null): void;
    open: boolean;
    close: () => void;
    allIngredients: Ingredient[];
    categories: Category[];
}

export default function ModalNewProduct({
    open,
    close,
    allIngredients,
    createProduct,
    categories
}: ModalNewProductProps) {
    const [formData, setFormData] = useState<Product>({
        id: 0,
        name: '',
        description: '',
        image: '',
        price: 0,
        ingredients: [],
        category: undefined
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleIngredientChange = (values: string[]) => {
        const selected = allIngredients.filter(ingredient =>
            values.includes(ingredient.id.toString())
        );
        setFormData({
            ...formData,
            ingredients: selected
        });
    };

    const handleCategoryChange = (value: string | null) => {
        if (value) {
            const selected = categories.find(category => category.id.toString() === value);
            setFormData({
                ...formData,
                category: selected
            });
        } else {
            setFormData({
                ...formData,
                category: undefined
            });
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createProduct(formData, selectedFile);
        console.log('Form submitted:', formData);
        close();
    };

    return (
        <Modal opened={open} onClose={close} title="Crear nuevo producto" centered>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <InputClient
                        id="name"
                        label="Nombre"
                        onChange={value => handleChange('name', value)}
                        placeholder="Introduce el nombre del producto"
                        type="text"
                        value={formData.name}
                        minLength={2}
                        required
                    />
                    <InputClient
                        id="description"
                        label="Descripción"
                        onChange={value => handleChange('description', value)}
                        placeholder="Introduce la descripción del producto"
                        type="text"
                        value={formData.description || ''}
                        minLength={2}
                        required
                    />
                    <InputClient
                        id="image"
                        label="Url de la imagen"
                        onChange={value => handleChange('image', value)}
                        placeholder="Introduce la url de la imagen"
                        type="text"
                        value={formData.image}
                        minLength={2}
                        required
                    />
                    <input
                        id="image"
                        type="file"
                        accept=".webp"
                        required
                        multiple={false}
                        onChange={e => handleFileChange(e)}
                    />
                    <InputClient
                        id="price"
                        label="Precio del producto"
                        onChange={value => handleChange('price', value)}
                        placeholder="Introduce el precio del producto"
                        type="number"
                        value={formData.price.toString()}
                        required
                    />
                    <MultiSelect
                        label="Ingredientes"
                        placeholder="Selecciona ingredientes"
                        data={allIngredients.map(ingredient => ({
                            value: ingredient.id.toString(),
                            label: ingredient.name
                        }))}
                        value={formData?.ingredients?.map(ingredient => ingredient.id.toString())}
                        onChange={handleIngredientChange}
                        searchable
                    />
                    <Select
                        label="Categoria"
                        placeholder="Selecciona la categoría"
                        data={categories.map(category => ({
                            value: category.id.toString(),
                            label: category.label
                        }))}
                        value={formData.category ? formData.category.id.toString() : ''}
                        onChange={handleCategoryChange}
                        searchable
                    />

                    <Button style="brown" text="Crear producto" />
                </div>
            </form>
        </Modal>
    );
}
