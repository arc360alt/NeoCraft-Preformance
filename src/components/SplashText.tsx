import { useEffect, useState } from "react";

export default function SplashText() {
	const [splash, setSplash] = useState<string | null>(null);

	useEffect(() => {
		fetch("/splash.json")
			.then((res) => res.json())
			.then((list: string[]) => {
				if (list.length > 0) {
					setSplash(list[Math.floor(Math.random() * list.length)]);
				}
			})
			.catch(() => setSplash(null));
	}, []);

	if (!splash) return null;

	return <div className="splash-text">{splash}</div>;
}
