const myFetchAll = async () => {
   try {
      let response = await fetch(
         `https://www.anapioficeandfire.com/api/books?pageSize=50`
      );
      return await response.json();
   }
   catch (err) {
      console.log(err)
   }
};

const myFetchChar = async (c) => {  
   try {
   let response = await fetch(c)
       return await response.json();
   }
   catch (err) {
      console.log(err)
   };
};

let showCharacter = (c) => {
   let mBody = document.getElementById("modal-body");
   let nameArr = [];
   let i = 0;
   for (let j = 0; j < c.length; j++){
      myFetchChar(c[j])
         .then((charObj) => {
            let name = charObj.name;
            if (name.length > 0) {
               i++;
               nameArr.push(`${i} . ${name}`);
            }
         })
   }

   setTimeout(() => {
      if (nameArr.length == 0) {
         mBody.innerHTML = "Characters are not defined in the API / <br>The Request didn't get the Response properly from the API"
      }
      else {
          mBody.innerHTML = nameArr.join(`<br>`);
      }
   }, 1000);
}


myFetchAll()
   .then((arrobj) => {
      arrobj.map((e, i) => {

         let parentDiv = document.createElement("div");
         parentDiv.classList.add("row","my-3", "mx-3", "bg-c");
         document.body.appendChild(parentDiv);

         let childDiv1 = document.createElement("div");
         childDiv1.classList.add("col-xs-10", "col-sm-4", "col-md-3", "col-lg-2", "col-xl-2", "p-2", "text-center","img");
         parentDiv.appendChild(childDiv1);
   
         let childDiv2 = document.createElement("div");
         childDiv2.classList.add("col-xs-12", "col-sm-8", "col-md-9", "col-lg-10", "col-xl-10");
         parentDiv.appendChild(childDiv2);

         let img = document.createElement("img");
         img.classList.add("img-size","rounded-3");
         img.setAttribute("src", `./assets/img${i+1}.jpg`);
         childDiv1.appendChild(img);

         let c2ParentDiv = document.createElement("div");
         c2ParentDiv.classList.add("row");
         childDiv2.appendChild(c2ParentDiv);

         let c2Div1 = document.createElement("div");
         c2Div1.classList.add("col-12","d-flex","flex-wrap","justify-content-around");
         c2ParentDiv.appendChild(c2Div1);

         let c2Div2 = document.createElement("div");
         c2Div2.classList.add("col-sm-12", "col-md-6", "col-lg-6", "col-xl-6");
         c2ParentDiv.appendChild(c2Div2);
         
         let c2Div3 = document.createElement("div");
         c2Div3.classList.add("col-sm-12", "col-md-6", "col-lg-6", "col-xl-6");
         c2ParentDiv.appendChild(c2Div3);

         let c21Div1 = document.createElement("div");
         c21Div1.classList.add( "p-1");
         c21Div1.innerHTML = `<span class="fs-4 my-color fw-bold">${e.name}</span>`
         c2Div1.appendChild(c21Div1);
        
         let c21Div2 = document.createElement("div");
         c21Div2.classList.add( "p-1");
         c21Div2.innerHTML = `<span class="my-color">Published By :  </span>${e.publisher}`
         c2Div1.appendChild(c21Div2);
            
         let c22Div1 = document.createElement("div");
         c22Div1.classList.add("p-1", "text-center");
         c22Div1.innerHTML = `<span class="my-color">Author :  </span>${e.authors}`
         c2Div2.appendChild(c22Div1);

         let c22Div2 = document.createElement("div");
         c22Div2.classList.add("p-1", "text-center");
         c22Div2.innerHTML = `<span class="my-color">No of Pages :  </span>${e.numberOfPages}`
         c2Div2.appendChild(c22Div2);
         
         let c22Div3 = document.createElement("div");
         c22Div3.classList.add("p-1", "text-center");
         c22Div3.innerHTML = `<span class="my-color">ISBN No :  </span>${e.isbn}`
         c2Div2.appendChild(c22Div3);

          let c23Div1 = document.createElement("div");
         c23Div1.classList.add("p-1", "text-center");
         c23Div1.innerHTML = `<span class="my-color">Released On :  </span>${e.released.slice(0,10).split("-").reverse().join("-")}`
         c2Div3.appendChild(c23Div1);

         let c23Div2 = document.createElement("div");
         c23Div2.classList.add("py-3", "text-center");
         c2Div3.appendChild(c23Div2);
            
         let showBtn = document.createElement("button");
         showBtn.classList.add("p-1", "btn", "btn-outline-success", "my-btn");
         showBtn.setAttribute("data-bs-toggle","modal")
         showBtn.setAttribute("data-bs-target","#cModal")
         showBtn.innerHTML = `<span class="fw-bold">Show Characters</span>`
         c23Div2.appendChild(showBtn);

         showBtn.addEventListener("click", () => {
         showCharacter(e.characters)
      })
         
      })
   })


let searchBar = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
let searchWikiBtn = document.getElementById("searchWikiBtn")
let link = "https://en.wikipedia.org/wiki/";

onchange = () => {
   if (searchBar.value.length > 0) {
      window.find(searchBar.value)
   }
}

searchWikiBtn.addEventListener("click", () => {
    if (searchBar.value.length > 0) {
      location.href = link + searchBar.value;
   }
})

