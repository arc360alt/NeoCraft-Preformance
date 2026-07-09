// Placeholder performance numbers — swap these out for real benchmark results.
export interface PerfBar {
	label: string;
	value: number;
	color: "skyblue" | "green" | "yellow" | "red" | "blue";
}

export interface PerfChart {
	title: string;
	unit: string;
	max: number;
	bars: PerfBar[];
}

export const perfCharts: PerfChart[] = [
	{
		title: "Average FPS (Render Distance 16, 1080p)",
		unit: "FPS",
		max: 3000,
		bars: [
			{ label: "Vanilla", value: 130, color: "red" },
			{ label: "Sodium (OpenGL)", value: 320, color: "green" },
			{ label: "Sodium (Vulkan 26.2)", value: 2100, color: "green" },
			{ label: "VulkanMod", value: 1800, color: "skyblue" },
			{ label: "Nvidium", value: 1200, color: "blue" },
		],
	},
	{
		title: "Chunk Loading Time",
		unit: "sec",
		max: 30,
		bars: [
			{ label: "Vanilla", value: 24, color: "red" },
			{ label: "Sodium (OpenGL)", value: 11, color: "green" },
			{ label: "VulkanMod", value: 9, color: "skyblue" },
			{ label: "Nvidium", value: 6, color: "blue" },
		],
	},
	{
		title: "GPU Memory Usage",
		unit: "MB",
		max: 4096,
		bars: [
			{ label: "Vanilla", value: 1800, color: "red" },
			{ label: "Sodium", value: 1400, color: "green" },
			{ label: "VulkanMod", value: 1600, color: "skyblue" },
			{ label: "Nvidium", value: 2200, color: "blue" },
		],
	},
];

export const perfNotes: string[] = [
	"VulkanMod scales best on newer NVIDIA/AMD GPUs with up-to-date drivers.",
	"Nvidium requires an NVIDIA GPU (16 series or newer).",
	"Sodium is the BEST for most to all use cases, and with the new Vulkan mode with 26.2 provides the best performance.",
];
