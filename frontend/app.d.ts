type Style = 'greenDark' | 'greenLigth' | 'yellow';

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
