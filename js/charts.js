const ctx = document.getElementById("stats").getContext("2d");

function createChart(stats, name) {
	return new Chart(ctx, {
		type: "radar",
		data: {
			labels: [
				"Vida",
				"Ataque",
				"Defensa",
				["Ataque", "Especial"],
				["Defensa", "Especial"],
				"Velocidad",
			],
			datasets: [
				{
					label: `${
						name.charAt(0).toUpperCase() +
						name.slice(1)
					}`,
					data: stats,
					backgroundColor:
						"rgba(220, 255, 29, 0.70)",
				},
			],
		},
		options: {
			maintainAspectRaio: false,
			scales: {
				r: {
					grid: {
						color: "rgba(223, 223, 223, .5)",
					},
					pointLabels: {
						color: "white",
					},
					angleLines: {
						color: "white",
					},
				},
			},
		},
	});
}

export { createChart };
