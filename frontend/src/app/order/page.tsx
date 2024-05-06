'use client';
import { useState, useEffect } from 'react';
import { Modal, MantineProvider, Select, Input } from '@mantine/core';
import '@mantine/core/styles.css';
import Button from '@/components/common/Button';

export default function Order() {
    const storedOption = localStorage.getItem('pickupOption');
    const storedAddress = localStorage.getItem('pickupAddress');
    const [pickupOption, setPickupOption] = useState(storedOption ? storedOption : 'DOMICILIO');
    const [pickupAddress, setPickupAddress] = useState(storedAddress ? storedAddress : '');
    const [showModal, setShowModal] = useState(!storedOption);

    const handleClick = () => {
        if (pickupAddress.length >= 4) {
            localStorage.setItem('pickupOption', pickupOption);
            localStorage.setItem('pickupAddress', pickupAddress);
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (!storedOption) {
            setShowModal(true);
        }
    }, []);

    return (
        <MantineProvider>
            <main className="flex p-5">
                <div>Tienda</div>
            </main>
            <Modal opened={showModal} onClose={() => {}} title="¿Dónde lo quieres?" centered>
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
        </MantineProvider>
    );
}
