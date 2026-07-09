import type { DownloadsResponse, NewsArticle, Project } from "./types";

const DOWNLOADS_URL = "https://oaapi.arc360hub.com/api/downloads";
const NEWS_URL = "https://oaapi.arc360hub.com/api/news";
const PROJECTS_URL = "/projects.json";

export async function fetchDownloads(): Promise<DownloadsResponse> {
	const res = await fetch(DOWNLOADS_URL);
	if (!res.ok) throw new Error(`Failed to load downloads (${res.status})`);
	return res.json();
}

export async function fetchNews(): Promise<NewsArticle[]> {
	const res = await fetch(NEWS_URL);
	if (!res.ok) throw new Error(`Failed to load news (${res.status})`);
	return res.json();
}

export async function fetchProjects(): Promise<Project[]> {
	const res = await fetch(PROJECTS_URL);
	if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
	return res.json();
}
