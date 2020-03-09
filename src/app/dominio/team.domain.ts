import { ProjectDto } from "./project.domain";

export interface Team {
    id?: Number;
    name: String;
    projects: ProjectDto[];

}