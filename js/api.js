const BASE_API = `https://pokeapi.co/api/v2/`;

async function getPokemon(id) {
	const idString = id.toString();
	try {
		const response = await fetch(`${BASE_API}pokemon/${idString}`);
		const pokemon = await response.json();
		return pokemon;
	} catch (error) {
		return "error";
	}
}

async function getSpecies(id) {
	const idString = id.toString();
	try {
		const response = await fetch(
			`${BASE_API}pokemon-species/${idString}`
		);
		const pokemon = await response.json();
		return pokemon;
	} catch (error) {
		return "Hubo un error al obtener el pokemon";
	}
}

export { getPokemon, getSpecies };
