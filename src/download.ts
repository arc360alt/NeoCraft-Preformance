// Release files are hosted on GitHub, which doesn't send CORS headers on
// its release assets — a direct browser fetch() to those URLs is blocked,
// so there's no way to rename the file client-side. Instead this routes
// through /api/download (a Vercel serverless function, see api/download.ts)
// that fetches the file server-side, where CORS doesn't apply, and streams
// it back with any "OptiArk" in the filename swapped for "NeoCraft".
export async function downloadRenamed(url: string) {
	const originalName = decodeURIComponent(url.split("/").pop() || "download");
	const renamedFile = originalName.replace(/OptiArk/gi, "NeoCraft");

	try {
		const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
		// In local `vite` dev (no Vercel), this route doesn't exist and Vite's
		// SPA fallback serves index.html with a 200 instead of a real error —
		// `res.ok` alone can't tell that apart from a genuine file response.
		const contentType = res.headers.get("content-type") ?? "";
		if (!res.ok || contentType.includes("text/html")) {
			throw new Error(`Download failed (${res.status})`);
		}
		const blob = await res.blob();
		const objectUrl = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = objectUrl;
		link.download = renamedFile;
		document.body.appendChild(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(objectUrl);
	} catch (err) {
		// The proxy is only available once deployed on Vercel (or run
		// locally via `vercel dev`, not plain `vite`) — if it's unreachable,
		// fall back to a normal download under the file's original name
		// rather than leaving the click doing nothing. Logged (not swallowed
		// silently) so a real failure on a live deployment is diagnosable
		// instead of just quietly looking like "renaming didn't happen".
		console.warn("[download] renamed download failed, falling back to original file:", err);
		window.open(url, "_blank");
	}
}
