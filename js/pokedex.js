import { getPokemon, getSpecies } from "./api.js";

const $image = document.querySelector("#image");
const $description = document.querySelector("#description");
const $screen = document.querySelector("#screen");
const $light = document.querySelector("#light");
const $stopSpeech = document.querySelector("#stopSpeech");
const $stopSpeech2 = document.querySelector("#stopSpeech2");

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

function speech(text, changePokemon) {
	const utterance = new SpeechSynthesisUtterance(text);
	if (changePokemon === "y") {
		const synth = window.speechSynthesis;
		synth.cancel();
	}
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

function setDescription(species, changePokemon) {
	const descriptions = species.flavor_text_entries.find(
		(flavor) => flavor.language.name === "es"
	);
	$description.textContent = descriptions.flavor_text;
	speech(`${species.name}. ${descriptions.flavor_text}`, changePokemon);
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
		sprites,
		species,
		id: pokemon,
		name: pokemon.name,
	};
}

async function setPokemon(id, changePokemon) {
	$image.src = "";
	load(true);
	const pokemon = await findPokemon(id);
	setTimeout(() => {
		load(false);
		setImage(pokemon.sprites[0]);
		setDescription(pokemon.species, changePokemon);
	}, 500);

	return pokemon;
}

export { setPokemon, setImage };
