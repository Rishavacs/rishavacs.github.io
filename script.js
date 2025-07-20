// You can add animations or interactive scripts here
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Loaded with Transitions and Links");
});
// Optional animation or mobile nav logic
document.addEventListener("DOMContentLoaded", () => {
  console.log("Responsive school site loaded.");
});



    // Scroll animation
    const section = document.getElementById("about");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("visible");
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);
   
   
   
   
   // Event database for multiple years
  const allEvents = {
    "2025-01-26": { type: "event", label: "Republic Day" },
    "2025-04-10": { type: "holiday", label: "Good Friday" },
    "2025-07-16": { type: "holiday", label: "Summer Break" },
    "2025-11-10": { type: "exam", label: "Final Exams" },

    "2024-01-26": { type: "event", label: "Republic Day" },
    "2024-03-25": { type: "holiday", label: "Holi" },
    "2024-05-01": { type: "event", label: "Labor Day" },
    "2024-10-02": { type: "holiday", label: "Gandhi Jayanti" },

    "2023-08-15": { type: "event", label: "Independence Day" },
    "2023-11-14": { type: "exam", label: "Children’s Day Test" },
  };

  const eventColors = {
    holiday: "#27ae60",
    exam: "#2980b9",
    event: "#e74c3c"
  };

  function openCalendar() {
    document.getElementById("calendarPopup").style.display = "block";
    document.getElementById("calendarOverlay").style.display = "block";
    populateYearDropdown();
    renderFullYearCalendar(document.getElementById("yearSelect").value);
  }

  function closeCalendar() {
    document.getElementById("calendarPopup").style.display = "none";
    document.getElementById("calendarOverlay").style.display = "none";
  }

  function populateYearDropdown() {
    const select = document.getElementById("yearSelect");
    if (select.children.length > 0) return; // already filled

    const currentYear = new Date().getFullYear();
    for (let y = 2025; y <= 2030; y++) {
      const option = document.createElement("option");
      option.value = y;
      option.text = y;
      if (y == currentYear) option.selected = true;
      select.appendChild(option);
    }
  }

  function renderFullYearCalendar(year) {
    const container = document.getElementById("fullYearCalendar");
    container.innerHTML = "";
    const months = [
      "April", "May", "June", "July", "August", "September",
      "October", "November", "December", "January", "February", "March"
    ];

    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(year, month, 1);
      const lastDate = new Date(year, month + 1, 0).getDate();
      const monthBox = document.createElement("div");
      monthBox.style.marginBottom = "20px";

      const title = document.createElement("h3");
      title.textContent = months[month];
      title.style.margin = "10px 0 5px 0";
      title.style.color = "#004080";
      container.appendChild(title);

      const grid = document.createElement("div");
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "repeat(7, 1fr)";
      grid.style.gap = "6px";

      const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
      weekDays.forEach(d => {
        const cell = document.createElement("div");
        cell.textContent = d;
        cell.style.fontWeight = "bold";
        cell.style.textAlign = "center";
        grid.appendChild(cell);
      });

      for (let i = 0; i < firstDay.getDay(); i++) {
        const empty = document.createElement("div");
        grid.appendChild(empty);
      }

      for (let day = 1; day <= lastDate; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const cell = document.createElement("div");
        cell.textContent = day;
        cell.style.textAlign = "center";
        cell.style.padding = "5px";
        cell.style.borderRadius = "6px";
        cell.style.background = "#f2f2f2";
        cell.style.transition = "0.3s";

        if (allEvents[dateStr]) {
          const type = allEvents[dateStr].type;
          const dot = document.createElement("span");
          dot.textContent = "●";
          dot.style.color = eventColors[type];
          dot.style.display = "block";
          dot.style.fontSize = "12px";
          cell.appendChild(dot);
        }

        cell.onmouseover = () => {
          cell.style.background = "#004080";
          cell.style.color = "white";
        };
        cell.onmouseout = () => {
          cell.style.background = "#f2f2f2";
          cell.style.color = "black";
        };

        grid.appendChild(cell);
      }

      monthBox.appendChild(grid);
      container.appendChild(monthBox);
    }
  }
function openAdmission() {
  document.getElementById("admissionPopup").style.display = "block";
  document.getElementById("admissionOverlay").style.display = "block";
}

function closeAdmission() {
  document.getElementById("admissionPopup").style.display = "none";
  document.getElementById("admissionOverlay").style.display = "none";
}

// Simplified Form Submission
const admissionForm = document.getElementById("admissionForm");
if (admissionForm) {
  admissionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!admissionForm.checkValidity()) {
      admissionForm.reportValidity();
      return;
    }

    const submitBtn = admissionForm.querySelector("button");
    submitBtn.disabled = true;

    const formData = new FormData(admissionForm);

    fetch(admissionForm.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          alert("Form Submitted Successfully!");
          admissionForm.reset();
          closeAdmission();
        } else {
          alert("Submission failed. Try again.");
          submitBtn.disabled = false;
        }
      })
      .catch(() => {
        alert("Network error. Try again.");
        submitBtn.disabled = false;
      });
  });
}
function toggleMoreText(btn) {
    const content = document.getElementById("moreAboutText");
    if (content.style.display === "none") {
      content.style.display = "block";
      btn.textContent = "Show Less";
    } else {
      content.style.display = "none";
      btn.textContent = "Learn More";
    }
  }
  
  
  
  const canvas = document.getElementById("interactive-bg");
const ctx = canvas.getContext("2d");
let particles = [];
const colors = ["#bbdefb", "#90caf9", "#64b5f6", "#c5e1a5"];

canvas.width = window.innerWidth;
canvas.height = 450;

class Particle {
  constructor() {
    this.radius = Math.random() * 4 + 1;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.dx = (Math.random() - 0.5) * 1.2;
    this.dy = (Math.random() - 0.5) * 1.2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.fill();
  }

  update(mouse) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      this.x += dx * 0.01;
      this.y += dy * 0.01;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

const mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => p.update(mouse));
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = 450;
  init();
});

function openVisitForm() {
  document.getElementById("visitPopup").style.display = "block";
  document.getElementById("visitOverlay").style.display = "block";
}

function closeVisitForm() {
  document.getElementById("visitPopup").style.display = "none";
  document.getElementById("visitOverlay").style.display = "none";
}
AOS.init();

  function showMore() {
    const more = document.getElementById('moreMembers');
    more.style.display = 'grid';
    document.querySelector('.read-more-btn').style.display = 'none';
    AOS.refresh(); // Refresh AOS after DOM changes
  }
  

  window.addEventListener("DOMContentLoaded", () => {
    const ratings = [5, 4, 3, 5, 4, 3]; // ⭐ Alag-alag star ratings
    const cards = document.querySelectorAll(".review-card");

    cards.forEach((card, index) => {
      const img = card.querySelector("img");
      if (!img) return;

      const rating = ratings[index] || 0;

      const starDiv = document.createElement("div");
      starDiv.className = "star-rating";
      starDiv.style.margin = "8px 0";

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.textContent = i <= rating ? "★" : "☆";
        star.style.color = i <= rating ? "#ffc107" : "#ccc";
        star.style.fontSize = "18px";
        star.style.marginRight = "2px";
        starDiv.appendChild(star);
      }

      img.insertAdjacentElement("afterend", starDiv);
    });
  });
  
  

  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const btn = item.querySelector(".accordion-btn");

    btn.addEventListener("click", () => {
      // Toggle current
      item.classList.toggle("active");

      // Optional: close others
      accordionItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
        }
      });
    });
  });



  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xkgbeejd", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        form.reset();
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);
      } else {
        alert("❌ Form submit failed. Please check your Formspree ID or try again later.");
      }
    } catch (error) {
      alert("❌ Network error. Please check your internet connection.");
      console.error(error);
    }
  });
  
  
  


 
    // Fade on Scroll
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
 
  AOS.init({
    duration: 1000,
    once: true
  });
  

  function showThankYou() {
    alert("Thank you for your feedback!");
    return true;
  }
  