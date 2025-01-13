const bookedContainer = document.querySelector(".content");

function displayBookedAttractions() {
  const bookedAttractions = JSON.parse(localStorage.getItem("bookedAttractions")) || [];

  if (bookedAttractions.length === 0) {
    bookedContainer.innerHTML = "<p>no booked attractions yet.</p>";
    return;
  }

  bookedContainer.innerHTML = "";

  bookedAttractions.forEach((attraction, index) => {
    const card = document.createElement("div");
    card.classList.add("grid-item");

    card.innerHTML = `
      <div class="placeholder">
        <img src="${attraction.photo ? attraction.photo.images.large.url : "default.jpg"}" alt="${attraction.name}">
      </div>
      <h3>${attraction.name}</h3>
        <p>${attraction.description || "No description available."}</p>
      <button class="pay-now-btn" data-index="${index}">Pay Now</button>
    `;

    card.querySelector(".pay-now-btn").addEventListener("click", () => {
    });

    bookedContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", displayBookedAttractions);
