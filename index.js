const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const definition = document.querySelector(".definition");
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
    .then(response => response.json())   
    .then(data => {
        const html = ` 
            <div class="def">
                <h4>${searchWord}</h4>
                <button id="sound" >
                    <span class="material-symbols-outlined">text_to_speech</span>
                </button>
                </div>
                <div class="define">
                <div class="noun">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
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
                <div class="translate">
                    <p><strong>Synonyms</strong>: ${data[0].meanings?.[2]?.synonyms[0] || "No synonyms available"}</p>
                </div>
            </div> 
                  
        `;
        definition.innerHTML = html;


        //event listener for the text to speech button
        const audio = document.getElementById('sound');

        audio.addEventListener("click", () =>{
            let audioLink = data[0].phonetics[0].audio;

            if (audioLink){
                const speechAudio = new Audio(audioLink);
                speechAudio.play().catch(error =>clg(error));
            }else{
                alert("No audio available")
            }
        });
        
        saveWordDisplay();
    })
    .catch(error => {console.error("Word not Found!",error);
    });
});



function saveWordDisplay () {
    localStorage.setItem('value', searchStore.value);
    h2.innerHTML = localStorage.getItem("value") || "";
}

clearHistory.addEventListener("click",() => {
    
    //clears one item after the other in local storage
    localStorage.removeItem("word");
    h2.innerHTML = "";
    
    alert("History cleared")
});
