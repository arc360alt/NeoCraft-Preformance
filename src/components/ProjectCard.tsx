import Btn from "./Btn";
import type { Project } from "../types";

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<Btn className="normal project-card" onClick={() => window.open(project.url, "_blank")}>
			<img className="project-banner" src={project.banner} alt="" draggable={false} />
			<div className="project-card-content">
				<h2 className="project-name">{project.name}</h2>
				<p className="project-description">{project.description}</p>
			</div>
		</Btn>
	);
}
