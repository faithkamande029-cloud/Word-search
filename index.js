const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const definition = document.querySelector(".def");
const textToSpeech = document.getElementById("text-to-speech");
const searchButton = document.getElementById("button");
const clearHistory = document.getElementById("clear-history");
const storeSearch = document.getElementById("search-store");
// const searchStore = document.getElementById("search-store")

const history = {};

searchButton.addEventListener('click', (event) => {
    // prevents page from automaticly reloading
    event.preventDefault(); 

    let storeSearch = storeSearch.value;

    fetch(`${baseUrl}${storeSearch}`)
    .then(response => response.json())
    .then(data => {
        definition.innerHTML = `
                  <div id= "definition" class="definition">
                <div class="def">
                    <h4>${storeSearch}</h4>
                    <button><span class="material-symbols-outlined">text_to_speech</span></button>
                </div>
                <div class="define">
                    <div class="noun">
                        <p>noun</p>
                        <p>/Sample/</p>
                    </div>
                    <div class="defined-word">
                        <p class="def-word">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt quo aut voluptatibus temporibus nisi maxime dicta necessitatibus tempore suscipit maiores quia minus, hic laboriosam architecto fugit obcaecati reiciendis quidem est?
                        </p>
                    </div>
                    <div class="context">
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div class="translate">
                        <p><strong>Swahili</strong>: Lorem, ipsum dolor.</p>
                    </div>
                </div>                
                
            </div>
        `;
    })
    .catch(error => console.error("Word not found", error));

    const searchArrays = Array.prototype.slice.call(event.target.elements);

    searchArrays.forEach((element) => {

        if (element.name) {
            history[element.name] = element.value;
        }
        
    });

    localStorage.setItem('history', JSON.stringify(history));
})
// storeSearch.addEventListener("click", searchArrays);

// 
// clearHistory.addEventListener('click', (event) => {
//     event.preventDefault();

//     form.reset();
// })
// clearHistory(history)