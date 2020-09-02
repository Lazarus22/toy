let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const TOYURL = 'http://localhost:3000/toys'

  const getToys = () => {
    fetch(TOYURL)
    .then(resp => resp.json())
    .then(renderToys)
  }
  
  const renderToys = (toys) => {
    for (const toy of toys){
      renderToy(toy)
    }
  }

  const renderToy = (toyObj) => {
   const toyDiv = document.querySelector('#toy-collection')
   const toyCard = document.createElement('div') 
   toyCard.className = 'card'
   toyCard.innerHTML = `
   <h2>${toyObj.name}</h2>
   <img src='${toyObj.image}' class="toy-avatar" />
   <p> ${toyObj.likes} </p>
   <button class="like-btn" data-id='${toyObj.id}'>Like <3</button>
  `
  toyDiv.append(toyCard)
  }    

getToys()

function likes(e) {
 
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": likes
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}
function clicker() {
  document.addEventListener("click", (e) => {
    console.log("you are in the clicker")
    console.log(e.target)
    if (e.target.className == "like-btn"){
      const id = e.target.dataset.id
      const likes = parseInt(e.target.previousElementSibling.innerText) + 1
      e.target.previousElementSibling.innerText = likes
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
  
        },
        body: JSON.stringify({
          "likes": likes
        })
      })
      // .then(resp => resp.json())
      // .then(console.log)
    } // this is the end of my if statement

  })//this is the eventlistener

}//this is the end of my clicker
function form (){
 const form = document.querySelector('form')
 form.addEventListener("submit", (e) => {
  e.preventDefault()
  const toy = {
    name: form.name.value, 
    image: form.image.value,
    likes: 0
  }
  console.log(toy)

  fetch(`http://localhost:3000/toys/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify(
      toy
    )
  })


 }

 )

}

form()
clicker()

})
