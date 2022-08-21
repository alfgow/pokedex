const BASE_API = `https://pokeapi.co/api/v2/`;

async function getPokemon(id) {
	try {
		const response = await fetch(`${BASE_API}pokemon/${id}`);
		const pokemon = await response.json();
		return pokemon;
	} catch (error) {
		return "Hubo un error al obtener el pokemon";
	}
}

async function getSpecies(id) {
	try {
		const response = await fetch(
			`${BASE_API}pokemon-species/${id}`
		);
		const pokemon = await response.json();
		return pokemon;
	} catch (error) {
		return "Hubo un error al obtener el pokemon";
	}
}

export { getPokemon, getSpecies };
