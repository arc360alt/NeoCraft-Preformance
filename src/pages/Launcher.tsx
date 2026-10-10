import Btn from "../components/Btn";

// Download link for the NeoCraft Launcher installer. While this is null the
// download button stays disabled and shows "Coming Soon". To release the
// launcher, set it to the download URL (e.g. the GitHub release page) and the
// button becomes a normal, clickable download button. Nothing else needs to change.
export const LAUNCHER_DOWNLOAD_URL: string | null = null;

const HELIOS_URL = "https://github.com/dscalzi/HeliosLauncher";
const CONTACT_URL = "https://github.com/arc360alt/NeoCraft-Preformance/issues";

export default function Launcher() {
	const downloadUrl = LAUNCHER_DOWNLOAD_URL;

	return (
		<div className="page-content launcher-page">
			<h1 className="title">NeoCraft Launcher</h1>

			<div className="box">
				<p>
					NeoCraft Launcher is a free desktop launcher for Minecraft: Java Edition on Windows, macOS
					and Linux. It is made by the NeoCraft team, the same people who make the NeoCraft modpack
					on this website.
				</p>
				<p>
					Right now, playing NeoCraft means downloading the .mrpack/.zip from the Downloads page and
					importing it into Prism Launcher or MultiMC. The launcher replaces that step: pick a
					renderer and a Minecraft version, and it downloads and sets up NeoCraft for you in one
					click.
				</p>
			</div>

			<img
				className="launcher-screenshot"
				src="/launcher.png"
				alt="NeoCraft Launcher main screen with the Play button, version selector and signed-in Minecraft account"
				draggable={false}
			/>

			<div className="download-panel-frame pixel-frame pixel-clip launcher-download">
				<div className="download-panel pixel-clip">
					<div className="download-panel-inner">
						<h2 className="chart-title">Download</h2>
						{!downloadUrl && (
							<div className="tag-pill" style={{ backgroundColor: "#8c8d90" }} id="launcher-download-status">
								Coming Soon
							</div>
						)}
						{downloadUrl ? (
							<Btn
								className="normal blue launcher-download-btn"
								onClick={() => window.open(downloadUrl, "_blank", "noopener")}
							>
								Download NeoCraft Launcher
							</Btn>
						) : (
							<button
								type="button"
								className="normal disabled launcher-download-btn"
								disabled
								aria-disabled="true"
								aria-describedby="launcher-download-status"
							>
								Download NeoCraft Launcher
							</button>
						)}
						<p className="download-note">
							Free for Windows, macOS and Linux. You need to own Minecraft: Java Edition to play.
						</p>
					</div>
				</div>
			</div>

			<div className="box">
				<h2 className="chart-title">What it does</h2>
				<ul className="launcher-list">
					<li>
						Installs NeoCraft directly. Choose a renderer (Sodium, VulkanMod, Nvidium, Embeddium or
						Other) and a Minecraft version, and the launcher downloads and sets everything up.
					</li>
					<li>
						The version list comes from the same source as the Downloads page, so it always matches
						what you see there.
					</li>
					<li>
						Every install is a normal Minecraft instance. You can add your own mods, resource packs
						and shaders, and change memory and Java settings.
					</li>
					<li>Installs the right Java version automatically.</li>
					<li>
						You sign in with your Microsoft account, using the official Minecraft login. You need to
						own Minecraft: Java Edition to play.
					</li>
				</ul>
			</div>

			<div className="box">
				<h2 className="chart-title">Sign-in and privacy</h2>
				<ul className="launcher-list">
					<li>
						Login uses Microsoft's official sign-in. The launcher never sees your Microsoft password.
					</li>
					<li>
						It only uses your Minecraft username, UUID and skin, to show who is logged in and to
						start the game.
					</li>
					<li>
						Login tokens are stored only on your computer, encrypted with your operating system's
						keychain. They are never sent to NeoCraft or any third party.
					</li>
					<li>No ads, no analytics or tracking, and no data is sold.</li>
				</ul>
			</div>

			<div className="box">
				<h2 className="chart-title">Credits</h2>
				<p>
					NeoCraft Launcher is based on the open source{" "}
					<a href={HELIOS_URL} target="_blank" rel="noreferrer">
						Helios Launcher
					</a>{" "}
					(MIT license).
				</p>
			</div>

			<div className="box">
				<h2 className="chart-title">Contact</h2>
				<p>
					Questions or problems? Contact the NeoCraft team by{" "}
					<a href={CONTACT_URL} target="_blank" rel="noreferrer">
						opening an issue on GitHub
					</a>
					.
				</p>
			</div>

			<p className="launcher-disclaimer">
				NeoCraft Launcher is not an official Minecraft product and is not approved by or associated
				with Mojang or Microsoft.
			</p>
		</div>
	);
}
