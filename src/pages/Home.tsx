import Btn from "../components/Btn";
import type { Page } from "../App";

export default function Home({ onNavigate }: { onNavigate: (page: Page) => void }) {
	return (
		<div className="home-menu">
			<Btn className="normal wide" onClick={() => onNavigate("downloads")}>
				Downloads
			</Btn>
			<Btn className="normal wide" onClick={() => onNavigate("performance")}>
				Performance Info
			</Btn>
			<Btn className="normal wide" onClick={() => onNavigate("news")}>
				News
			</Btn>
			<Btn className="normal wide" onClick={() => onNavigate("projects")}>
				Other Projects
			</Btn>
		</div>
	);
}
