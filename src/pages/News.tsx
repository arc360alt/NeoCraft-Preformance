import { useEffect, useRef, useState } from "react";
import { fetchNews } from "../api";
import type { NewsArticle } from "../types";
import NewsCard from "../components/NewsCard";
import Btn from "../components/Btn";
import BackButton from "../components/BackButton";

export default function News({
	openArticleId,
	onArticleOpened,
	onBack,
}: {
	openArticleId?: string | null;
	onArticleOpened?: () => void;
	onBack: () => void;
}) {
	const [articles, setArticles] = useState<NewsArticle[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [active, setActive] = useState<NewsArticle | null>(null);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetchNews()
			.then(setArticles)
			.catch((err) => setError(err.message));
	}, []);

	useEffect(() => {
		if (!articles || !openArticleId) return;
		const found = articles.find((a) => a.id === openArticleId);
		if (found) {
			setActive(found);
			onArticleOpened?.();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [articles, openArticleId]);

	// The list can be scrolled far down; swapping to the (much shorter)
	// detail view without resetting scroll leaves it scrolled past the
	// visible content, making the detail view look "scrunched"/empty.
	useEffect(() => {
		rootRef.current?.closest(".panel-inner")?.scrollTo({ top: 0 });
	}, [active]);

	if (error) {
		return (
			<div className="page-content center">
				<BackButton onClick={onBack} />
				<img className="-img -error" src="/oreui/res/error.png" alt="" />
				<p>Failed to load news: {error}</p>
			</div>
		);
	}

	if (!articles) {
		return (
			<div className="page-content center">
				<BackButton onClick={onBack} />
				<img className="-icon -loading" src="/oreui/res/loading.gif" alt="" />
				<p>Loading news...</p>
			</div>
		);
	}

	if (active) {
		return (
			<div className="page-content news-page" ref={rootRef}>
				<Btn className="normal all-news-btn" onClick={() => setActive(null)}>
					&lt; All News
				</Btn>
				<div className="news-article">
					<img className="article-banner" src="/oreui/res/error.png" alt="" />
					<div className="news-article-content">
						<div className="news-card-top">
							<span className="tag-pill" style={{ backgroundColor: active.tagColor }}>
								{active.tag}
							</span>
							<span className="news-date">{active.date}</span>
						</div>
						<h1 className="title">{active.title}</h1>
						<p className="news-body">{active.body}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="page-content news-page" ref={rootRef}>
			<BackButton onClick={onBack} />
			<h1 className="title">News</h1>
			{articles.map((article) => (
				<NewsCard key={article.id} article={article} onOpen={() => setActive(article)} />
			))}
		</div>
	);
}
