function findPokemon(pokemon_name) {
    return fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon_name)
        .then((data) => {
            return data.json();
        }).catch(error => {
            showErrorToast("Erro to find pokemon!");
            throw error
        })
}

const form = document.querySelector('#form');

form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
});

async function doSubmit() {
    const pokemon_name = document.querySelector('#pokemon_name').value;
    const display_pokemon = document.querySelector('#display_pokemon');

    const data = await findPokemon(pokemon_name);

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

// function displayMoves(pokemon_moves, display_pokemon) {
//     const table = document.createElement('table');

//     table.classList.add("table");
//     display_pokemon.innerHTML += '<h4 class="m-3">Tabela de habilidades</h4>';
//     table.innerHTML = '<tr>' +
//         '<th>Nome</td>' +
//         '<th>Metodo de aprendizado</td>' +
//         '<th>Level minimo</td>' +
//         '</tr>';
//     pokemon_moves.map(moves => {
//         table.innerHTML += '<tr>' +
//             '<td>' + moves.move.name + '</td>' +
//             '<td>' + moves.version_group_details[0].move_learn_method.name + '</td>' +
//             '<td>' + moves.version_group_details[0].level_learned_at + '</td>' +
//             '</tr>'
//     });

//     display_pokemon.append(table);
// }

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
