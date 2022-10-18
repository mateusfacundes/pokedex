function findPokemon(pokemon_name){
    return fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon_name);
}

const form = document.querySelector('#form');

form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
});

async function doSubmit(){
    const pokemon_name = document.querySelector('#pokemon_name').value;
    const display_pokemon = document.querySelector('#display_pokemon');

    const pokemonResponse = await findPokemon(pokemon_name);
    const data = await pokemonResponse.json();

    display_pokemon.innerHTML = '<h3 class="m-3">Nome: '+ data.name +'</h3>';

    displayTypes(data.types, display_pokemon);
    displayMoves(data.moves, display_pokemon);
   
}

function displayTypes(pokemon_types, display_pokemon){
    const types = document.createElement('div');

    display_pokemon.innerHTML += '<h4 class="mt-2 ml-3">Tipos de pokemon: </h4>';
    pokemon_types.map(tyoes =>{
        types.innerHTML += '<h4 class="mt-2 ml-5">'+ tyoes.type.name +'</h4>'
    });

    display_pokemon.append(types);
}

function displayMoves(pokemon_moves, display_pokemon){
    const table = document.createElement('table');
    
    table.classList.add("table");
    display_pokemon.innerHTML += '<h4 class="m-3">Tabela de habilidades</h4>';
    table.innerHTML = '<tr>'+
                        '<th>Nome</td>'+
                        '<th>Metodo de aprendizado</td>'+
                        '<th>Level minimo</td>'+
                      '</tr>';
    pokemon_moves.map(moves => {
        table.innerHTML += '<tr>'+
                                '<td>'+ moves.move.name +'</td>'+
                                '<td>'+moves.version_group_details[0].move_learn_method.name+'</td>'+
                                '<td>'+moves.version_group_details[0].level_learned_at+'</td>'+
                            '</tr>'
    });

    display_pokemon.append(table);
}