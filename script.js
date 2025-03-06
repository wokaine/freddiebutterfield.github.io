document.addEventListener("DOMContentLoaded", function () {
   // Smooth Scrolling for all nav links
   document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
         e.preventDefault();

         const headerOffset = document.querySelector("header").offsetHeight;
         const targetElement = document.querySelector(
            this.getAttribute("href")
         );
         const elementPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;
         const offsetPosition = elementPosition - headerOffset - 20; // Adjust extra padding if needed

         window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
         });

         // If mobile nav is active, close it
         if (window.innerWidth <= 768) {
            document.getElementById("nav-menu").classList.remove("active");
         }
      });
   });

   // Hamburger Menu Toggle
   const menuToggle = document.getElementById("menu-toggle");
   const navMenu = document.getElementById("nav-menu");
   menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
   });

   // Dark Mode Toggle
   const darkModeToggle = document.getElementById("dark-mode-toggle");
   darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      // Toggle icon between moon and sun
      const icon = darkModeToggle.querySelector("i");
      if (document.body.classList.contains("dark-mode")) {
         icon.classList.remove("fa-moon");
         icon.classList.add("fa-sun");
      } else {
         icon.classList.remove("fa-sun");
         icon.classList.add("fa-moon");
      }
   });
});

async function fetchData() {
   try {
      const response = await fetch("https://api.chucknorris.io/jokes/random/"); // Example API
      const data = await response.json();
      console.log(data);

      // Select the container and update its content
      document.getElementById("data-container").innerHTML = `
            <p>${data.value}</p>
        `;
   } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("data-container").innerHTML =
         "Failed to load data.";
   }
}

// Call the function when the page loads
fetchData();
