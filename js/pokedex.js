import { getPokemon, getSpecies } from "./api.js";
import { createChart } from "./charts.js";

const $image = document.querySelector("#image");
const $description = document.querySelector("#description");
const $screen = document.querySelector("#screen");
const $light = document.querySelector("#light");
const $stopSpeech = document.querySelector("#stopSpeech");
const $stopSpeech2 = document.querySelector("#stopSpeech2");
let activeChart = null;

$stopSpeech.addEventListener("click", () => {
	const synth = window.speechSynthesis;
	synth.cancel();
});
$stopSpeech2.addEventListener("click", () => {
	const synth = window.speechSynthesis;
	synth.cancel();
});

function load(isLoading = false) {
	const img = isLoading ? "url(./images/loading.gif)" : "";
	$screen.style.backgroundImage = img;
}

function speech(text) {
	const utterance = new SpeechSynthesisUtterance(text);

	const synth = window.speechSynthesis;
	synth.cancel();

	utterance.lang = "es-US";
	speechSynthesis.speak(utterance);
	$light.classList.add("is-animated");
	utterance.addEventListener("end", () => {
		$light.classList.remove("is-animated");
	});
}

function setImage(image) {
	$image.src = image;
}

function setDescription(species) {
	const descriptions = species.flavor_text_entries.find(
		(flavor) => flavor.language.name === "es"
	);
	$description.textContent = descriptions.flavor_text;
	speech(`${species.name}. ${descriptions.flavor_text}`);
}

function setDescriptionError(error) {
	$description.textContent = error;
}

async function findPokemon(id) {
	const pokemon = await getPokemon(id);
	if (pokemon === "error") {
		$description.textContent =
			"Hubo un error al obtener el pokemon";
	}
	const species = await getSpecies(id);
	const sprites = [pokemon.sprites.front_default];
	const stats = pokemon.stats.map((item) => item.base_stat);

	for (const item in pokemon.sprites) {
		if (
			pokemon.sprites[item] &&
			item !== "front_default" &&
			item !== "other" &&
			item !== "versions"
		) {
			sprites.push(pokemon.sprites[item]);
		}
	}

	return {
		stats,
		sprites,
		species,
		id: pokemon,
		name: pokemon.name,
	};
}

async function setPokemon(id) {
	$image.src = "";
	load(true);
	const pokemon = await findPokemon(id);
	setTimeout(() => {
		load(false);
		setImage(pokemon.sprites[0]);
		setDescription(pokemon.species);
		if (activeChart instanceof Chart) {
			activeChart.destroy();
		}
		activeChart = createChart(pokemon.stats, pokemon.name);
	}, 500);

	return pokemon;
}

export { setPokemon, setImage };
