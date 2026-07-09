import { useEffect, useState } from "react";
import Header from "./components/Header";
import BackButton from "./components/BackButton";
import SiteBanner from "./components/SiteBanner";
import Panel from "./components/Panel";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import Downloads from "./pages/Downloads";
import Performance from "./pages/Performance";
import News from "./pages/News";
import OtherProjects from "./pages/OtherProjects";
import { fetchDownloads } from "./api";
import type { DownloadsResponse } from "./types";

export type Page = "home" | "downloads" | "performance" | "news" | "projects";

function isRedirectPath(): boolean {
	return window.location.pathname.replace(/\/+$/, "") === "/rdir";
}

function App() {
	const [page, setPage] = useState<Page>("home");
	const [downloadsData, setDownloadsData] = useState<DownloadsResponse | null>(null);
	const [downloadsError, setDownloadsError] = useState<string | null>(null);
	const [pendingArticleId, setPendingArticleId] = useState<string | null>(null);
	const [showRebrandNotice, setShowRebrandNotice] = useState(isRedirectPath);

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
		setPage("news");
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
					<Home onNavigate={setPage} />
				</Panel>

				<Panel className={panelClass("downloads")}>
					<BackButton onClick={() => setPage("home")} />
					<Downloads data={downloadsData} error={downloadsError} />
				</Panel>

				<Panel className={panelClass("performance")}>
					<BackButton onClick={() => setPage("home")} />
					<Performance />
				</Panel>

				<Panel className={panelClass("news")}>
					<News
						openArticleId={pendingArticleId}
						onArticleOpened={() => setPendingArticleId(null)}
						onBack={() => setPage("home")}
					/>
				</Panel>

				<Panel className={panelClass("projects")}>
					<BackButton onClick={() => setPage("home")} />
					<OtherProjects />
				</Panel>
			</div>

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
