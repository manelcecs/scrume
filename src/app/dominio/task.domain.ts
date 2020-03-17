import { ProjectName } from './project.domain';
import { UserName } from './user.domain';

export interface TaskDto {
    id?: number;
    title: string;
    description: string;
    estimate: number;
    project: ProjectName;
}

export interface TaskSimple {
    id?: number;
    title: string;
    description?: string;
    estimate?: number;
}