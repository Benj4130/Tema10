"use strict";

const params = new URLSearchParams(window.location.search);
const userId = params.get("id") || 1;

fetch(`https://dummyjson.com/users/${userId}`)
  .then((response) => response.json())
  .then((user) => {
    showUser(user);
  });

function showUser(user) {
  document.querySelector("#user-image").src = user.image;

  document.querySelector("#user-name").textContent =
    user.firstName + " " + user.lastName;

  document.querySelector("#user-age-city").textContent =
    user.age + " years old in " + user.address.state;

  document.querySelector("#tag-eye").textContent = user.eyeColor + " eyes";

  document.querySelector("#tag-hair-type").textContent =
    user.hair.type + " hair";

  document.querySelector("#tag-hair-color").textContent =
    user.hair.color + " hair";

  document.querySelector("#user-height").textContent = user.height + " cm";

  document.querySelector("#user-hair-type").textContent = user.hair.type;

  document.querySelector("#user-work").textContent = user.company.title;

  document.querySelector("#user-eye").textContent = user.eyeColor;
}
