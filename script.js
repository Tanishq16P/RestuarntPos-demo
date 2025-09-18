// Navigation click switching
function navigateTo(sectionId) {
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const navItem = Array.from(document.querySelectorAll('.nav-item')).find(el => el.textContent.toLowerCase().includes(sectionId));
  if (navItem) navItem.classList.add('active');

  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  const section = document.getElementById(sectionId);
  if (section) section.classList.add('active');
}

// ✅ Improved Tab switching functionality
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('.menu-grid').forEach(grid => grid.style.display = "none");

    const target = tab.getAttribute("data-target");
    const grid = document.getElementById(target);
    if (grid) grid.style.display = "flex";
  });
});

// Menu item click handler
function selectItem(itemName) {
  alert("You selected: " + itemName);
}

// Table system
const tables = [
  { id: 1, status: "available" },
  { id: 2, status: "occupied" },
  { id: 3, status: "available" },
  { id: 4, status: "occupied" },
  { id: 5, status: "available" },
  { id: 6, status: "occupied" },
  { id: 7, status: "available" },
  { id: 8, status: "occupied" },
  { id: 9, status: "available" },
  { id: 10, status: "occupied" },
  { id: 11, status: "available" },
  { id: 12, status: "occupied" },
];

function renderTables(filter = "all", keyword = "") {
  const container = document.getElementById("tableGrid");
  container.innerHTML = "";

  tables.forEach((table) => {
    if (
      (filter === "all" || table.status === filter) &&
      (`Table ${table.id}`.toLowerCase().includes(keyword.toLowerCase()))
    ) {
      const div = document.createElement("div");
      div.className = `table-card ${table.status}`;
      div.innerHTML = `<h4>Table ${table.id}</h4><span>${capitalize(table.status)}</span>`;
      div.onclick = () => toggleStatus(table.id);
      container.appendChild(div);
    }
  });
}

function toggleStatus(id) {
  const table = tables.find(t => t.id === id);
  table.status = table.status === "available" ? "occupied" : "available";
  renderTables(getActiveFilter(), document.getElementById("search").value);
}

function getActiveFilter() {
  return document.querySelector(".filter.active").dataset.status;
}

function clearFilters() {
  document.getElementById("search").value = "";
  setActiveFilter("all");
  renderTables();
}

function updateStatus() {
  alert("Table statuses have been updated.");
}

function setActiveFilter(status) {
  document.querySelectorAll(".filter").forEach(f => f.classList.remove('active'));
  document.querySelector(`.filter[data-status="${status}"]`).classList.add('active');
}

document.querySelectorAll(".filter").forEach(f => {
  f.addEventListener("click", () => {
    const status = f.dataset.status;
    setActiveFilter(status);
    renderTables(status, document.getElementById("search").value);
  });
});

document.getElementById("search").addEventListener("input", (e) => {
  renderTables(getActiveFilter(), e.target.value);
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initial render
renderTables();

// ✅ Load Menu from Database (PHP)
async function loadMenu() {
  try {
    const res = await fetch("get_menu.php");
    const data = await res.json();

    for (let category in data) {
      const gridId = category.toLowerCase().replace(" ", "-");
      const grid = document.getElementById(gridId);
      if (!grid) continue;

      grid.innerHTML = "";

      data[category].forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
          <h3>${item.name}</h3>
          <p class="price">Price: ₹${item.price}</p>
          <button onclick="addToOrder('${item.name}', ${item.price})">Add to Order</button>
        `;
        grid.appendChild(card);
      });
    }
  } catch (err) {
    console.error("Failed to load menu:", err);
  }
}

function addToOrder(name, price) {
  alert(`Added ${name} (₹${price}) to order.`);
}

// Call when page loads
document.addEventListener("DOMContentLoaded", loadMenu);

