'use client';

import { Select } from '@mantine/core';
import ProductsCarts from './ProductsCarts/ProductsCarts';
import { useState } from 'react';

export enum PaymentMethod {
    CASH = 'cash',
    CARD = 'card',
    OTHER = 'other'
}

const paymentMethodLabels = {
    [PaymentMethod.CASH]: 'Efectivo',
    [PaymentMethod.CARD]: 'Tarjeta',
    [PaymentMethod.OTHER]: 'Otro'
};

export default function Cart({
    Products,
    cartProducts,
    handleAddToCart,
    handleRemoveFromCart,
    pickupOption,
    address,
    finishOrder
}: {
    Products: Product[];
    cartProducts: CartProduct[];
    handleAddToCart: (product: Product) => void;
    pickupOption: string | undefined;
    handleRemoveFromCart: (product: Product) => void;
    address: string | undefined;
    finishOrder: (selectedDate: string, paymentMethod: string) => void;
}) {
    const [selectedDate, setSelectedDate] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);

    const handleDateChange = (value: string | null) => {
        if (value) {
            setSelectedDate(value);
        }
    };

    const handlePaymentMethodChange = (value: string | null) => {
        if (value) {
            setPaymentMethod(value as PaymentMethod);
        }
    };

    const generateTimeOptions = (): string[] => {
        const times: string[] = [];
        const addTimes = (start: number, end: number) => {
            for (let hour = start; hour < end; hour++) {
                for (let min = 0; min < 60; min += 10) {
                    const timeString = `${String(hour).padStart(2, '0')}:${String(min).padStart(
                        2,
                        '0'
                    )}`;
                    times.push(timeString);
                }
            }
        };

        addTimes(12, 16);
        addTimes(20, 23);

        return times;
    };

    const filterTimeOptions = (times: string[]): string[] => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const thresholdMinutes = currentMinutes + 30;

        return times.filter(time => {
            const [hour, minute] = time.split(':').map(Number);
            const timeInMinutes = hour * 60 + minute;
            return timeInMinutes > thresholdMinutes;
        });
    };

    const allTimeOptions = generateTimeOptions();
    const filteredTimeOptions = filterTimeOptions(allTimeOptions);
    const paymentMethods = Object.keys(paymentMethodLabels).map(key => ({
        value: key,
        label: paymentMethodLabels[key as PaymentMethod]
    }));

    const handleFinishOrder = () => {
        if (selectedDate && paymentMethod) {
            finishOrder(selectedDate, paymentMethod);
        }
    };

    return (
        <div className="flex flex-row gap-10 mt-8 w-full justify-between max-md:flex-col max-md:items-center">
            <div className="w-2/6 flex flex-col gap-5">
                <h1 className="mb-5 text-lg font-semibold">Datos</h1>
                {pickupOption === 'DOMICILIO' ? (
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-2">
                            <p className="font-bold">Tipo de recogida:</p>
                            <span>{pickupOption}</span>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Dirección:</p>
                            <span>{address}</span>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Fecha:</p>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-2">
                            <p className="font-bold">Tipo de recogida:</p>
                            <span>{pickupOption}</span>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Fecha:</p>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                )}
                <div className="flex gap-2">
                    <Select
                        label="Selecciona la hora"
                        placeholder="Selecciona la hora"
                        data={filteredTimeOptions}
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                </div>
                <div className="flex gap-2">
                    <Select
                        label="Selecciona el método de pago"
                        placeholder="Selecciona el método de pago"
                        data={paymentMethods}
                        onChange={handlePaymentMethodChange}
                        value={paymentMethod}
                    />
                </div>
            </div>
            <ProductsCarts
                cartProducts={cartProducts}
                Products={Products}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
                finishOrder={handleFinishOrder}
            />
        </div>
    );
}
