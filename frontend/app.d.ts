type Style = 'greenDark' | 'greenLigth' | 'brown' | 'black';
type OrderState =
    | 'pending'
    | 'in_progress'
    | 'completed'
    | 'in_kitchen'
    | 'in_delivery'
    | 'delivered';
type PaymentMethod = 'cash' | 'card' | 'paypal' | 'other';

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
    price: number;
    description?: string;
    ingredients?: Ingredient[];
    productIngredients?: { id: number; can_remove: boolean; ingredient: Ingredient }[];
    category?: Category;
};

type Ingredient = {
    id: number;
    name: string;
};

type Category = {
    id: number;
    name: string;
    label: string;
};

type CartProduct = {
    id: number;
    quantity: number;
    ingredientsRemoved: { id: number }[];
};

interface IngredientState {
    [key: string]: boolean;
}

interface Order {
    id: number;
    id_user: number;
    delivery: boolean;
    address: string;
    date_ordered: Date;
    date_aprox_recollect: Date;
    payment_method: PaymentMethod;
    delivered: boolean;
    state: OrderState;
    orderProducts: OrderProduct[];
}

interface OrderProduct {
    id: number;
    amount: number;
    removedIngredients: RemovedIngredient[];
    product: Product;
}

interface RemovedIngredient {
    id: number;
    productIngredient: ProductIngredient;
}

interface ProductIngredient {
    id: number;
    can_remove: boolean;
    ingredient: Ingredient;
}
