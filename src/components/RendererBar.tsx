import Btn from "./Btn";
import type { DownloadCategory } from "../types";

// icon bevel-shadow color per renderer, matched loosely against the
// category name since the API's spelling/casing can vary ("Nividium").
function rendererShadowClass(name: string): string {
	const n = name.toLowerCase();
	if (n.includes("sodium")) return "shadow-green";
	if (n.includes("vulkan")) return "shadow-red";
	if (n.includes("nvidium") || n.includes("nividium")) return "shadow-darkgreen";
	if (n.includes("embeddium")) return "shadow-pink";
	if (n.includes("other")) return "shadow-orange";
	return "";
}

export default function RendererBar({
	categories,
	selected,
	onSelect,
}: {
	categories: Record<string, DownloadCategory>;
	selected: string | null;
	onSelect: (name: string) => void;
}) {
	return (
		<div className="renderer-bar">
			{Object.entries(categories).map(([name, cat]) => (
				<Btn
					key={name}
					className={`renderer-btn${selected === name ? " active" : ""}`}
					onClick={() => onSelect(name)}
				>
					<span className={`renderer-icon-wrap ${rendererShadowClass(name)}`}>
						<img src={cat.icon} alt="" className="renderer-icon" draggable={false} />
					</span>
					<span className="renderer-name">{name}</span>
				</Btn>
			))}
		</div>
	);
}
