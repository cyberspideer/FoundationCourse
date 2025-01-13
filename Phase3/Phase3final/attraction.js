const API_URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=297704&currency=USD&lang=en_US&lunit=km&limit=11";
const RAPIDAPI_HOST = "travel-advisor.p.rapidapi.com";
const RAPIDAPI_KEY = "7db3634b6msh25d0aff81e0b7f5p1ac4dejsnbdbc84d9d9af";

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
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function populateAttractions() {
  const attractionsContainer = document.getElementById("attractions");
  const attractions = await fetchAttractions();

  if (!attractions || attractions.length === 0) {
    attractionsContainer.innerHTML = "<p>No attractions found.</p>";
    return;
  }

  const maxAttractions = Math.min(attractions.length, 20);

  for (let i = 0; i < maxAttractions; i++) {
    const attraction = attractions[i];
    const card = document.createElement("div");
    card.classList.add("attraction-card");

    card.innerHTML = `
      <div class="placeholder">
        <img src="${
           attraction.photo ? attraction.photo.images.large.url : "default.jpg"
        }" alt="${attraction.name}">
      </div>
    <h3>${attraction.name || "Attraction"}</h3>
      <p>${attraction.description || "No description available."}</p>
    `;

    attraction.photo && attraction.description
      ? attractionsContainer.appendChild(card)
      : null;
  }
}

document.addEventListener("DOMContentLoaded", populateAttractions);
