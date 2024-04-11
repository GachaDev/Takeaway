interface CRUD<T> {
    findAll(): Promise<T[]>;
    findById(id: number | string): Promise<T | null>;
    create(t: T): Promise<CreateResponse>;

    /**
     * @returns the number of affected rows
     */
    update(t: T): Promise<number>;

    /**
     * @returns the number of affected rows
     */
    delete(id: number): Promise<number>;
}

interface CreateResponse {
    lastInsertId: string | number;
    affectedRows: number;
}
