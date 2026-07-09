export interface DownloadVersion {
	label: string;
	url: string;
	supported: boolean;
	note: string | null;
	beta?: boolean;
	unsupportedMods?: string[];
}

export interface DownloadCategory {
	icon: string;
	description: string;
	versions: DownloadVersion[];
}

export interface DownloadsBanner {
	message: string;
	link: string;
	active: boolean;
}

export interface DownloadsResponse {
	categories: Record<string, DownloadCategory>;
	versionBackgrounds: Record<string, string>;
	banner: DownloadsBanner;
}

export interface NewsArticle {
	id: string;
	date: string;
	title: string;
	tag: string;
	tagColor: string;
	summary: string;
	body: string;
}

export interface Project {
	name: string;
	description: string;
	banner: string;
	url: string;
}
