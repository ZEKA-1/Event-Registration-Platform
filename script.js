// =========================
// PROTECT ADMIN PAGES
// =========================
if (
    window.location.pathname.includes("admin.html") ||
    window.location.pathname.includes("admin-events.html")
) {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
}


// =========================
// SAVE EVENT + GO TO DETAILS
// =========================
function viewDetails(title, date, location, description) {
    const event = {
        title,
        date,
        location,
        description
    };

    localStorage.setItem("selectedEvent", JSON.stringify(event));
    window.location.href = "events-details.html";
}

// =========================
// LOAD EVENT DETAILS PAGE
// =========================
if (window.location.pathname.includes("events-details.html")) {
    const event = JSON.parse(localStorage.getItem("selectedEvent"));

    if (event) {
        document.getElementById("event-title").textContent = event.title;
        document.getElementById("event-date").textContent = event.date;
        document.getElementById("event-location").textContent = event.location;
        document.getElementById("event-description").textContent = event.description;
    }
}

// =========================
// GO TO REGISTER PAGE
// =========================
function goToRegister() {
    window.location.href = "register.html";
}

// =========================
// LOAD REGISTER PAGE
// =========================
if (window.location.pathname.includes("register.html")) {
    const event = JSON.parse(localStorage.getItem("selectedEvent"));

    if (event) {
        document.getElementById("selected-event").textContent =
            "You are registering for: " + event.title;
    }
}

// =========================
// HANDLE FORM + SAVE DATA
// =========================
function submitForm(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const event = JSON.parse(localStorage.getItem("selectedEvent"));

    if (name && email && event) {
        const registration = {
            name,
            email,
            event: event.title
        };

        // Get existing registrations
        let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

        // Add new one
        registrations.push(registration);

        // Save back
        localStorage.setItem("registrations", JSON.stringify(registrations));

        // Show success message
        document.getElementById("success-message").textContent =
            "Registration saved successfully! ✅";

        // Clear form
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
    }
}

// =========================
// LOAD ADMIN DATA
// =========================
if (window.location.pathname.includes("admin.html")) {
    loadRegistrations();
}

// FUNCTION TO LOAD TABLE
if (window.location.pathname.includes("admin.html")) {
    loadRegistrations();
}

function loadRegistrations() {
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    const table = document.getElementById("admin-table");

    table.innerHTML = "";

    if (registrations.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No registrations yet</td></tr>";
    } else {
        registrations.forEach((reg, index) => {
            const row = `
        <tr>
          <td>${reg.name}</td>
          <td>${reg.email}</td>
          <td>${reg.event}</td>
          <td>
            <button onclick="deleteRegistration(${index})">Delete</button>
          </td>
        </tr>
      `;
            table.innerHTML += row;
        });
    }
}

function deleteRegistration(index) {
    let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

    registrations.splice(index, 1);

    localStorage.setItem("registrations", JSON.stringify(registrations));

    loadRegistrations();
}

// =========================
// LOAD EVENTS ADMIN
// =========================
if (window.location.pathname.includes("admin-events.html")) {
    loadEvents();
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const table = document.getElementById("events-table");

    table.innerHTML = "";

    if (events.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No events yet</td></tr>";
    } else {
        events.forEach((ev, index) => {
            const row = `
        <tr>
          <td>${ev.title}</td>
          <td>${ev.date}</td>
          <td>${ev.location}</td>
          <td>
            <button onclick="deleteEvent(${index})">Delete</button>
          </td>
        </tr>
      `;
            table.innerHTML += row;
        });
    }
}

// =========================
// ADD EVENT
// =========================
function addEvent(e) {
    e.preventDefault();

    const title = document.getElementById("event-title").value;
    const date = document.getElementById("event-date").value;
    const location = document.getElementById("event-location").value;
    const description = document.getElementById("event-description").value;

    const newEvent = { title, date, location, description };

    let events = JSON.parse(localStorage.getItem("events")) || [];

    events.push(newEvent);

    localStorage.setItem("events", JSON.stringify(events));

    loadEvents();

    // clear form
    document.getElementById("event-title").value = "";
    document.getElementById("event-date").value = "";
    document.getElementById("event-location").value = "";
    document.getElementById("event-description").value = "";
}

// =========================
// DELETE EVENT
// =========================
function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    events.splice(index, 1);

    localStorage.setItem("events", JSON.stringify(events));

    loadEvents();
}

// =========================
// LOAD EVENTS (DYNAMIC)
// =========================
if (window.location.pathname.includes("events.html")) {
    loadUserEvents();
}

function loadUserEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const container = document.getElementById("events-list");

    container.innerHTML = "";

    if (events.length === 0) {
        container.innerHTML = "<p>No events available</p>";
    } else {
        events.forEach(ev => {
            const card = `
        <div class="event-card">
          <h3>${ev.title}</h3>
          <p>Date: ${ev.date}</p>
          <p>Location: ${ev.location}</p>
          <button onclick="viewDetails(
            '${ev.title}',
            '${ev.date}',
            '${ev.location}',
            '${ev.description}'
          )">View Details</button>
        </div>
      `;
            container.innerHTML += card;
        });
    }
}

// =========================
// ADMIN LOGIN
// =========================
function login(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple hardcoded login
    if (username === "admin" && password === "1234") {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin.html";
    } else {
        document.getElementById("login-error").textContent =
            "Invalid username or password";
    }
}

function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "index.html";
}