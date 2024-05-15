type Style = 'greenDark' | 'greenLigth' | 'yellow' | 'black';

type Session = {
    id: number;
    email: string;
    employee: boolean;
    iat: number;
    exp: number;
};

type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    points: number;
    created_at: Date;
    employee: boolean;
};

type Product = {
    id: number;
    name: string;
    image: string | null | StaticImageData;
    price: number;
    description?: string;
    ingredients?: Ingredient[];
};

type Ingredient = {
    id: number;
    name: string;
};
