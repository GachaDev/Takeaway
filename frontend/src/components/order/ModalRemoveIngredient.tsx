import { useState } from 'react';
import { Checkbox, Modal } from '@mantine/core';

export default function ModalRemoveIngredient({
    product,
    opened,
    close,
    finishAddToCart
}: {
    product: Product | null;
    opened: boolean;
    close: () => void;
    finishAddToCart: (checkedState: IngredientState) => void;
}) {
    const initialState: IngredientState = (product?.productIngredients || []).reduce(
        (acc: IngredientState, value) => {
            if (value.ingredient) {
                acc[value.ingredient.name] = false;
            }
            return acc;
        },
        {}
    );

    const [checkedState, setCheckedState] = useState<IngredientState>(initialState);

    const handleCheckboxChange = (ingredientName: string) => {
        setCheckedState(prevState => ({
            ...prevState,
            [ingredientName]: !prevState[ingredientName]
        }));
    };

    return (
        <Modal opened={opened} onClose={close} title="Añadir producto" centered>
            <h1>¿Deseas eliminar algún ingrediente?</h1>
            <div className="flex flex-col gap-2 mt-2 mb-2">
                {product?.productIngredients?.map((value, index) => (
                    <div key={index}>
                        {value?.ingredient?.name && (
                            <Checkbox
                                label={value.ingredient.name}
                                checked={checkedState[value.ingredient.name] || false}
                                onChange={() => handleCheckboxChange(value.ingredient.name)}
                            />
                        )}
                    </div>
                ))}
            </div>
            <button
                className={`bg-[--cartel] w-full text-white py-3 rounded-xl font-bold capitalize flex justify-center`}
                onClick={() => {
                    finishAddToCart(checkedState);
                }}
            >
                <span>Añadir</span>
            </button>
        </Modal>
    );
}
