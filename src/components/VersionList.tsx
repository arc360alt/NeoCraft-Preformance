import Btn from "./Btn";
import type { DownloadVersion } from "../types";

export default function VersionList({
	versions,
	selected,
	onSelect,
}: {
	versions: DownloadVersion[];
	selected: DownloadVersion | null;
	onSelect: (version: DownloadVersion) => void;
}) {
	return (
		<div className="version-list flex">
			{versions.map((v) => (
				<Btn
					key={v.label}
					className={`normal version-btn${selected?.label === v.label ? " blue" : ""}${
						!v.supported ? " discontinued" : ""
					}${v.beta ? " beta" : ""}${!v.url ? " coming-soon" : ""}`}
					onClick={() => onSelect(v)}
				>
					{v.label}
					{v.beta && <img src="/oreui/res/beta-warn.png" alt="beta" className="version-beta-icon" />}
					{!v.supported && <img src="/oreui/res/warn.png" alt="warning" className="version-warn-icon" />}
					{!v.url && <span className="version-coming-soon-label"> (Coming Soon)</span>}
				</Btn>
			))}
		</div>
	);
}
