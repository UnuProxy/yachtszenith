// IMAGE SLIDE FOR ROUTES AND DESTINATIONS
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  function changeSlide(direction) {
      slides[currentIndex].classList.remove('active');
      
      if(direction === "next") {
          currentIndex = (currentIndex + 1) % slides.length;
      } else {
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      }

      slides[currentIndex].classList.add('active');
  }

  document.querySelectorAll('.control-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const direction = this.getAttribute('data-dir');
          changeSlide(direction);
      });
  });
});




// OPEN AND CLOSE HAMBURGER MENU
document.addEventListener("DOMContentLoaded", function () {
  const mainMenu = document.querySelector(".mainMenu");
  const closeMenu = document.querySelector(".closeMenu");
  const openMenu = document.querySelector(".openMenu");
  const menu_items = document.querySelectorAll("nav .mainMenu li a");

  openMenu.addEventListener("click", show);
  closeMenu.addEventListener("click", close);


  menu_items.forEach((item) => {
    item.addEventListener("click", function () {
      close();
    });
  });

  function show() {
    mainMenu.style.display = "flex";
    mainMenu.style.top = "0";
  }
  function close() {
    mainMenu.style.top = "-120%";
  }



  
  let lastScrollTop = 0;
  const header = document.getElementById("sticky-section");
  
  window.addEventListener("scroll", function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 0) {
      header.classList.add("hide-header");
    } else {
      header.classList.remove("hide-header");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
  }, false);
  function show() {
    mainMenu.style.display = "flex";
    mainMenu.style.top = "0";
    document.body.classList.add('no-scroll');  
  }
  
  function close() {
    mainMenu.style.top = "-120%";
    document.body.classList.remove('no-scroll');  
  }
  


  
  //POPUP FORM MESSAGE NOW
  function openPopup() {
    console.log("openPopup was called");
    const popup = document.getElementById("inquiryPopup");
    popup.style.display = "block";
}

function closePopup() {
    console.log("closePopup was called");
    const popup = document.getElementById("inquiryPopup");
    popup.style.display = "none";
}
  function openPopup() {
    const popup = document.getElementById("inquiryPopup");
    popup.style.display = "block";
  }

  function closePopup() {
    const popup = document.getElementById("inquiryPopup");
    popup.style.display = "none";
  }
  const inquiryButtons = document.querySelectorAll(".inquiry-button");
  inquiryButtons.forEach((button) => {
    button.addEventListener("click", openPopup);
  });
  

  const closePopupButton = document.querySelector(".close-popup");
  closePopupButton.addEventListener("click", closePopup);

  window.addEventListener("click", function (event) {
    const popup = document.getElementById("inquiryPopup");
    if (event.target === popup) {
      closePopup();
    }
  });
});


// ARROW LINK TO YACHT LISTINGS 
document.addEventListener("DOMContentLoaded", function() {
document.addEventListener("DOMContentLoaded", function () {
  const arrowLink = document.querySelector(".arrow-link");
  const yachtListingsSection = document.getElementById("yacht-listings");

  arrowLink.addEventListener("click", function (event) {
    event.preventDefault();
    const headerHeight = 170; 
    const yOffset = yachtListingsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scroll({
      top: yOffset,
      behavior: "smooth",
    });
  });
});
});






let observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
      if(entry.isIntersecting) {
          entry.target.classList.add('active');
      } else {
          entry.target.classList.remove('active');
      }
  })
}, { threshold: [1] });

observer.observe(document.querySelector('.title'));





document.addEventListener('DOMContentLoaded', function() {
  let observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
          if (entry.isIntersecting) {
              entry.target.style.animationPlayState = 'running';
          }
      });
  });

  document.querySelectorAll('.new-title, .new-description').forEach(function(el) {
      observer.observe(el);
  });
}); 



document.addEventListener('scroll', function() {
  var descriptions = document.querySelectorAll('.new-description');

  descriptions.forEach(function(description, index) {
    var rect = description.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.1) {
      setTimeout(function() {
        description.classList.add('active');
      }, index * 200); 
    }
  });
}); 



let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 0) {
    document.getElementById('sticky-section').classList.add('hide-header');
  } else {
    document.getElementById('sticky-section').classList.remove('hide-header');
  }

  lastScrollTop = scrollTop;
});






function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const isInView = rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
  console.log(`Element top: ${rect.top}, bottom: ${rect.bottom}, isInView: ${isInView}`);
  return isInView;
}

function handleScroll() {
  const imageBlocks = document.querySelectorAll('.image-block');
  imageBlocks.forEach((block) => {
      if (isInViewport(block)) {
          const textContainer = block.querySelector('.text-container');
          console.log('Animating text container');
          textContainer.style.transform = 'translateY(0)';
      }
  });
}

window.addEventListener('scroll', handleScroll);






// IBIZA GUIDE & TIPS
function toggleGuide(element) {
  const content = element.querySelector('.accordion-content');
  if (element.classList.contains('active')) {
    element.classList.remove('active');
    content.style.maxHeight = '0';
  } else {
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.accordion-content').style.maxHeight = '0';
    });
    element.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

 
// SLIDE IMAGE ONE ANOTHER 
let isDragging = false;
let initialClickOffset = 0;

const customSlider = document.getElementById('custom-slider');
const image1 = document.getElementById('image1'); 
const image2 = document.getElementById('image2');
const indicator = document.querySelector('.indicator'); 


function updateSliderHeight() {
  const imgHeight = image1.offsetHeight; 
  customSlider.style.height = `${imgHeight}px`;
  indicator.style.top = `${imgHeight / 2}px`; 
}

window.addEventListener('load', () => {
  updateSliderHeight();
});


window.addEventListener('resize', updateSliderHeight);

customSlider.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', stopDrag);

customSlider.addEventListener('touchstart', startDrag);
window.addEventListener('touchmove', drag);
window.addEventListener('touchend', stopDrag);


function startDrag(event) {
  const clientX = event.clientX || event.touches[0].clientX;
  const sliderRect = customSlider.getBoundingClientRect();
  initialClickOffset = clientX - sliderRect.left;
  isDragging = true;
}


function drag(event) {
  if (!isDragging) return;

  const clientX = event.clientX || event.touches[0].clientX;
  const containerRect = customSlider.parentElement.getBoundingClientRect();
  const xPos = clientX - containerRect.left - initialClickOffset;
  const width = containerRect.width;

  let percentage = (xPos / width) * 100;
  percentage = Math.min(Math.max(percentage, 0), 100);

  customSlider.style.left = `${percentage}%`;
  image2.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
}

function stopDrag() {
  isDragging = false;
}

function updateSliderHeight() {
  const imgHeight = image1.offsetHeight;
  customSlider.style.height = `${imgHeight}px`;
  indicator.style.top = `${imgHeight / 2}px`;
  
  
  const imageSliderContainer = document.querySelector('.image-slider-container');
  imageSliderContainer.style.height = `${imgHeight}px`;
}




// SLIDE FROM BOTTOM YACHTS AND SEE MORE LINK
document.addEventListener("DOMContentLoaded", function() {
  let slideIns = document.querySelectorAll(".yacht-slide-in");
  const section = document.getElementById("yacht-listings");  

  function checkSlide() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const sectionTop = section.offsetTop;  

    if (scrollPosition > sectionTop) {
      slideIns.forEach((slideIn, index) => {
        setTimeout(() => {
          slideIn.classList.add("slide-up");
        }, 150 * index);  
      });
    }
  }

  window.addEventListener("scroll", checkSlide);
});




//SLIDE IN TEXT UNDEARNEATH
document.addEventListener('DOMContentLoaded', (event) => {
  const animateOnScroll = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        observer.unobserve(entry.target);

    
        const nextHeading = headings[++currentHeadingIndex];
        if (nextHeading) {
          
          setTimeout(() => {
            observer.observe(nextHeading);
          }, 1000);  
        }
      }
    });
  };


  const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.5,
  });

  const headings = Array.from(document.querySelectorAll('.animate'));
  let currentHeadingIndex = 0;

  
  observer.observe(headings[currentHeadingIndex]);
}); 




//YACHTING GUIDE & TIPS OPACITY SLIDE IN
document.addEventListener("DOMContentLoaded", function() {
window.addEventListener('scroll', function() {
  const yachtingGuide = document.getElementById('yachting-guide');
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  
  
  const triggerPoint = yachtingGuide.offsetTop - (windowHeight / 2);
  
  if (scrollPosition >= triggerPoint) {
    yachtingGuide.style.opacity = '1';
  } else {
    yachtingGuide.style.opacity = '0';
  }
});
});


//FUNCTION FOR IPHONE SCROLL IMAGE
window.addEventListener('scroll', function() {
  var scrolledHeight = window.pageYOffset;
  var parallaxElement = document.querySelector('.wrapper');
  var limit = parallaxElement.offsetTop + parallaxElement.offsetHeight;
  if (scrolledHeight > parallaxElement.offsetTop && scrolledHeight <= limit) {
    parallaxElement.style.backgroundPositionY =  (scrolledHeight - parallaxElement.offsetTop) / 1.5 + 'px';
  } else {
    parallaxElement.style.backgroundPositionY =  '0';
  }
});

function loadYachts(yachts) {
  yachtGrid.innerHTML = ''; 
  yachts.forEach(yacht => {
      
      const yachtElement = document.createElement('div');
      yachtElement.innerHTML = `<h3>${yacht.name}</h3>`; 
      yachtGrid.appendChild(yachtElement);
  });
}

/* function applyFilters() {
  const searchQuery = nameSearch.value.toLowerCase();
  const lengthFilterValue = lengthFilter.value;

  const filteredYachts = yachtData.filter(yacht => {
      const matchesName = yacht.name.toLowerCase().includes(searchQuery);
      const matchesLength = lengthFilterValue === 'all' || (lengthFilterValue === '0-20' && yacht.length <= 20) || (lengthFilterValue === '21-40' && yacht.length > 20 && yacht.length <= 40);
      
      return matchesName && matchesLength;
  });

  loadYachts(filteredYachts); 
}

// Fetching yacht data
fetch('yachts.json')
  .then(response => response.json())
  .then(data => {
      yachtData = data;
      loadYachts(yachtData); 
  });


lengthFilter.addEventListener("change", applyFilters);
nameSearch.addEventListener("keyup", applyFilters); */


// Function to apply filters
function applyFilters() {
  const searchName = nameSearch.value.toLowerCase();
  const yachtCards = document.querySelectorAll('.yacht-card');

  yachtCards.forEach(card => {
    const yachtName = card.querySelector('.yacht-name').textContent.toLowerCase();
    const nameMatches = searchName === '' || yachtName.includes(searchName);

    // Add logic for price and length filters based on your HTML structure

    card.style.display = nameMatches ? "" : "none"; // Adjust display based on filter match
  });
}

// Function to reset filters
function resetAllFilters() {
  priceFilter.value = "all";
  lengthFilter.value = "all";
  nameSearch.value = "";
  applyFilters(); // Reapply filters to show all cards
}

// Event Listeners
priceFilter.addEventListener("change", applyFilters);
lengthFilter.addEventListener("change", applyFilters);
nameSearch.addEventListener("input", applyFilters);
resetFilters.addEventListener("click", resetAllFilters);












