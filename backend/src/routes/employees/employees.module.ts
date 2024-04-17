import { Injectable } from '@nestjs/common';
import { DAO } from 'src/DAO/DAO';
import { Employee } from 'src/entities/Employee';

@Injectable()
export class EmployeesModule {
    DAO: DAO<Employee> = new DAO<Employee>(Employee);

    getAll(): Promise<Employee[]> {
        return this.DAO.findAll();
    }

    create(employee: Employee): Promise<CreateResponse> {
        return this.DAO.create(employee);
    }

    update(employee: Employee): Promise<number> {
        return this.DAO.update(employee);
    }

    delete(id: number): Promise<number> {
        return this.DAO.delete(id);
    }
}
