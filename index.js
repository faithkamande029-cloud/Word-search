const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const definition = document.querySelector(".definition");
const textToSpeech = document.querySelector("text-to-speech");
const button = document.getElementById("s-btn");
const clearHistory = document.getElementById("clear-history");
const searchStore = document.getElementById("search-store");
const audio = document.getElementById('sound')


button.addEventListener('click', (event) => {
    // prevents page from automaticly reloading
    event.preventDefault(); 

    let searchWord = searchStore.value;

    fetch(`${baseUrl}${searchWord}`)
    .then(response => response.json())   
    .then(data => {
        const html = ` 
            <div class="def">
                <h4>${searchWord}</h4>
                <button id="sound" onClick="textToSpeech()">
                    <span class="material-symbols-outlined">text_to_speech</span>
                </button>
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

        
        
    })
    
    .catch(error => {
        console.log(error);
        console.log(error.message)
    });
});

textToSpeech.addEventListener("click", () => {
    const audioLink = ( `https:${data[0].phonetics[0].audio}`);
    const audio = new Audio(audioLink);
    audio.play();
})


// const history = {};