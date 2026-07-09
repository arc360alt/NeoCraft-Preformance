import { useEffect, useState } from "react";
import { fetchProjects } from "../api";
import type { Project } from "../types";
import ProjectCard from "../components/ProjectCard";

export default function OtherProjects() {
	const [projects, setProjects] = useState<Project[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchProjects()
			.then(setProjects)
			.catch((err) => setError(err.message));
	}, []);

	if (error) {
		return (
			<div className="page-content center">
				<img className="-img -error" src="/oreui/res/error.png" alt="" />
				<p>Failed to load projects: {error}</p>
			</div>
		);
	}

	if (!projects) {
		return (
			<div className="page-content center">
				<img className="-icon -loading" src="/oreui/res/loading.gif" alt="" />
				<p>Loading projects...</p>
			</div>
		);
	}

	return (
		<div className="page-content">
			<h1 className="title">Other Projects</h1>
			<div className="project-grid">
				{projects.map((project) => (
					<ProjectCard key={project.name} project={project} />
				))}
			</div>
		</div>
	);
}
