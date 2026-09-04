// Sample listings matching the screenshot (with real Unsplash images)
const listings = [
  {
    id: 1,
    title: "Tropical villa with pool",
    location: "Bali, Ubud",
    rating: 4.92,
    reviews: 128,
    price: 120,
    nights: 7,
    distance: "5 km to Ubud Monkey Forest",
    dates: "Oct 12–18",
    lat: -8.5069,
    lng: 115.2625,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    tags: ["pool", "wifi", "kitchen", "free-cancel"],
    type: "Entire villa",
    description: "Stunning tropical villa surrounded by lush greenery with a private infinity pool. Perfect for a peaceful retreat near Ubud's cultural attractions.",
    guests: 4
  },
  {
    id: 2,
    title: "Beachfront house with ocean view",
    location: "Bali, Seminyak",
    rating: 4.85,
    reviews: 94,
    price: 185,
    nights: 7,
    distance: "200 m to Seminyak Beach",
    dates: "Oct 12–18",
    lat: -8.6905,
    lng: 115.1681,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
    tags: ["pool", "beachfront", "wifi", "kitchen", "free-cancel"],
    type: "Entire house",
    description: "Modern beachfront villa with panoramic ocean views. Steps from Seminyak's vibrant beach clubs and restaurants.",
    guests: 6
  },
  {
    id: 3,
    title: "Ricefield villa with garden",
    location: "Bali, Canggu",
    rating: 4.98,
    reviews: 203,
    price: 95,
    nights: 7,
    distance: "2 km to Echo Beach",
    dates: "Oct 12–18",
    lat: -8.6478,
    lng: 115.1385,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    tags: ["pool", "wifi", "kitchen", "pet", "free-cancel"],
    type: "Entire villa",
    description: "Charming villa overlooking emerald rice terraces. Private garden, pool and authentic Balinese architecture.",
    guests: 4
  },
  {
    id: 4,
    title: "Forest cabin with cliff view",
    location: "Bali, Uluwatu",
    rating: 4.80,
    reviews: 56,
    price: 110,
    nights: 7,
    distance: "3 km to Uluwatu Cliff",
    dates: "Oct 12–18",
    lat: -8.8291,
    lng: 115.0849,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    tags: ["wifi", "kitchen", "free-cancel"],
    type: "Cabin",
    description: "Secluded wooden cabin nestled in the forest with breathtaking cliff and ocean views. Ideal for nature lovers.",
    guests: 2
  },
  {
    id: 5,
    title: "Rooftop apartment with pool",
    location: "Bali, Kuta",
    rating: 4.73,
    reviews: 211,
    price: 78,
    nights: 7,
    distance: "1 km to Kuta Beach",
    dates: "Oct 12–18",
    lat: -8.7222,
    lng: 115.1761,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    tags: ["pool", "wifi", "kitchen", "free-cancel"],
    type: "Entire apartment",
    description: "Stylish rooftop apartment with shared pool and city views. Walking distance to Kuta Beach and nightlife.",
    guests: 3
  },
  {
    id: 6,
    title: "Garden villa with private pool",
    location: "Bali, Sanur",
    rating: 4.91,
    reviews: 167,
    price: 140,
    nights: 7,
    distance: "800 m to Sanur Beach",
    dates: "Oct 12–18",
    lat: -8.6781,
    lng: 115.2631,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    tags: ["pool", "beachfront", "wifi", "kitchen", "pet", "free-cancel"],
    type: "Entire villa",
    description: "Elegant traditional Balinese villa with private pool and tropical garden. Quiet Sanur location near the beach.",
    guests: 5
  },
  // Extra listings for more functionality
  {
    id: 7,
    title: "Luxury oceanfront suite",
    location: "Bali, Nusa Dua",
    rating: 4.95,
    reviews: 89,
    price: 250,
    nights: 7,
    distance: "50 m to beach",
    dates: "Oct 12–18",
    lat: -8.8005,
    lng: 115.2321,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    tags: ["pool", "beachfront", "wifi", "kitchen", "free-cancel"],
    type: "Suite",
    description: "Ultra-luxurious suite with direct beach access and private plunge pool.",
    guests: 2
  },
  {
    id: 8,
    title: "Cozy jungle bungalow",
    location: "Bali, Ubud",
    rating: 4.88,
    reviews: 142,
    price: 65,
    nights: 7,
    distance: "1.5 km to Monkey Forest",
    dates: "Oct 12–18",
    lat: -8.5195,
    lng: 115.2598,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    tags: ["wifi", "kitchen", "pet", "free-cancel"],
    type: "Bungalow",
    description: "Intimate bungalow deep in the jungle. Perfect for digital nomads seeking tranquility.",
    guests: 2
  }
];

let activeFilters = new Set(["pool"]); // start with Pool active like screenshot
let currentSort = "recommended";
let wishlist = JSON.parse(localStorage.getItem("staybnb-wishlist") || "[]");
let map, markers = {};
let selectedId = null;

// DOM elements
const grid = document.getElementById("listings-grid");
const resultsCount = document.getElementById("results-count");
const modal = document.getElementById("listing-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const guestsPopup = document.getElementById("guests-popup");
const datesPopup = document.getElementById("dates-popup");
const mapSection = document.querySelector(".map-section");

// Guests state
let guests = { adults: 2, children: 0, infants: 0 };

function init() {
  renderListings();
  initMap();
  bindEvents();
  updateGuestsDisplay();
}

function getFilteredListings() {
  let result = [...listings];

  // Apply filters
  if (activeFilters.size > 0 && !activeFilters.has("all")) {
    result = result.filter(l => {
      // special handling for price & type later
      const nonSpecial = [...activeFilters].filter(f => f !== "price" && f !== "type" && f !== "all");
      if (nonSpecial.length === 0) return true;
      return nonSpecial.every(f => l.tags.includes(f));
    });
  }

  // Sort
  if (currentSort === "price-low") {
    result.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    result.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}

function renderListings() {
  const filtered = getFilteredListings();
  resultsCount.textContent = `${filtered.length} stay${filtered.length !== 1 ? "s" : ""} in Bali`;

  grid.innerHTML = filtered.map(l => {
    const liked = wishlist.includes(l.id);
    return `
      <article class="listing-card" data-id="${l.id}">
        <div class="card-image-wrap">
          <img src="${l.image}" alt="${l.title}" loading="lazy">
          <button class="heart-btn ${liked ? "liked" : ""}" data-id="${l.id}" aria-label="Save">
            ${liked ? "♥" : "♡"}
          </button>
        </div>
        <div class="card-info">
          <div class="card-top">
            <span class="card-location">${l.location}</span>
            <span class="card-rating">★ ${l.rating} <span style="color:var(--gray-500)">(${l.reviews})</span></span>
          </div>
          <div class="card-title">${l.title}</div>
          <div class="card-meta">${l.distance} · ${l.dates}</div>
          <div class="card-price"><strong>$${l.price}</strong> night · <span class="total">$${l.price * l.nights} total</span></div>
        </div>
      </article>
    `;
  }).join("");

  // Heart clicks
  grid.querySelectorAll(".heart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWishlist(+btn.dataset.id);
    });
  });

  // Card clicks
  grid.querySelectorAll(".listing-card").forEach(card => {
    card.addEventListener("click", () => openModal(+card.dataset.id));
  });

  // Update map markers visibility
  updateMarkers(filtered);
}

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem("staybnb-wishlist", JSON.stringify(wishlist));
  renderListings();
}

function openModal(id) {
  const l = listings.find(x => x.id === id);
  if (!l) return;
  selectedId = id;
  modalBody.innerHTML = `
    <img src="${l.image}" alt="${l.title}">
    <div class="modal-details">
      <h2>${l.title}</h2>
      <div class="rating">★ ${l.rating} · ${l.reviews} reviews · ${l.location}</div>
      <p class="desc">${l.description}</p>
      <p><strong>Type:</strong> ${l.type} · Up to ${l.guests} guests</p>
      <p><strong>Amenities:</strong> ${l.tags.map(t => t.replace("-", " ")).join(", ")}</p>
      <div class="modal-price">$${l.price} <span style="font-weight:400;font-size:16px">night</span></div>
      <p style="color:var(--gray-500);margin-top:4px">$${l.price * l.nights} total for 7 nights</p>
      <button class="book-btn" onclick="alert('Booking confirmed! (demo)')">Reserve</button>
    </div>
  `;
  modal.classList.add("open");
  // Highlight marker
  Object.values(markers).forEach(m => m.getElement()?.classList.remove("selected"));
  if (markers[id]) {
    markers[id].getElement()?.classList.add("selected");
    map.setView([l.lat, l.lng], 12);
  }
}

function closeModal() {
  modal.classList.remove("open");
  selectedId = null;
}

function initMap() {
  map = L.map("map", {
    center: [-8.65, 115.2],
    zoom: 11,
    zoomControl: false
  });

  L.control.zoom({ position: "topright" }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  listings.forEach(l => {
    const icon = L.divIcon({
      className: "custom-marker",
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });
    const marker = L.marker([l.lat, l.lng], { icon }).addTo(map);
    marker.bindPopup(`<strong>${l.title}</strong><br>$${l.price}/night`);
    marker.on("click", () => openModal(l.id));
    markers[l.id] = marker;
  });
}

function updateMarkers(visible) {
  const ids = new Set(visible.map(l => l.id));
  Object.entries(markers).forEach(([id, marker]) => {
    if (ids.has(+id)) {
      if (!map.hasLayer(marker)) marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });
}

function updateGuestsDisplay() {
  const total = guests.adults + guests.children;
  const text = total === 1 ? "1 guest" : `${total} guests`;
  document.getElementById("guests-input").value = text + (guests.infants ? `, ${guests.infants} infant${guests.infants > 1 ? "s" : ""}` : "");
  document.getElementById("adults-count").textContent = guests.adults;
  document.getElementById("children-count").textContent = guests.children;
  document.getElementById("infants-count").textContent = guests.infants;
}

function bindEvents() {
  // Filters
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      if (f === "all" || f === "price" || f === "type") {
        // simple toggle for demo – price/type open alerts or could expand
        if (f === "price") {
          alert("Price filter demo: showing all (in a full app this would open a range slider)");
          return;
        }
        if (f === "type") {
          alert("Type of place filter demo: Entire place / Private room / Shared room");
          return;
        }
      }
      if (activeFilters.has(f)) {
        activeFilters.delete(f);
        btn.classList.remove("active");
      } else {
        activeFilters.add(f);
        btn.classList.add("active");
      }
      // clear "all" if any other is selected
      if (f !== "all") {
        document.querySelector('[data-filter="all"]')?.classList.remove("active");
        activeFilters.delete("all");
      }
      renderListings();
    });
  });

  // Sort
  document.getElementById("sort").addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderListings();
  });

  // Search button
  document.getElementById("search-btn").addEventListener("click", () => {
    const loc = document.getElementById("location-input").value;
    resultsCount.textContent = `${getFilteredListings().length} stays in ${loc.split(",")[0] || "Bali"}`;
    // In a real app this would fetch new data
  });

  // Modal
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Guests popup
  const guestsInput = document.getElementById("guests-input");
  guestsInput.addEventListener("click", (e) => {
    const rect = guestsInput.getBoundingClientRect();
    guestsPopup.style.top = (rect.bottom + 8) + "px";
    guestsPopup.style.left = rect.left + "px";
    guestsPopup.classList.add("open");
    datesPopup.classList.remove("open");
  });

  document.querySelectorAll(".counter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const action = btn.dataset.action;
      if (action === "inc") {
        if (type === "adults" && guests.adults < 16) guests.adults++;
        if (type === "children" && guests.children < 10) guests.children++;
        if (type === "infants" && guests.infants < 5) guests.infants++;
      } else {
        if (type === "adults" && guests.adults > 1) guests.adults--;
        if (type === "children" && guests.children > 0) guests.children--;
        if (type === "infants" && guests.infants > 0) guests.infants--;
      }
      updateGuestsDisplay();
    });
  });

  document.getElementById("guests-done").addEventListener("click", () => {
    guestsPopup.classList.remove("open");
  });

  // Dates popup
  const datesInput = document.getElementById("dates-input");
  datesInput.addEventListener("click", (e) => {
    const rect = datesInput.getBoundingClientRect();
    datesPopup.style.top = (rect.bottom + 8) + "px";
    datesPopup.style.left = rect.left + "px";
    datesPopup.classList.add("open");
    guestsPopup.classList.remove("open");
  });

  document.getElementById("dates-done").addEventListener("click", () => {
    const cin = document.getElementById("checkin").value;
    const cout = document.getElementById("checkout").value;
    if (cin && cout) {
      const format = (d) => {
        const date = new Date(d);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      };
      datesInput.value = `${format(cin)} – ${format(cout)}`;
    }
    datesPopup.classList.remove("open");
  });

  // Close popups on outside click
  document.addEventListener("click", (e) => {
    if (!guestsPopup.contains(e.target) && e.target !== guestsInput) {
      guestsPopup.classList.remove("open");
    }
    if (!datesPopup.contains(e.target) && e.target !== datesInput) {
      datesPopup.classList.remove("open");
    }
  });

  // Mobile map toggle
  document.getElementById("map-toggle")?.addEventListener("click", () => {
    mapSection.classList.toggle("mobile-open");
    if (mapSection.classList.contains("mobile-open")) {
      setTimeout(() => map.invalidateSize(), 100);
    }
  });

  // Nav tabs (visual only)
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      if (tab.dataset.tab !== "stays") {
        alert(`${tab.textContent} section – demo only. Stays is the main view.`);
      }
    });
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      guestsPopup.classList.remove("open");
      datesPopup.classList.remove("open");
    }
  });
}

// Start
document.addEventListener("DOMContentLoaded", init);
