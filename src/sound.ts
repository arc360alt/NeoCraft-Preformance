const SOUND_BASE = "/oreui/sounds/";

const soundFiles = {
	click: SOUND_BASE + "button-click.ogg",
	pop: SOUND_BASE + "pop.ogg",
	hide: SOUND_BASE + "close-modal.ogg",
} as const;

type SoundName = keyof typeof soundFiles;

let audioContext: AudioContext | null = null;
const buffers = new Map<SoundName, AudioBuffer>();
const pendingLoads = new Map<SoundName, Promise<AudioBuffer>>();

function getContext(): AudioContext {
	if (!audioContext) {
		audioContext = new AudioContext();
	}
	return audioContext;
}

function loadBuffer(name: SoundName): Promise<AudioBuffer> {
	const cached = buffers.get(name);
	if (cached) return Promise.resolve(cached);

	const pending = pendingLoads.get(name);
	if (pending) return pending;

	const ctx = getContext();
	const promise = fetch(soundFiles[name])
		.then((res) => res.arrayBuffer())
		.then((data) => ctx.decodeAudioData(data))
		.then((buffer) => {
			buffers.set(name, buffer);
			pendingLoads.delete(name);
			return buffer;
		});

	pendingLoads.set(name, promise);
	return promise;
}

function play(name: SoundName) {
	const ctx = getContext();
	// A freshly created AudioContext starts "suspended" until a user gesture
	// resumes it — clicks are gestures, so this also unlocks the very first play.
	if (ctx.state === "suspended") {
		ctx.resume().catch(() => {});
	}

	loadBuffer(name)
		.then((buffer) => {
			// A brand-new source node per play, not a shared/reused <audio>
			// element: a single reused element carries decode/buffer state
			// between plays, so if playback ever gets interrupted (the OS or
			// browser renegotiating the audio device — which can happen just
			// from another tab's media starting/stopping), restarting it from
			// currentTime 0 doesn't fully reset that state and the next play
			// can come out truncated. Buffer source nodes are fire-and-forget
			// and can't collide with each other like that.
			const source = ctx.createBufferSource();
			source.buffer = buffer;
			source.connect(ctx.destination);
			source.start(0);
		})
		.catch(() => {});
}

export const playClick = () => play("click");
export const playPop = () => play("pop");
export const playHide = () => play("hide");
