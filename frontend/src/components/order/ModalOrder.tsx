'use client';
import { Input, Modal, Select } from '@mantine/core';
import { useState } from 'react';
import Button from '../common/Button';

export default function ModalOrder({
    pickup,
    setTypeOrder
}: {
    pickup: string | undefined;
    setTypeOrder(type: string, address: string): void;
}) {
    const [pickupOption, setPickupOption] = useState(pickup || 'DOMICILIO');
    const [pickupAddress, setPickupAddress] = useState('');

    const handleClick = () => {
        setTypeOrder(pickupOption, pickupAddress);
    };

    return (
        <Modal
            opened={!pickup ? true : false}
            onClose={() => {}}
            title="¿Dónde lo quieres?"
            centered
        >
            <div className="flex flex-col gap-4">
                <Select
                    label=""
                    placeholder="Elige una opción"
                    defaultValue={pickupOption}
                    data={['DOMICILIO', 'RECOGER']}
                    value={pickupOption}
                    onChange={value => setPickupOption(value ? value : 'DOMICILIO')}
                />
                {pickupOption === 'DOMICILIO' && (
                    <Input
                        placeholder="Introduce la dirección"
                        value={pickupAddress}
                        onChange={event => setPickupAddress(event.target.value)}
                    />
                )}
                <Button style="greenDark" text="Empezar pedido" handleClick={handleClick} />
            </div>
        </Modal>
    );
}
