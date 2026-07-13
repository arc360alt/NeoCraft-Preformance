import type { VercelRequest, VercelResponse } from "@vercel/node";

// Only proxy files hosted on github.com — this endpoint fetches whatever
// URL it's given and streams the result back, so without an allowlist it'd
// be an open relay for arbitrary content under our own domain.
const ALLOWED_HOSTS = new Set(["github.com"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { url } = req.query;
	if (typeof url !== "string") {
		res.status(400).send("Missing url parameter");
		return;
	}

	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		res.status(400).send("Invalid url");
		return;
	}

	if (!ALLOWED_HOSTS.has(parsed.hostname)) {
		res.status(400).send("This host is not allowed");
		return;
	}

	const upstream = await fetch(parsed.toString());
	if (!upstream.ok) {
		res.status(502).send(`Upstream fetch failed (${upstream.status})`);
		return;
	}

	const originalName = decodeURIComponent(parsed.pathname.split("/").pop() || "download");
	const renamedFile = originalName.replace(/OptiArk/gi, "NeoCraft");
	const buffer = Buffer.from(await upstream.arrayBuffer());

	res.setHeader("Content-Type", upstream.headers.get("content-type") || "application/octet-stream");
	res.setHeader("Content-Disposition", `attachment; filename="${renamedFile}"`);
	res.status(200).send(buffer);
}
