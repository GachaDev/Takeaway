import { plainToClass } from '@nestjs/class-transformer';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AppDataSource } from 'src/components/db/dataSource';
import { EntityTarget, Repository } from 'typeorm';

interface EntityWithId {
    id: string | number;
}

export class DAO<T extends EntityWithId> implements CRUD<T> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository<T>(entity);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(relations?: string[]): Promise<T[]> {
        const objects = await this.repository.find({ relations: relations || [] });
        return objects.map(object => this.convertToClass(object));
    }

    private convertToClass(object: any): T {
        return plainToClass(this.repository.target as new () => T, object);
    }

    async findById(id: number | string, relations?: string[]): Promise<T | null> {
        return this.repository.findOne({
            where: { id } as any,
            relations: relations || []
        });
    }

    async create(t: T): Promise<CreateResponse> {
        try {
            const object: T = await this.repository.save(t);

            if (object.id !== undefined && object.id !== null) {
                return { lastInsertId: object.id, affectedRows: 1 };
            } else {
                return { lastInsertId: 0, affectedRows: 0 };
            }
        } catch (error) {
            return { lastInsertId: 0, affectedRows: 0 };
        }
    }

    async update(t: T): Promise<number> {
        try {
            const object: T = await this.repository.save(t);

            if (object.id !== undefined && object.id !== null) {
                return 1;
            } else {
                return 0;
            }
        } catch (error) {
            return 0;
        }
    }

    async delete(id: number | string): Promise<number> {
        const result = await this.repository.delete(id);

        return result.affected || 0;
    }
}
