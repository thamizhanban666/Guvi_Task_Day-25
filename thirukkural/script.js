let searchBox = document.getElementById('searchBox');
let searchBtn = document.getElementById('searchBtn');
let div = document.getElementById("div");

let content = document.createElement("div");
content.classList.add("fs-4", "fst-italic");
div.appendChild(content); 

// function to fetch the response from the api which returns the object in json 
let myFetch = async (num) => {
   try {
      return await fetch(`https://api-thirukkural.vercel.app/api?num=${num}`)
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
   document.getElementById("p").style.display = "none";

   // To print the not found message for the invalid search
   if (searchBox.value > 1330 || searchBox.value < 1) {
      let divInvalid = document.createElement("div");
      divInvalid.classList.add("text-danger","my-5","text-center");
      divInvalid.innerHTML = `<span class="fs-5 fw-bold"> 1 முதல் 1330 வரையிலான எண்ணை மட்டும் உள்ளிடவும் </span> <br>  Enter a number only from 1 to 1330`;
      content.appendChild(divInvalid);
      return;
   }

   // invoke the function with the arguement in search box value
   myFetch(searchBox.value).then((obj) => {

      // To print the details of the thirukkural
      let divDetails = document.createElement("div");
      divDetails.classList.add("my-3","text-center");
      divDetails.innerHTML = `
      <span class="fs-5 fw-bold">குறள் எண்</span> / Kural number : ${obj.number} <br><br>
      <span class="fs-5 fw-bold">பால்</span> : <span class="fs-5 fw-bold text-primary">${obj.sect_tam}</span> <br> 
      Section : ${obj.sect_eng} <br><br>  
      <span class="fs-5 fw-bold">அதிகாரம்</span> : <span class="fs-5 fw-bold text-primary">${obj.chapgrp_tam}</span> <br>
      Chapter : ${obj.chapgrp_eng} <br><br>
      <span class="fs-5 fw-bold text-primary">${obj.chap_tam}</span> - ${obj.chap_eng}
      `;
      content.appendChild(divDetails);
 
      // To print the two lines of the thirukkural
      let divlines = document.createElement("div");
      divlines.classList.add("text-center","my-5");
      divlines.innerHTML = ` 
      <span class="fs-4 fw-bold dark-blue">" ${obj.line1}</span> <br>
      <span class="fs-4 fw-bold dark-blue">${obj.line2} "</span> <br>
      `;
      content.appendChild(divlines);

      // To print the explanation
      let divExplanation = document.createElement("div");
      divExplanation.classList.add("text-center","my-5");
      divExplanation.innerHTML = `
      <span class="fs-5 fw-bold">விளக்கம்</span> : <span class="fs-5 fw-bold text-primary">${obj.tam_exp}</span> <br><br>
      Explanation : ${obj.eng_exp}   
      `;
      content.appendChild(divExplanation);
   })
}

// keyboard event for the enter key 
document.addEventListener("keypress", (event) => {
   if (event.charCode == 13) {
      searchBtnClick();
   }
})
