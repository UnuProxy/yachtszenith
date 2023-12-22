// LOADING FROM JSON FILE YACHT IN MAIN CATALOG PAGE
document.addEventListener("DOMContentLoaded", function() {
  const lengthFilter = document.getElementById("lengthFilter");
  const nameSearch = document.getElementById("nameSearch");
  const yachtGrid = document.querySelector('.yacht-grid');

  let yachtData = [];

  function loadYachts() {
    yachtGrid.innerHTML = '';
    // Your code to load yachts goes here
  }

  function applyFilters() {
    // Your code to apply filters goes here
  }

  fetch('yachts.json')
    .then(response => response.json())
    .then(data => {
      yachtData = data;
      loadYachts();
    });

  lengthFilter.addEventListener("change", applyFilters);
  nameSearch.addEventListener("keyup", applyFilters);
});





// Function to handle touch start coordinate
let touchStartX = 0;
function handleTouchStart(e) {
touchStartX = e.touches[0].clientX;
}

// Function to handle touch end and decide whether to navigate
function handleTouchEnd(e, index, interiorImages, fullSizeImg) {
const touchEndX = e.changedTouches[0].clientX;
if (touchStartX - touchEndX > 50) {
  index = (index + 1) % interiorImages.length;
  fullSizeImg.src = interiorImages[index];
} else if (touchEndX - touchStartX > 50) {
  index = (index - 1 + interiorImages.length) % interiorImages.length;
  fullSizeImg.src = interiorImages[index];
}
}

// LOAD FROM JSON FILE YACHT IN DETAIL PAGE FOR INDIVIDUAL YACHT
document.addEventListener("DOMContentLoaded", function() {
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch('yachts.json')
  .then(response => response.json())
  .then(data => {
    const yacht = data.find(y => y.id === parseInt(id, 10));
    if (yacht) {
      // Existing code for individual yacht detail page
      document.querySelector('.yacht-name').textContent = yacht.name;
      document.querySelector('.main-image').src = yacht.image;
      document.querySelector('.description-text').textContent = yacht.description;
      document.querySelector('.price-text').textContent = yacht.price;

      // Populate detailed specifications
      const specsUl = document.querySelector('.detailed-specs');
      for (const [key, value] of Object.entries(yacht.detailedSpecs)) {
        const liElement = document.createElement('li');
        liElement.textContent = `${key}: ${value}`;
        specsUl.appendChild(liElement);
      }

      // Populate Interior Images with fullscreen functionality and navigation
      const interiorDiv = document.querySelector('.interior-carousel');
      const interiorImages = yacht.interiorImages;
      interiorImages.forEach((imgSrc, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = 'Interior Image';
        imgElement.addEventListener('click', function() {
          const modal = document.createElement('div');
          modal.className = 'fullscreen-modal';
          modal.style.position = 'fixed';
          modal.style.left = '0';
          modal.style.top = '0';
          modal.style.width = '100%';
          modal.style.height = '100%';
          modal.style.backgroundColor = 'rgba(0,0,0)';
          modal.style.zIndex = '1000';

          const fullSizeImg = document.createElement('img');
          fullSizeImg.className = 'fullscreen-image';
          fullSizeImg.src = imgSrc;
          fullSizeImg.style.width = '80%';  
          fullSizeImg.style.height = 'auto'; 
          fullSizeImg.style.objectFit = 'cover';             
          fullSizeImg.style.margin = 'auto';

          const exitButton = document.createElement('span');
          exitButton.innerHTML = '&times;';
          exitButton.className = 'exit-button';
          exitButton.style.position = 'absolute';
          exitButton.style.right = '20px';
          exitButton.style.top = '20px';
          exitButton.style.fontSize = '2em';
          exitButton.style.color = 'white';
          exitButton.style.cursor = 'pointer';
          exitButton.addEventListener('click', function() {
            document.body.removeChild(modal);
          });

          const nextButton = document.createElement('span');
          nextButton.innerHTML = '&rsaquo;';
          nextButton.className = 'next-button';
          nextButton.style.position = 'absolute';
          nextButton.style.right = '20px';
          nextButton.style.bottom = '50%';
          nextButton.style.fontSize = '3em';
          nextButton.style.color = 'white';
          nextButton.style.cursor = 'pointer';
          nextButton.addEventListener('click', function() {
            index = (index + 1) % interiorImages.length;
            fullSizeImg.src = interiorImages[index];
          });

          const prevButton = document.createElement('span');
          prevButton.innerHTML = '&lsaquo;';
          prevButton.className = 'prev-button';
          prevButton.style.position = 'absolute';
          prevButton.style.left = '20px';
          prevButton.style.bottom = '50%';
          prevButton.style.fontSize = '3em';
          prevButton.style.color = 'white';
          prevButton.style.cursor = 'pointer';
          prevButton.addEventListener('click', function() {
            index = (index - 1 + interiorImages.length) % interiorImages.length;
            fullSizeImg.src = interiorImages[index];
          });

          modal.appendChild(exitButton);
          modal.appendChild(nextButton);
          modal.appendChild(prevButton);
          modal.appendChild(fullSizeImg);

          // Add touch event listeners for mobile navigation
          modal.addEventListener('touchstart', handleTouchStart);
          modal.addEventListener('touchend', function(e) {
            handleTouchEnd(e, index, interiorImages, fullSizeImg);
          });

          document.body.appendChild(modal);
        });
        interiorDiv.appendChild(imgElement);
      }); 

      // Your existing code for exterior images and similar yachts
      const exteriorDiv = document.getElementById('exterior');
      yacht.exteriorImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        exteriorDiv.appendChild(imgElement);
      });

      populateSimilarYachts(data, yacht.id);
    }
  });
});



// Function to populate the similar yachts grid with only 3 yachts
function populateSimilarYachts(yachts, currentYachtId) {

}

// POPULATE CAROUSEL WITH YACHTS
let position = 0;

function move(step) {
const container = document.getElementById('carousel-container');
const itemWidth = document.querySelector('.carousel-item').offsetWidth;
const totalItems = container.children.length;

position += step;

if (position < 0) {
  position = totalItems - 1;
}

if (position >= totalItems) {
  position = 0;
}

const offset = -position * itemWidth;
container.style.transform = `translateX(${offset}px)`;
}

// Sample yachts data
const yachtsData = [
{
  "id": 1,
  "name": "Mangusta 108",
  "image": "Mangusta 108",
      "image": "img/Nomad108.jpg",
      // ... other details
    },
    {
      "id": 2,
      "name": "CRN 130",
      "image": "img/CRN130.jpg",
      // ... other details
    },
    {
      "id": 3,
      "name": "Persing 90",
      "image": "img/Persing90.jpg",
      // ... other details
    }
    // ... additional yachts
  ];

// Function to populate carousel with yachts
function populateYachts(yachts) {
  const carouselContainer = document.getElementById('carousel-container');
  carouselContainer.innerHTML = '';

  yachts.forEach(yacht => {
    const yachtItem = document.createElement('div');
    yachtItem.className = 'carousel-item';

    const yachtLink = document.createElement('a');
    yachtLink.href = `yachtDetail.html?id=${yacht.id}`;

    const yachtImage = document.createElement('img');
    yachtImage.src = yacht.image;
    yachtImage.alt = yacht.name;

    const yachtName = document.createElement('span');
    yachtName.innerText = yacht.name;

    yachtLink.appendChild(yachtImage);
    yachtLink.appendChild(yachtName);

    yachtItem.appendChild(yachtLink);
    carouselContainer.appendChild(yachtItem);
  });
}

// Populate the carousel when the page loads
populateYachts(yachtsData);

  
  
  
// Add an event listener for scrolling
window.addEventListener('scroll', function() {
  const aboutSection = document.getElementById('about');
  const aboutLink = document.getElementById('aboutLink');
  const rect = aboutSection.getBoundingClientRect();

  if(rect.top <= window.innerHeight && rect.bottom >= 0) {
    // The "About" section is currently in view
    aboutLink.classList.add('active-link');
  } else {
    // The "About" section is not in view
    aboutLink.classList.remove('active-link');
  }
});



window.addEventListener('load', function() {
  var yachtImage = document.querySelector('.your-image-class');
  var yachtImageParent = yachtImage.parentElement;

  if(yachtImage && yachtImageParent) {
      var position = yachtImage.getBoundingClientRect();
      
      var yachtNameDiv = document.createElement('div');
      yachtNameDiv.classList.add('yacht-name');
      yachtNameDiv.innerHTML = 'Boat Name Here';
      yachtImageParent.appendChild(yachtNameDiv);

      // Initially position off-screen
      yachtNameDiv.style.left = (position.left - 200) + 'px';
      yachtNameDiv.style.top = position.top + 'px';
      
      // Trigger reflow to make the transition work
      void yachtNameDiv.offsetWidth;

      // Animate in
      setTimeout(function() {
          yachtNameDiv.style.left = position.left + 'px';
      }, 0);
  }
});

var yachtNameDiv = document.createElement('div');
yachtNameDiv.className = 'yacht-name';
yachtNameDiv.innerText = 'Boat Name';
document.body.appendChild(yachtNameDiv);

window.addEventListener('load', function() {
  var yachtName = document.querySelector('.yacht-name');
  if(yachtName) {
    setTimeout(function() {
      yachtName.style.left = '0px';
    }, 100); 
  }
});




document.addEventListener("DOMContentLoaded", function() {
 
  const tabs = document.querySelectorAll(".tab-buttons button");
  const contents = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");

      const id = this.id.replace("-tab", "-content");
      contents.forEach(content => content.classList.remove("active"));
      document.getElementById(id).classList.add("active");
    });
  });
});



document.addEventListener("DOMContentLoaded", function() {
  fetch('yachts.json')
    .then(response => response.json())
    .then(data => {
      function displayYachtPrices() {
        const yachtIdToFetch = getCurrentYachtId(); // Get yacht ID from URL parameter
        const yacht = data.find(y => y.id === yachtIdToFetch);
        if (yacht && yacht.seasonalPrices) {
          updatePriceDisplay(yacht.seasonalPrices);
        }
      }

      displayYachtPrices(); // Initial call to display prices for the current yacht
    });
});

function getCurrentYachtId() {
  // Extract yacht ID from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id')) || 1; // Default to 1 if not found
}

function updatePriceDisplay(seasonalPrices) {
  const priceTextPara = document.querySelector('.price-text');
  let priceTextContent = '<div class="seasonal-price-columns">';
  let inlineMonthsContent = '<div class="inline-months">';

  Object.entries(seasonalPrices).forEach(([season, price], index, array) => {
    const isLastItem = index === array.length - 1;
    const additionalClass = isLastItem ? '' : 'border-right';

    if (season === 'June' || season === 'September') {
      inlineMonthsContent += `<div class="seasonal-price-item ${additionalClass}">
                                <div class="season-label">${season}</div>
                                <div class="season-price">${price}</div>
                              </div>`;
    } else {
      priceTextContent += `<div class="seasonal-price-item ${additionalClass}">
                            <div class="season-label">${season}</div>
                            <div class="season-price">${price}</div>
                          </div>`;
    }
  });

  inlineMonthsContent += '</div>';
  priceTextContent = priceTextContent.replace('<!--inline-months-->', inlineMonthsContent);
  priceTextContent += '</div>';
  priceTextPara.innerHTML = priceTextContent;
}









//MOVING NAVIGATION ROW TO CENTER OF THE PAGE
window.addEventListener('scroll', function() {
  const navRow = document.querySelector('.navigation-row');
  if (window.scrollY > 100) {  // Replace 100 with the scroll position you want
    navRow.classList.add('centered-nav');
  } else {
    navRow.classList.remove('centered-nav');
  }
});



document.addEventListener("DOMContentLoaded", function() {
  const ulElement = document.querySelector('.detailed-specs');
  const listItems = Array.from(ulElement.querySelectorAll('li'));

  // Check if there are more than 15 items
  if(listItems.length > 15) {
    // Create a new UL element
    const newUl = document.createElement('ul');
    newUl.className = 'detailed-specs';
    
    // Move the extra items to the new UL element
    for(let i = 15; i < listItems.length; i++) {
      newUl.appendChild(listItems[i]);
    }

    // Append the new UL to #key-info
    document.getElementById('key-info').appendChild(newUl);
  }
});



// SLIDE FROM THE BOTTOM TEXT Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Listen for scroll events
window.addEventListener('scroll', function() {
  const descriptionText = document.querySelector('.description-text');

  if (isInViewport(descriptionText)) {
    descriptionText.classList.add('visible');
  }
});



//IMAGES SLIDE FROM THE BOTTOM 
window.addEventListener("scroll", function() {
  var element = document.getElementById("interior");
  var position = element.getBoundingClientRect();

  // Check if element is halfway into view
  if (position.top < window.innerHeight / 2 && position.bottom >= 0) {
    var images = document.querySelectorAll("#interior img");
    images.forEach(function(img) {
      img.style.transform = 'translateY(0)';
      img.style.opacity = '1';
    });
  }
});


  // This function will run after the li elements have been populated.
function wrapLiTextWithSpan() {
  const lis = document.querySelectorAll('.detailed-specs li');
  lis.forEach(function(li) {
    const text = li.textContent;
    li.innerHTML = `<span>${text}</span>`;
  });
}

// Run the function after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', function() {
  wrapLiTextWithSpan();
});




//BORDER TITLE EFFECT 
window.addEventListener('scroll', function() {
  // Existing code for section-title
  const element1 = document.querySelector('.section-title');
  const position1 = element1.getBoundingClientRect();

  if (position1.top < window.innerHeight && position1.bottom >= 0) {
    element1.classList.add('active');
  } else {
    element1.classList.remove('active');
  }

  // New code for h2 in yacht-specs
  const element2 = document.querySelector('.yacht-specs h2');
  const position2 = element2.getBoundingClientRect();

  if (position2.top < window.innerHeight && position2.bottom >= 0) {
    element2.classList.add('active');
  } else {
    element2.classList.remove('active');
  }
});

window.addEventListener('scroll', function() {
  const element = document.querySelector('.yacht-specs h2');
  const position = element.getBoundingClientRect();

  if (position.top < window.innerHeight && position.bottom >= 0) {
    element.classList.add('active');
  } else {
    element.classList.remove('active');
  }
});


// DETAILED SPECS SLIDE UP WHEN SCROLL
window.addEventListener('scroll', function() {
  const listItems = document.querySelectorAll('.detailed-specs li');

  listItems.forEach(function(item, index) {
    const position = item.getBoundingClientRect();

    if (position.top < window.innerHeight && position.bottom >= 0) {
      // Delay the reveal effect to achieve the line-by-line loading effect
      setTimeout(() => {
        item.classList.add('reveal');
      }, index * 100);
    }
  });
});
