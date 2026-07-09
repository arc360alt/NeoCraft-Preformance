import { perfCharts, perfNotes } from "../data/performanceData";

export default function Performance() {
	return (
		<div className="page-content perf-page">
			<h1 className="title">Performance Info</h1>
			<div className="box">
				Tested on a Ryzen 5 5700G &bull; RX 7600 8GB OC &bull; 32GB ddr4-3200mhz ram &bull; 1440P &bull; all default settings. Nvidium was tested on a 4090 Mobile, so take those metrics with a grain of salt.
			</div>

			{perfCharts.map((chart) => (
				<div className="box perf-chart" key={chart.title}>
					<h2 className="chart-title">{chart.title}</h2>
					{chart.bars.map((bar) => (
						<div className="perf-row" key={bar.label}>
							<span className="perf-label">{bar.label}</span>
							<div className="perf-bar-track">
								<div
									className={`perf-bar-fill ${bar.color}`}
									style={{ width: `${Math.min(100, (bar.value / chart.max) * 100)}%` }}
								/>
							</div>
							<span className="perf-value">
								{bar.value} {chart.unit}
							</span>
						</div>
					))}
				</div>
			))}

			<div className="box">
				<ul className="perf-notes">
					{perfNotes.map((note) => (
						<li key={note}>{note}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
