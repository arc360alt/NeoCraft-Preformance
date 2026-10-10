import { useEffect, useState } from "react";
import Header from "./components/Header";
import BackButton from "./components/BackButton";
import SiteBanner from "./components/SiteBanner";
import Panel from "./components/Panel";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Downloads from "./pages/Downloads";
import Performance from "./pages/Performance";
import News from "./pages/News";
import OtherProjects from "./pages/OtherProjects";
import Launcher from "./pages/Launcher";
import { fetchDownloads } from "./api";
import type { DownloadsResponse } from "./types";

export type Page = "home" | "downloads" | "performance" | "news" | "projects" | "launcher";

// Pages that have their own shareable URL. Every other page lives at "/".
const PAGE_PATHS: Partial<Record<Page, string>> = {
	launcher: "/launcher",
};

const PAGE_TITLES: Partial<Record<Page, string>> = {
	launcher: "NeoCraft Launcher - NeoCraft",
};

function currentPath(): string {
	return window.location.pathname.replace(/\/+$/, "");
}

function isRedirectPath(): boolean {
	return currentPath() === "/rdir";
}

function pageFromPath(): Page {
	const path = currentPath();
	const match = (Object.keys(PAGE_PATHS) as Page[]).find((p) => PAGE_PATHS[p] === path);
	return match ?? "home";
}

function App() {
	const [page, setPage] = useState<Page>(pageFromPath);
	const [downloadsData, setDownloadsData] = useState<DownloadsResponse | null>(null);
	const [downloadsError, setDownloadsError] = useState<string | null>(null);
	const [pendingArticleId, setPendingArticleId] = useState<string | null>(null);
	const [showRebrandNotice, setShowRebrandNotice] = useState(isRedirectPath);

	useEffect(() => {
		const onPopState = () => setPage(pageFromPath());
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, []);

	useEffect(() => {
		document.title = PAGE_TITLES[page] ?? "NeoCraft";
	}, [page]);

	const navigate = (target: Page) => {
		setPage(target);
		const path = PAGE_PATHS[target] ?? "/";
		if (currentPath() !== path.replace(/\/+$/, "")) {
			window.history.pushState(null, "", path);
		}
	};

	useEffect(() => {
		fetchDownloads()
			.then(setDownloadsData)
			.catch((err) => setDownloadsError(err.message));
	}, []);

	const dismissRebrandNotice = () => {
		setShowRebrandNotice(false);
		// Land visitors from /rdir on the normal homepage URL so a refresh
		// (or sharing the link) doesn't keep re-triggering the notice.
		window.history.replaceState(null, "", "/");
	};

	const openNewsArticle = (articleId: string) => {
		setPendingArticleId(articleId);
		navigate("news");
	};

	const panelClass = (target: Page) => {
		if (page === target) return "panel panel-active";
		if (page === "home") return "panel panel-right";
		if (target === "home") return "panel panel-left";
		return "panel panel-right";
	};

	return (
		<div className="app-shell">
			<SiteBanner banner={downloadsData?.banner ?? null} onOpenArticle={openNewsArticle} />

			<Header />

			<div className="stage">
				<Panel className={panelClass("home")} innerClassName="panel-inner-home">
					<Home onNavigate={navigate} />
				</Panel>

				<Panel className={panelClass("downloads")}>
					<BackButton onClick={() => navigate("home")} />
					<Downloads data={downloadsData} error={downloadsError} />
				</Panel>

				<Panel className={panelClass("performance")}>
					<BackButton onClick={() => navigate("home")} />
					<Performance />
				</Panel>

				<Panel className={panelClass("news")}>
					<News
						openArticleId={pendingArticleId}
						onArticleOpened={() => setPendingArticleId(null)}
						onBack={() => navigate("home")}
					/>
				</Panel>

				<Panel className={panelClass("launcher")}>
					<BackButton onClick={() => navigate("home")} />
					<Launcher />
				</Panel>

				<Panel className={panelClass("projects")}>
					<BackButton onClick={() => navigate("home")} />
					<OtherProjects />
				</Panel>
			</div>

			<Footer />

			{showRebrandNotice && (
				<Modal
					confirmLabel="Continue"
					confirmColor="green"
					hideCancel
					bannerSrc="/oreui/res/error.png"
					onConfirm={dismissRebrandNotice}
					onCancel={dismissRebrandNotice}
				>
					<p>
						OptiArk has rebranded and moved to a new website! The modpack is the same as
						before, we just wanted a fresh new name, welcome to the new website!
					</p>
				</Modal>
			)}
		</div>
	);
}

export default App;
