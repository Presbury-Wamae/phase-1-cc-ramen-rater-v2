// index.js


// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detailImg = document.querySelector("#ramen-detail .detail-image");
  const detailName = document.querySelector("#ramen-detail .name");
  const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  // Update their content with the clicked ramen's data
  detailImg.src = ramen.image;
  detailImg.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById("new-ramen");

  form.addEventListener("submit", event => {
    event.preventDefault();

    // Get form values
    const newRamen = {
      name: document.getElementById("new-name").value,
      restaurant: document.getElementById("new-restaurant").value,
      image: document.getElementById("new-image").value,
      rating: document.getElementById("new-rating").value,
      comment: document.getElementById("new-comment").value,
};
          // Create new ramen image element
    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;

    // Attach click event to show details
    img.addEventListener("click", () => handleClick(newRamen));

    // Append image to #ramen-menu
    document.getElementById("ramen-menu").appendChild(img);

    // Reset form fields
    form.reset();
  });
};

const displayRamens = () => {
  const ramenMenu = document.getElementById("ramen-menu");

  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {  // `ramens` is now correctly scoped
      console.log("Ramens fetched successfully:", ramens);

      ramens.forEach((ramen) => {  // This now works inside `.then()`
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.id = ramen.id;

        img.addEventListener("click", () => handleClick(ramen));

        ramenMenu.appendChild(img);
      });
    })
    .catch((error) => console.error("Error fetching ramens:", error));
};


const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens(); // Fetch and display ramen images
  addSubmitListener(); // Add event listener for form submission
}

document.addEventListener("DOMContentLoaded", main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

