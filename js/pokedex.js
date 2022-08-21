import { getPokemon, getSpecies } from "./api.js";

const $image = document.querySelector("#image");
const $description = document.querySelector("#description");
const $screen = document.querySelector("#screen");

function load(isLoading = false) {
	const img = isLoading ? "url(./images/loading.gif)" : "";
	$screen.style.backgroundImage = img;
}

function setImage(image) {
	$image.src = image;
}

function setDescription(species) {
	const descriptions = species.flavor_text_entries.find(
		(flavor) => flavor.language.name === "es"
	);
	$description.textContent = descriptions.flavor_text;
}

async function findPokemon(id) {
	const pokemon = await getPokemon(id);
	const species = await getSpecies(id);
	return { sprites: pokemon.sprites["front_default"], species };
}

async function setPokemon(id) {
	$image.src = "";
	load(true);
	setTimeout(() => {
		load(false);
		setImage(pokemon.sprites);
		setDescription(pokemon.species);
	}, 500);
	const pokemon = await findPokemon(id);
}

export { setPokemon };
