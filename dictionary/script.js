let searchBox = document.getElementById('searchBox');
let searchBtn = document.getElementById('searchBtn');
let div = document.getElementById("div");

let content = document.createElement("div");
content.classList.add("fs-3")
div.appendChild(content); 

// function to fetch the response from the api which returns the array of objects in json 
let myFetch = async (word) => {
   try {
      return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
         .then((j) => j.json())
   }
   catch {
      console.log("error from catch");
   }
}

// function for the search button click
let searchBtnClick = () => {

   // To remove the content if already displayed to insert the new
   while (content.hasChildNodes()) {
      content.removeChild(content.firstChild);
   }

   // invoke the function with the arguement in search box value
   myFetch(searchBox.value).then((arrObj) => {
      
      // To print the not found message for the invalid search
      if (arrObj.hasOwnProperty("title")) {
         let divNotFound = document.createElement("div");
         divNotFound.classList.add("text-danger");
         divNotFound.innerHTML = `  ${arrObj.title} <br><br> ${arrObj.message} <br><br> ${arrObj.resolution} `;
         content.appendChild(divNotFound);
         return;
      }

      // To print the searched word
      let divWord = document.createElement("div");
      divWord.classList.add();
      divWord.innerHTML = `<span class="fs-5 fst-italic">Word</span> :  ${arrObj[0].word}`;
      content.appendChild(divWord);

      // To print the audio controls
      if (arrObj[0].hasOwnProperty("phonetics")) {
         arrObj[0].phonetics.map((e,i) => {
            if (e.hasOwnProperty("audio")) {
               let divAudio = document.createElement("div");
               divAudio.classList.add("d-flex","mt-3");
               divAudio.innerHTML = `<span class="fs-5 fst-italic my-auto me-3">Hear </span> <audio controls > <source src="${e.audio}" type="audio/mpeg"></audio> `;
               content.appendChild(divAudio);
               arrObj[0].phonetics.splice(i);
            }
         })
      }

      // To map each of the object in the array 
      arrObj.map((e) => {
               
         // To map each of the element in the meaning         
         e.meanings.map((m) => {
         
            // To print the part of speech and its definition
            let divPartsOfSpeech = document.createElement("div");
            divPartsOfSpeech.classList.add();
            divPartsOfSpeech.innerHTML = `<br><span class="fs-5 fw-bold fst-italic">${m.partOfSpeech}</span> <br> <span class="fs-5 fst-italic">Definition</span> :  ${m.definitions[0].definition}`;
            content.appendChild(divPartsOfSpeech);

            // To print the example
            if (m.definitions[0].hasOwnProperty( "example" )) {
               let divexample = document.createElement("div");
               divexample.classList.add();
               divexample.innerHTML = `<span class="fs-5 fst-italic">Example</span> :  ${m.definitions[0].example} <br>`;
               content.appendChild(divexample);
            }

            // To print the synonyms
            if (m.synonyms.length > 0) {
               let divSynonyms = document.createElement("div");
               divSynonyms.classList.add();
               divSynonyms.innerHTML = `<span class="fs-5 fst-italic">Synonyms</span > : <span class="text-break"> ${m.synonyms}</span >`;
               content.appendChild(divSynonyms);
                             
            }

            // To print the antonyms            
            if (m.antonyms.length > 0) {
               let divAntonyms = document.createElement("div");
               divAntonyms.classList.add();
               divAntonyms.innerHTML = `<span class="fs-5 fst-italic">Antonyms</span> :  ${m.antonyms}`;
               content.appendChild(divAntonyms);
                             
            }
         })
      })
   })  
}

// keyboard event for the enter key 
document.addEventListener("keypress", (event) => {
   if (event.charCode == 13) {
      searchBtnClick();
   }
})
