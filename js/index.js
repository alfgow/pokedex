import { setPokemon } from "./pokedex.js";

const $form = document.querySelector("#form");
const $next = document.querySelector("#next-pokemon");
const $prev = document.querySelector("#prev-pokemon");
const $pokedex = document.querySelector("#pokedex");
const $xlBtnBlue = document.querySelector("#btn-xlBlue");
const $idText = document.querySelector("#id");

let activePokemon = null;

$form.addEventListener("submit", handleSubmit);
$next.addEventListener("click", handleNextPokemon);
$prev.addEventListener("click", handlePrevPokemon);
$xlBtnBlue.addEventListener("click", randomPokemon);

async function randomPokemon() {
	const id = Math.floor(Math.random() * 896) + 1;
	activePokemon = await setPokemon(id);
	setTimeout(() => {
		$idText.value = id;
	}, 500);
}

async function handleSubmit(event) {
	event.preventDefault();
	const form = new FormData($form);
	const id = form.get("id");
	activePokemon = await setPokemon(id);
}

async function handleNextPokemon() {
	const id =
		activePokemon === null || activePokemon.id.id === 896
			? 1
			: activePokemon.id.id + 1;
	activePokemon = await setPokemon(id);

	$idText.value = id;
}

async function handlePrevPokemon() {
	const id =
		activePokemon === null || activePokemon.id.id === 1
			? 896
			: activePokemon.id.id - 1;
	activePokemon = await setPokemon(id);
	const $idText = document.querySelector("#id");
	$idText.value = id;
}
