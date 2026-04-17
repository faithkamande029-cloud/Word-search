const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const url =  "https://random-word-api.herokuapp.com/word?number=5";

const definition = document.querySelector("#definition");
const button = document.getElementById("s-btn");
const clearHistory = document.getElementById("clear-history");
const searchStore = document.getElementById("search-store"), 
    h2 = document.querySelector("h2");

h2.innerHTML = localStorage.getItem("value")


button.addEventListener('click', (event) => {
    // prevents page from automaticly reloading
    event.preventDefault();     

    let searchWord = searchStore.value;    

    fetch(`${baseUrl}${searchWord}`)
    .then(response => {
        if(!response.ok){
            throw new Error("HTTP error" + response.status)
        }
        return response.json();

    })   
    .then(data => {
        if (data === null){
            throw new Error("Word not found")
        }
        const html = ` 
            <div class="def">
                <h4>${searchWord}</h4>
                <button id="sound" >
                    <span class="material-symbols-outlined">text_to_speech</span>
                </button>
                </div>
                <div class="define">
                <div class="noun">
                    <p>${data[0].meanings[0].partOfSpeech || "part of speech not found"}</p>
                    <p>/${data[0].phonetic || "Pronunciation not found"}/</p>
                </div>
                <div class="defined-word">
                    <p class="def-word">
                        <strong>Definition: </strong> ${data[0].meanings[0].definitions[0].definition}
                    </p>
                </div>
                <div class="context">
                    <strong>Sentence: </strong><p>${data[0].meanings?.[0]?.definitions[0].example || "Example is unavailable"}</p>
                </div>
                <div class="synonyms">
                    <p><strong>Synonyms</strong>: ${data[0].meanings?.[2]?.synonyms[0] || "No synonyms available"}</p>
                </div>
            </div> 
                  
        `;
        definition.innerHTML = html;


        //event listener for the text to speech button
        const audio = document.getElementById('sound');

        audio.addEventListener("click", () => {
            let audioLink = data[0].phonetics[0].audio;

            if (audioLink){
                const speechAudio = new Audio(audioLink);
                speechAudio.play().catch(error => console.log(error));
            }else{
                alert("No audio available")
            }
        });
        
        saveWordDisplay();      
        
    })
    .catch(error => {        
        showError(error.message);  
    });
});


function saveWordDisplay () {
    localStorage.setItem('value', searchStore.value);
    h2.innerHTML = localStorage.getItem("value") || "";
}

clearHistory.addEventListener("click",(event) => {
    event.preventDefault();
    
    //clears one item after the other in local storage
    localStorage.removeItem("value");
    h2.innerHTML = "";
    
    alert("History cleared");
});

function getNewWord(){
    const randomWord = document.getElementById("word-highlight");

    fetch(url)
    .then(response => response.json())
    .then (data => {
        const word = data[0];
        const dataHtml = `
         <h5>Word of the day:</h5>
         <p class="word-posted">${word}</p>
         <button id="word-today">Get new word</button>
        `; 
        randomWord.innerHTML = dataHtml;        
    })
    .catch(error => 
        {console.error("Invalid!",error);
    });
    
}
document.getElementById("word-today")
    .addEventListener("click", getNewWord);

