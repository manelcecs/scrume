import { TaskSimple } from './task.domain';
import { Team, TeamSimple } from './team.domain';

export interface ProjectDto {
    id?: number;
    description?: string;
    name: string;
    team: TeamSimple,
}

export interface ProjectComplete {
    id?: number;
    name: string;
    team?: TeamSimple;
    project: ProjectComplete;
    description?: string;
    tasks: TaskSimple[];
}


export interface ProjectName {
    id: number;
    name: string;

}
