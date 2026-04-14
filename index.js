const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const definition = document.querySelector(".definition");
const button = document.getElementById("s-btn");
const clearHistory = document.getElementById("clear-history");
const searchStore = document.getElementById("search-store");


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

        const audio = document.getElementById('sound');

        audio.addEventListener("click", () =>{
            let audioLink = data[0].phonetics[0].audio;

            if (audioLink){
                const speechAudio = new Audio(audioLink);
                speechAudio.play();
            }else{
                alert("No audio available")
            }
        });
        
        
    })
    .catch(error => {console.error("Faaah.....Word not Found!",error);
    });
    saveIn();
    savedWord();
});

function saveIn (){
    let history = document.getElementById("search-store").value;

    let storedWords = JSON.parse(localStorage.getItem("search")) || [];

    if (history) {
        storedWords.push(history);
        localStorage.setItem("word", JSON.stringify(history));
        alert("Search Saved!");
    }
}
function savedWord () {
    let saved = JSON.parse(localStorage.getItem("word") || []);

    const list = document.getElementById("history-list");

    list.innerHTML = "";
    

    if (saved.length > 0){
        saved.forEach(element => {
            const li = document.createElement("li");
            li.textContent = (history[i]);
            list.appendChild(li);
        });

    } else {
        list.innerText = "No such word found";
    }
};


// clearHistory.addEventListener("click",() =>{
    
//     localStorage.clear("search")
//     alert("History cleared")
// });
