import { ProjectDto } from "./project.domain";

export interface Team {
    id?: number;
    name: string;
    projects: ProjectDto[];

}