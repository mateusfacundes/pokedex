function findPokemon(url) {
    return fetch(url)
        .then((data) => {
            return data.json();
        }).catch(error => {
            showErrorToast("Erro to find pokemon!");
            throw error
        })
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

async function findPokemons() {
    let pokemonName = document.getElementById("pokemon_name").value;
    console.log(pokemonName)
    let data = await findPokemon(`http://localhost:8080/pokemons?query=${pokemonName}`)
    renderPokemonsList(data)
}

const findPokemonsDebounce = debounce(() => findPokemons());

function renderPokemonsList(data) {
    const pokemonsList = document.querySelector('#pokemons_list');
    pokemonsList.innerHTML = data.map(pokemon => `
        <div 
            class="badge rounded-pill text-bg-primary pokemon-chip"
            data-url="${pokemon.url}"
        >
            ${pokemon.name}
        </div>
    `).join('');

    document.querySelectorAll('.pokemon-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            getPokemon(chip.dataset.url);
        });
    });
}

async function getPokemon(url) {
    
    // const pokemon_name = document.querySelector('#pokemon_name').value;
    const display_pokemon = document.querySelector('#display_pokemon');

    const data = await findPokemon(url);

    display_pokemon.innerHTML = `
                        <img class="pokemon-image" src="${data?.sprites?.other?.showdown?.front_default}"
                            alt="${data.name}">
                        <div class="pokemon-info">
                            <div class="pokemon-name">${data.name}</div>
                            <div class="container" style="text-align: center;">
                                <div class="row">
                                    ${displayTypes(data.types)}
                                </div>
                            </div>
                        </div>
                    `
}

function displayTypes(pokemon_types) {
    const typeColors = {
        "normal": "#A8A878",
        "fire": "#F08030",
        "water": "#6890F0",
        "electric": "#F8D030",
        "grass": "#78C850",
        "ice": "#98D8D8",
        "fighting": "#C03028",
        "poison": "#A040A0",
        "ground": "#E0C068",
        "flying": "#A890F0",
        "psychic": "#F85888",
        "bug": "#A8B820",
        "rock": "#B8A038",
        "ghost": "#705898",
        "dragon": "#7038F8",
        "dark": "#705848",
        "steel": "#B8B8D0",
        "fairy": "#EE99AC"
    };

    return pokemon_types.map(tyoes => {
        const color = typeColors[tyoes.type.name.toLowerCase()] || "#777";
        return `<div class="pokemon-type" style="background-color: ${color}; color: white;">${tyoes.type.name}</div>`
    }).join("")
}

function showErrorToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toastDiv = document.createElement('div');
    toastContainer.innerHTML = `
        <div class="toast align-items-center text-white bg-danger border-0 position-fixed top-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        </div>
    `;
    toastContainer.appendChild(toastDiv);

    const toastElement = toastContainer.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 5000
    });

    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
        toastContainer.remove();
    });
}
