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

function setDescriptionError(error) {
	$description.textContent = error;
	console.log(error);
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
	}, 500);

	return pokemon;
}

export { setPokemon, setImage };
