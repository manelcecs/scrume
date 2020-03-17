import { TaskDto } from './task.domain';

export interface ColumDto {
    id?: Number;
    name: String;
    tareas: TaskDto[];

}
