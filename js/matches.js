"use strict";

const peopleContainer = document.querySelector("#peoplelist");
const filterContainer = document.querySelector(".filters");

let allPeople = [];

let activeFilters = {
  eyeColor: null,
  hairColor: null,
  ageRange: null,
  gender: null,
};

fetch(`https://dummyjson.com/users`)
  .then((response) => response.json())
  .then((data) => {
    allPeople = data.users;
    showPeople(allPeople);
    buildFilterUI();
  });

function buildFilterUI() {
  filterContainer.innerHTML = `
  <div class="filter-group">
  <button class="filter-toggle" data-group="gender">Gender ▾</button>
  <div class="filter-dropdown hidden" id="dropdown-gender">
    ${["male", "female"].map((g) => `<button class="filter-option" data-type="gender" data-value="${g}">${g === "male" ? "Male" : "Female"}</button>`).join("")}
  </div>
</div>  
  
  <div class="filter-group">
      <button class="filter-toggle" data-group="eyeColor">Eye color ▾</button>
      <div class="filter-dropdown hidden" id="dropdown-eyeColor">
        ${["brown", "blue", "green", "gray", "hazel", "amber"].map((color) => `<button class="filter-option" data-type="eyeColor" data-value="${color}">${color}</button>`).join("")}
      </div>
    </div>

    <div class="filter-group">
      <button class="filter-toggle" data-group="hairColor">Hair Color ▾</button>
      <div class="filter-dropdown hidden" id="dropdown-hairColor">
        ${["black", "brown", "blonde", "red", "gray", "white", "purple", "green", "blue"].map((color) => `<button class="filter-option" data-type="hairColor" data-value="${color}">${color}</button>`).join("")}
      </div>
    </div>

    <div class="filter-group">
      <button class="filter-toggle" data-group="ageRange">Age ▾</button>
      <div class="filter-dropdown hidden" id="dropdown-ageRange">
        ${[
          { label: "20–30", value: "20-30" },
          { label: "30–40", value: "30-40" },
          { label: "40–50", value: "40-50" },
          { label: "50+", value: "50-99" },
        ]
          .map((r) => `<button class="filter-option" data-type="ageRange" data-value="${r.value}">${r.label}</button>`)
          .join("")}
      </div>
    </div>

    <button class="filter-reset" id="resetBtn">✕ Reset</button>
  `;

  document.querySelectorAll(".filter-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.group;
      const dropdown = document.getElementById(`dropdown-${group}`);
      dropdown.classList.toggle("hidden");
    });
  });

  document.querySelectorAll(".filter-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const value = btn.dataset.value;

      if (activeFilters[type] === value) {
        activeFilters[type] = null;
        btn.classList.remove("active");
      } else {
        document.querySelectorAll(`.filter-option[data-type="${type}"]`).forEach((b) => b.classList.remove("active"));
        activeFilters[type] = value;
        btn.classList.add("active");
      }

      applyFilters();
    });
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    activeFilters = { eyeColor: null, hairColor: null, ageRange: null };
    document.querySelectorAll(".filter-option").forEach((b) => b.classList.remove("active"));
    showPeople(allPeople);
  });
}

function applyFilters() {
  let filtered = allPeople;

  if (activeFilters.eyeColor) {
    filtered = filtered.filter((p) => p.eyeColor?.toLowerCase() === activeFilters.eyeColor);
  }

  if (activeFilters.hairColor) {
    filtered = filtered.filter((p) => p.hair?.color?.toLowerCase() === activeFilters.hairColor);
  }

  if (activeFilters.ageRange) {
    const [min, max] = activeFilters.ageRange.split("-").map(Number);
    filtered = filtered.filter((p) => p.age >= min && p.age <= max);
  }

  if (activeFilters.gender) {
    filtered = filtered.filter((p) => p.gender === activeFilters.gender);
  }

  showPeople(filtered);
}

function showPeople(peoplearr) {
  if (peoplearr.length === 0) {
    peopleContainer.innerHTML = `<p class="no-results">Ingen matcher fundet. Prøv et andet filter.</p>`;
    return;
  }

  peopleContainer.innerHTML = peoplearr
    .map(
      (people) => `
    <div class="card">
      <div class="${people.gender === "male" ? "bluebg" : "pinkbg"}">
        <img class="${people.gender === "male" ? "blue" : "pink"}" 
             src="${people.image}" 
             alt="${people.firstName} ${people.lastName}" />
      </div>
      <div>
        <h3>${people.firstName} ${people.lastName}</h3>
        <p class="age">${people.age} år</p>
        <p class="location">${people.address.state}</p>
        <a class="btn" href="profile.html?id=${people.id}">Wanna match?</a>
      </div>
    </div>`,
    )
    .join("");
}
