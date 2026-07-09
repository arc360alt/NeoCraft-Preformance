import Btn from "./Btn";
import type { DownloadsBanner } from "../types";

export default function SiteBanner({
	banner,
	onOpenArticle,
}: {
	banner: DownloadsBanner | null;
	onOpenArticle: (articleId: string) => void;
}) {
	if (!banner || !banner.active) return null;

	const articleId = banner.link.split("/").filter(Boolean).pop();

	return (
		<Btn className="site-banner" onClick={() => articleId && onOpenArticle(articleId)}>
			<span className="site-banner-text">{banner.message}</span>
			<span className="site-banner-arrow">&gt;&gt;</span>
		</Btn>
	);
}
