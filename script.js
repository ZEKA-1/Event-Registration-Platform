
if (
    window.location.pathname.includes("admin.html") ||
    window.location.pathname.includes("admin-events.html")
) {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
}

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

if (window.location.pathname.includes("events-details.html")) {
    const event = JSON.parse(localStorage.getItem("selectedEvent"));

    if (event) {
        document.getElementById("event-title").textContent = event.title;
        document.getElementById("event-date").textContent = event.date;
        document.getElementById("event-location").textContent = event.location;
        document.getElementById("event-description").textContent = event.description;
    }
}

function goToRegister() {
    window.location.href = "register.html";
}

if (window.location.pathname.includes("register.html")) {
    const event = JSON.parse(localStorage.getItem("selectedEvent"));

    if (event) {
        document.getElementById("selected-event").textContent =
            "You are registering for: " + event.title;
    }
}

function submitForm(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const event = JSON.parse(localStorage.getItem("selectedEvent"));

    if (name && email && event) {
        fetch("http://localhost:3000/events")
            .then(res => res.json())
            .then(events => {
                // find event ID
                const selected = events.find(ev => ev.title === event.title);

                if (!selected) {
                    alert("Event not found");
                    return;
                }

                return fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        event_id: selected.id
                    })
                });
            })
            .then(() => {
                document.getElementById("success-message").textContent =
                    "Registration saved in database ✅";

                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
            });
    }
}


if (window.location.pathname.includes("admin.html")) {
    loadRegistrations();
}

function loadRegistrations() {
    fetch("http://localhost:3000/registrations")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("admin-table");
            table.innerHTML = "";

            if (data.length === 0) {
                table.innerHTML = "<tr><td colspan='4'>No registrations yet</td></tr>";
            } else {
                data.forEach(reg => {
                    const row = `
            <tr>
              <td>${reg.name}</td>
              <td>${reg.email}</td>
              <td>${reg.event}</td>
              <td>
                <button onclick="deleteRegistration(${reg.id})">Delete</button>
              </td>
            </tr>
          `;
                    table.innerHTML += row;
                });
            }
        });
}

function deleteRegistration(id) {
    console.log("Deleting registration:", id);

    fetch(`http://localhost:3000/registrations/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            console.log("Deleted:", data);
            loadRegistrations(); // refresh table
        })
        .catch(err => console.error(err));
}


if (window.location.pathname.includes("admin-events.html")) {
    loadEvents();
}

function loadEvents() {
    fetch("http://localhost:3000/events")
        .then(res => res.json())
        .then(events => {
            const table = document.getElementById("events-table");
            table.innerHTML = "";

            events.forEach(ev => {
                const row = `
          <tr>
            <td>${ev.title}</td>
            <td>${ev.date}</td>
            <td>${ev.location}</td>
            <td>
              <button onclick="deleteEvent(${ev.id})">Delete</button>
            </td>
          </tr>
        `;
                table.innerHTML += row;
            });
        });
}

function addEvent(e) {
    e.preventDefault();

    const title = document.getElementById("event-title").value;
    const date = document.getElementById("event-date").value;
    const location = document.getElementById("event-location").value;
    const description = document.getElementById("event-description").value;

    console.log("Sending:", { title, date, location, description });

    fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, date, location, description })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Response:", data);
            loadEvents();
        })
        .catch(err => console.error(err));
}

function deleteEvent(id) {
    console.log("Delete clicked, ID:", id);

    fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            console.log("Server response:", data);
            loadEvents();
        })
        .catch(err => console.error("Delete error:", err));
}

function loadUserEvents() {
    fetch("http://localhost:3000/events")
        .then(res => res.json())
        .then(events => {
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
        })
        .catch(err => console.error(err));
}

if (window.location.pathname.includes("events.html")) {
    loadUserEvents();
}

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

function deleteRegistration(id) {
    console.log("Delete registration:", id);

    fetch(`http://localhost:3000/registrations/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            loadRegistrations(); // refresh table
        })
        .catch(err => console.error(err));
}
