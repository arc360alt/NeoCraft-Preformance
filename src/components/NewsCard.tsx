import Btn from "./Btn";
import type { NewsArticle } from "../types";

export default function NewsCard({ article, onOpen }: { article: NewsArticle; onOpen: () => void }) {
	return (
		<Btn className="normal news-card box" onClick={onOpen}>
			<div className="news-card-top">
				<span className="tag-pill" style={{ backgroundColor: article.tagColor }}>
					{article.tag}
				</span>
				<span className="news-date">{article.date}</span>
			</div>
			<h2 className="news-title">{article.title}</h2>
			<p className="news-summary">{article.summary}</p>
		</Btn>
	);
}
