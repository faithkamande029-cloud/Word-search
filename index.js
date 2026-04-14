const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const definition = document.querySelector(".definition");
const textToSpeech = document.getElementById("text-to-speech");
const button = document.getElementById("s-btn");
const clearHistory = document.getElementById("clear-history");
const searchStore = document.getElementById("search-store");
// const searchStore = document.getElementById("search-store")


button.addEventListener('click', (event) => {
    // prevents page from automaticly reloading
    event.preventDefault(); 

    let searchWord = searchStore.value;
    console.log(searchWord);


    fetch(`${baseUrl}${searchWord}`)
    .then(response => response.json())   
    .then(data => {
        const html = ` 
            <div class="def">
                <h4>${searchWord}</h4>
                <button><span class="material-symbols-outlined">text_to_speech</span></button>
                </div>
                <div class="define">
                <div class="noun">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <div class="defined-word">
                    <p class="def-word">
                        <strong>Definition: </strong> ${data[0].meanings[0].definitions[0].definition}
                    </p>
                </div>
                <div class="context">
                    <strong>Sentence: </strong><p>${data[0].meanings[0].definitions[0].example}</p>
                </div>
                <div class="translate">
                    <p><strong>Swahili</strong>: ${searchWord}</p>
                </div>
            </div>        
        `;
        definition.innerHTML = html;
        sound.setAttribute(`"src", https:${data[0].phonetics[0].audio}`)
        console.log(sound)
    })
    
    .catch(error => console.error('Error, Word not found', error));
})

const history = {};