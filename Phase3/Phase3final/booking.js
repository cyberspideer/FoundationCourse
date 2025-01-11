const btnInput = document.getElementById("btnInput");
const roomType = document.getElementById("roomType");

const API_URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=297704&currency=USD&lang=en_US&lunit=km&limit=8";
const RAPIDAPI_HOST = "travel-advisor.p.rapidapi.com";
const RAPIDAPI_KEY = "7d9e6fdc39msh0f8966da609d6adp1a76ffjsna366989208fc";

let allAttractions = [];
let currentPage = 1;
const itemsPerPage = 6;

// api
async function fetchAttractions() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": RAPIDAPI_HOST,
        "X-RapidAPI-Key": RAPIDAPI_KEY,
      },
    });

    if (!response.ok) throw new Error(`API call failed: ${response.status}`);

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function populateAttractions() {
  const attractionsContainer = document.getElementById("attractions");
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAttractions = allAttractions.slice(startIndex, endIndex);

  attractionsContainer.innerHTML = "";

  if (paginatedAttractions.length === 0) {
    attractionsContainer.innerHTML = "<p>No attractions found.</p>";
    return;
  }

  paginatedAttractions.forEach((attraction) => {
    const card = document.createElement("div");
    card.classList.add("grid-item");

    card.innerHTML = `
      <div class="placeholder">
        <img src="${
          attraction.photo ? attraction.photo.images.large.url : "default.jpg"
        }" alt="${attraction.name}">
      </div>
      <h3>${attraction.name || "Attraction"}</h3>
      <p>${attraction.description || "No description available."}</p>
    `;

    attractionsContainer.appendChild(card);
  });

  updatePaginationControls();
}

function updatePaginationControls() {
  const totalPages = Math.ceil(allAttractions.length / itemsPerPage);
  const pageInfo = document.getElementById("pageInfo");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

function changePage(delta) {
  currentPage += delta;
  populateAttractions();
}

function searchAttractions() {
  const searchValue = roomType.value.trim().toLowerCase();

  if (!searchValue) {
    allAttractions = allAttractions;
  } else {
    allAttractions = allAttractions.filter(
      (attraction) =>
        attraction.name && attraction.name.toLowerCase().includes(searchValue)
    );
  }

  currentPage = 1;
  populateAttractions();
}

async function initAttractions() {
  allAttractions = await fetchAttractions();
  populateAttractions();
}

btnInput.addEventListener("click", searchAttractions);
document
  .getElementById("prevPage")
  .addEventListener("click", () => changePage(-1));
document
  .getElementById("nextPage")
  .addEventListener("click", () => changePage(1));

document.addEventListener("DOMContentLoaded", initAttractions);

const checkInInput = document.querySelector('input[placeholder="Check-in"]');
const checkOutInput = document.querySelector('input[placeholder="Check-out"]');

btnInput.addEventListener("click", function () {
const checkInDate = checkInInput.value;
  const checkOutDate = checkOutInput.value;

  
  document.querySelectorAll(".error-message").forEach((msg) => msg.remove());

  
  if (!checkInDate || !checkOutDate) {
    const errorMessage = document.createElement("p");
  errorMessage.textContent = "Both start and end dates are required.";
  errorMessage.classList.add("error-message");
    errorMessage.style.color = "red";
    errorMessage.style.marginTop = "10px";
    btnInput.parentElement.appendChild(errorMessage);
    return;
  }
  
  searchAttractions();
});