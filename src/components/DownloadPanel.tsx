import Btn from "./Btn";
import type { DownloadVersion } from "../types";

export default function DownloadPanel({
	version,
	background,
	onDownloadClick,
}: {
	version: DownloadVersion;
	background: string | null;
	onDownloadClick: () => void;
}) {
	return (
		<div className="download-panel-frame pixel-frame pixel-clip">
			<div
				className="download-panel pixel-clip"
				style={
					background
						? {
								backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${background})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}
						: undefined
				}
			>
				<div className="download-panel-inner">
					<h2 className="chart-title">{version.label}</h2>
					{version.beta && <div className="tag-pill" style={{ backgroundColor: "#dada10" }}>Beta</div>}
					{!version.supported && (
						<div className="tag-pill" style={{ backgroundColor: "#c63636" }}>Discontinued</div>
					)}
					<Btn className="normal blue" onClick={onDownloadClick}>
						Download
					</Btn>
					{version.note && <p className="download-note">{version.note}</p>}
				</div>
			</div>
		</div>
	);
}
