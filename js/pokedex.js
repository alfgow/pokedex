import { getPokemon, getSpecies } from "./api.js";

const $image = document.querySelector("#image");
const $description = document.querySelector("#description");

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
	const pokemon = await findPokemon(id);
	setImage(pokemon.sprites);
	setDescription(pokemon.species);
}

export { setPokemon };
