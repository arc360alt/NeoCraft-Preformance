import { useEffect, useState } from "react";
import type { DownloadsResponse, DownloadVersion } from "../types";
import RendererBar from "../components/RendererBar";
import VersionList from "../components/VersionList";
import DownloadPanel from "../components/DownloadPanel";
import Modal from "../components/Modal";

export default function Downloads({
	data,
	error,
}: {
	data: DownloadsResponse | null;
	error: string | null;
}) {
	const [renderer, setRenderer] = useState<string | null>(null);
	const [version, setVersion] = useState<DownloadVersion | null>(null);
	const [warnVersion, setWarnVersion] = useState<DownloadVersion | null>(null);

	useEffect(() => {
		if (data && !renderer) {
			const firstRenderer = Object.keys(data.categories)[0];
			if (firstRenderer) setRenderer(firstRenderer);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const handleSelectRenderer = (name: string) => {
		setRenderer(name);
		setVersion(null);
	};

	const startDownload = (v: DownloadVersion) => {
		window.open(v.url, "_blank");
	};

	const handleDownloadClick = () => {
		if (!version || !version.url) return;
		const hasIssues = !version.supported || (version.unsupportedMods?.length ?? 0) > 0;
		if (hasIssues) {
			setWarnVersion(version);
		} else {
			startDownload(version);
		}
	};

	if (error) {
		return (
			<div className="page-content center">
				<img className="-img -error" src="/oreui/res/error.png" alt="" />
				<p>Failed to load downloads: {error}</p>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="page-content center">
				<img className="-icon -loading" src="/oreui/res/loading.gif" alt="" />
				<p>Loading downloads...</p>
			</div>
		);
	}

	const activeCategory = renderer ? data.categories[renderer] : null;

	return (
		<div className="page-content downloads-page">
			<h1 className="title">Downloads</h1>

			<RendererBar categories={data.categories} selected={renderer} onSelect={handleSelectRenderer} />

			{activeCategory && (
				<>
					<p className="renderer-description">{activeCategory.description}</p>
					<VersionList versions={activeCategory.versions} selected={version} onSelect={setVersion} />
				</>
			)}

			{version && (
				<DownloadPanel
					version={version}
					background={data.versionBackgrounds[version.label] ?? null}
					onDownloadClick={handleDownloadClick}
				/>
			)}

			{warnVersion && (
				<Modal
					title={!warnVersion.supported ? "This version is discontinued" : "Incompatible mods"}
					confirmLabel="Download Anyway"
					bannerSrc="/oreui/res/warn.png"
					onCancel={() => setWarnVersion(null)}
					onConfirm={() => {
						startDownload(warnVersion);
						setWarnVersion(null);
					}}
				>
					{!warnVersion.supported && (
						<p>This version is no longer supported and will not receive updates or fixes.</p>
					)}
					{warnVersion.unsupportedMods && warnVersion.unsupportedMods.length > 0 && (
						<>
							<p>The following mods are known to be incompatible with this version:</p>
							<ul>
								{warnVersion.unsupportedMods.map((mod) => (
									<li key={mod}>{mod}</li>
								))}
							</ul>
						</>
					)}
				</Modal>
			)}
		</div>
	);
}
