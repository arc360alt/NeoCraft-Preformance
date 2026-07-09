import type { DownloadsResponse, NewsArticle, Project } from "./types";

const DOWNLOADS_URL = "/downloads.json";
const NEWS_URL = "/news.json";
const PROJECTS_URL = "/projects.json";

export async function fetchDownloads(): Promise<DownloadsResponse> {
	const res = await fetch(DOWNLOADS_URL);
	if (!res.ok) throw new Error(`Failed to load downloads (${res.status})`);
	return res.json();
}

export async function fetchNews(): Promise<NewsArticle[]> {
	const res = await fetch(NEWS_URL);
	if (!res.ok) throw new Error(`Failed to load news (${res.status})`);
	const articles: NewsArticle[] = await res.json();
	return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchProjects(): Promise<Project[]> {
	const res = await fetch(PROJECTS_URL);
	if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
	return res.json();
}
