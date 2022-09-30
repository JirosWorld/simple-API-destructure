import axios from 'axios'

const searchForm = document.getElementById('search-form');
searchForm.addEventListener("submit", searchGame);

const gameInfoBox = document.getElementById('search-results');

function searchGame(e) {
    e.preventDefault();
    const queryField = document.getElementById('query-field');
    //referentie naar async functie
    fetchGameDetails(queryField.value)
    // leegveld na zoekopdracht
    queryField.value = ""
}

// eerste parameter is vraagteken, tweede na ampersand: https://api.rawg.io/api/games?key=${API_KEY}&search=${name}

async function fetchGameDetails(name) {
    try {
        const result = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}`)
        const game=result.data.results[0];
        console.log(game);
        console.log(game.name);
        console.log(game.rating);
        console.log(game.genres[0].name);
        console.log(game.genres[1].name);
        console.log(game.genres[2].name);

        gameInfoBox.innerHTML = `
        <article class="result-box">
            <h2>naam: ${game.name}</h2>
            <p>rating: ${game.rating}</p>
            <p>genres: ${game.genres[0].name}, ${game.genres[1].name}, ${game.genres[2].name}</p>
        </article>
        `

    } catch (e) {
        console.log(e);
    }
}