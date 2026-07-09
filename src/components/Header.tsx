import SplashText from "./SplashText";

export default function Header() {
	return (
		<div className="header-area">
			<div className="logo-wrap">
				<img className="logo-img" src="/logo.png" alt="NeoCraft" draggable={false} />
				<SplashText />
			</div>
		</div>
	);
}
