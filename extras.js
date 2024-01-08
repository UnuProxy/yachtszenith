document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
  
    fetch('extras.json')
      .then(response => response.json())
      .then(data => {
        const yachtExtras = data.find(y => y.id === parseInt(id, 10));
        if (yachtExtras && yachtExtras.extras.length > 0) {
          const extrasList = document.getElementById("extras-list");
          let ulElement;
          let columnCount = 1; // Initialize to 1 to correctly count columns
  
          yachtExtras.extras.forEach((extra, index) => {
            // Create a new column (ul element) after every 4 rows
            if (index % 4 === 0) {
              if (columnCount === 5) { // Check for the fifth column
                columnCount = 1;  // Reset the column count
                // Here you can insert logic to add a new line or divider between the sets of 4 columns
              }
  
              ulElement = document.createElement("ul");
              extrasList.appendChild(ulElement);
              columnCount++;  // Increment the column count
            }
  
            // Create a new row (li element) for the current extra
            const liElement = document.createElement("li");
            liElement.textContent = extra;
            ulElement.appendChild(liElement);
          });
        }
      });
  });
  
  
  
  //PRICE TITLE FUNCTION
  window.addEventListener('scroll', function() {
    const priceDiv = document.querySelector('#price');
    const priceTitle = priceDiv.querySelector('h2');
  
    if (isInViewport(priceDiv)) {
      priceTitle.classList.add('active');
    } else {
      priceTitle.classList.remove('active');
    }
  });
  

  

  