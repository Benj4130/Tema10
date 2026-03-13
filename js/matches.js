"use strict";

// const params = new URLSearchParams(window.location.search);
// const category = params.get("category");

const peopleContainer = document.querySelector("#peoplelist");

fetch(`https://dummyjson.com/users`).then((response) =>
  response.json().then((data) => {
    showPeople(data.users);
  }),
);

function showPeople(peoplearr) {
  peopleContainer.innerHTML = "";
  peoplearr.forEach((people) => {
    peopleContainer.innerHTML += `<div class="card">
          <div class="${people.gender === "male" ? "bluebg" : "pinkbg"}">
            <img class="${people.gender === "male" ? "blue" : "pink"}" src="${people.image}" alt="A picture of ${people.firstName} ${people.lastName}'s avatar" />
          </div>
          <div>
            <h3>${people.firstName} ${people.lastName}</h3>
            <p class="age">${people.age} years old</p>
            <p class="location">${people.address.state}</p>
            <a class="btn" href="profile.html">Wanna match?</a>
          </div>
        </div>`;
  });
}
