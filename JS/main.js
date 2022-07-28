
document.addEventListener("DOMContentLoaded", function () {
    mostrarPokemon(Math.floor(Math.random() * 850))
});


const url = 'https://pokeapi.co/api/v2/pokemon/'

const mostrarPokemon = async (idPokemon) => {

    let dataPokemon = await getPokemon(idPokemon);

    let tipoPokemon = htmlTipo(dataPokemon.types[0].type.name);

    let habilidades = getHabilidades(dataPokemon)
    let habilidadesPokemon = htmlHabilidades(habilidades);

    let nombreUpper = dataPokemon.name.toUpperCase()

    let datosPokemon = document.getElementById("contenidoPokemon");
    datosPokemon.innerHTML = `
    <div id="contenido" class="w-50 d-flex justify-content-center align-items-center" value="${dataPokemon.id}">
                <div class="w-75">
                    <div class="d-flex bg-azul" id="data-1">
                        <div class="w-50 p-1">
                            <div class="fw-bold d-flex justify-content-center align-items-center">
                                Altura
                            </div>
                            <div id="alturaPokemon" class="d-flex justify-content-center align-items-center">
                                ${dataPokemon.height} m
                            </div>
                        </div>
                        <div class="w-50 p-1">
                            <div class="fw-bold d-flex justify-content-center align-items-center">
                                Peso
                            </div>
                            <div id="pesoPokemon" class="d-flex justify-content-center align-items-center">
                            ${dataPokemon.weight} kg
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="bg-azul py-1 px-3" style="border-radius: 10px;">Tipo</div>
                        <div id="caja-habilidades" class="my-1">
                            ${tipoPokemon}
                        </div>
                        <div class="bg-azul py-1 px-3" style="border-radius: 10px;">Habilidades</div>
                        <div id="caja-habilidades" class="my-1">
                            ${habilidadesPokemon}
                        </div>
                    </div>
                </div>
            </div>
            <div id="foto" class="w-50">
                <div class="d-flex justify-content-center align-items-center">
                    <img class="w-50"
                    src="${dataPokemon.sprites.front_default}" alt="">
                </div>
                <div>
                    <h2 class="text-center" id="nombrePokemon">
                        ${nombreUpper}
                    </h2>
                    <h2 class="text-end mx-3  p-0 w-auto" id="noPokemon">
                        No. ${dataPokemon.id}
                    </h2>
                </div>
            </div>
    `;

    let dataPokemonIzq = await getPokemon(getPokemonIzq(idPokemon));

    let dataPokemonDer = await getPokemon(getPokemonDer(idPokemon));

    let footer = document.getElementById("footer");
    footer.innerHTML = `
    <div class="btn-bottom">
        <button class="btn-pknum" id="btn-izquierdo" onclick="irPokemonIzq(${dataPokemon.id})">
            <span class="material-symbols-outlined">${dataPokemonIzq.name}</span>
            <div class="numero">N°</div>
            <div id="noPokemonIzq" class="numero">${dataPokemonIzq.id}</div>
        </button>
        <img class="uni" src="./img/pokemonunite.png">
        <button class="btn-pknum" id="btn-derecho" onclick="irPokemonDer(${dataPokemon.id})">
            <div class="numero">N°</div>
            <div id="noPokemonDer" class="numero">${dataPokemonDer.id}</div>
            <span class="material-symbols-outlined">${dataPokemonDer.name}</span>
        </button>
    </div>
    `;
}

const irPokemonIzq = async (idPokemonActual) => {
    let mostrar = await mostrarPokemon(idPokemonActual)
    console.log(mostrarPokemon(mostrar))
}

const irPokemonDer = (idPokemonActual) => {
    mostrarPokemon(idPokemonActual)
}

const getPokemonIzq = (idPokemon) => {
    if ((idPokemon - 1) == 0) {
        return 850
    } else {
        return idPokemon - 1
    }
}

const getPokemonDer = (idPokemon) => {
    if ((idPokemon + 1) == 851) {
        return 1
    } else {
        return idPokemon + 1
    }
}

const getPokemon = async (idPokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

const getHabilidades = (pokemon) => {
    let habilidades = [];
    for (let index = 0; index < pokemon.abilities.length; index++) {
        habilidades[index] = pokemon.abilities[index].ability.name
    }
    return habilidades
}

const htmlHabilidades = (habilidades) => {
    let htmlHabilidades = "";
    for (let index = 0; index < habilidades.length; index++) {
        htmlHabilidades += `<span class="m-1 badge text-bg-light">${habilidades[index]}</span>`;
    }

    return htmlHabilidades
}

const htmlTipo = (typePokemon) => {
    let htmlTypePokemon = "";
    switch (typePokemon) {
        case 'grass':
            htmlTypePokemon += '<span class="m-1 badge bg-planta">Grass</span>';
            break;
        case 'water':
            htmlTypePokemon += '<span class="m-1 badge bg-agua">Water</span>';
            break;
        case 'bug':
            htmlTypePokemon += '<span class="m-1 badge bg-bicho">Bug</span>';
            break;
        case 'dragon':
            htmlTypePokemon += '<span class="m-1 badge bg-dragon">Dragon</span>';
            break;
        case 'electric':
            htmlTypePokemon += '<span class="m-1 badge bg-electrico">Electric</span>';
            break;
        case 'ghost':
            htmlTypePokemon += '<span class="m-1 badge bg-fantasma">Ghost</span>';
            break;
        case 'fire':
            htmlTypePokemon += '<span class="m-1 badge bg-fuego">Fire</span>';
            break;
        case 'fairy':
            htmlTypePokemon += '<span class="m-1 badge bg-hada">Fairy</span>';
            break;
        case 'ice':
            htmlTypePokemon += '<span class="m-1 badge bg-hielo">Ice</span>';
            break;
        case 'fighting':
            htmlTypePokemon += '<span class="m-1 badge bg-lucha">Fighting</span>';
            break;
        case 'normal':
            htmlTypePokemon += '<span class="m-1 badge bg-normal">Normal</span>';
            break;
        case 'psychic':
            htmlTypePokemon += '<span class="m-1 badge bg-psiquico">Psychic</span>';
            break;
        case 'rock':
            htmlTypePokemon += '<span class="m-1 badge bg-roca">Rock</span>';
            break;
        case 'ground':
            htmlTypePokemon += '<span class="m-1 badge bg-tierra">Ground</span>';
            break;
        case 'poison':
            htmlTypePokemon += '<span class="m-1 badge bg-veneno">Poison</span>';
            break;
        case 'flying':
            htmlTypePokemon += '<span class="m-1 badge bg-volador">Flying</span>';
            break;
        case 'steel':
            htmlTypePokemon += '<span class="m-1 badge bg-acero">Steel</span>';
            break;
        case 'dark':
            htmlTypePokemon += '<span class="m-1 badge bg-oscuro">Dark</span>';
            break;
        default:
            break;
    }
    return htmlTypePokemon
}

const refrescar = ()=>{
    mostrarPokemon(Math.floor(Math.random() * 850))
}
