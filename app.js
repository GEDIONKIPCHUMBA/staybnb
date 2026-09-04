// Sample listings matching the screenshot + extras
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
    type: "Entire place",
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
    type: "Entire place",
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
    type: "Entire place",
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
    type: "Entire place",
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
    type: "Entire place",
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
    type: "Entire place",
    description: "Elegant traditional Balinese villa with private pool and tropical garden. Quiet Sanur location near the beach.",
    guests: 5
  },
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
    type: "Entire place",
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
    type: "Entire place",
    description: "Intimate bungalow deep in the jungle. Perfect for digital nomads seeking tranquility.",
    guests: 2
  }
];

let activeFilters = new Set(["pool"]);
let priceRange = { min: 0, max: 1000 };
let selectedTypes = new Set(["Entire place"]);
let currentSort = "recommended";
let wishlist = JSON.parse(localStorage.getItem("staybnb-wishlist") || "[]");
let map, markers = {};
let selectedId = null;
let guests = { adults: 2, children: 0, infants: 0 };

const grid = document.getElementById("listings-grid");
const resultsCount = document.getElementById("results-count");
const mapSection = document.querySelector(".map-section");

function init() {
  renderListings();
  initMap();
  bindEvents();
  updateGuestsDisplay();
  setTimeout(() => lucide.createIcons(), 100);
}

function getFilteredListings() {
  let result = [...listings];
  const tagFilters = [...activeFilters].filter(f => !["all", "price", "type"].includes(f));
  if (tagFilters.length > 0) {
    result = result.filter(l => tagFilters.every(f => l.tags.includes(f)));
  }
  result = result.filter(l => l.price >= priceRange.min && l.price <= priceRange.max);
  if (selectedTypes.size > 0) {
    result = result.filter(l => selectedTypes.has(l.type));
  }
  if (currentSort === "price-low") result.sort((a, b) => a.price - b.price);
  else if (currentSort === "price-high") result.sort((a, b) => b.price - a.price);
  else if (currentSort === "rating") result.sort((a, b) => b.rating - a.rating);
  return result;
}

function renderListings() {
  const filtered = getFilteredListings();
  resultsCount.textContent = `${filtered.length} stay${filtered.length !== 1 ? "s" : ""} in Bali`;
  grid.innerHTML = filtered.map((l, i) => {
    const liked = wishlist.includes(l.id);
    return `
      <article class="listing-card group cursor-pointer" data-id="${l.id}" style="animation-delay: ${i * 0.05}s">
        <div class="card-image-wrap relative aspect-[20/19] rounded-xl overflow-hidden bg-gray-200">
          <img src="${l.image}" alt="${l.title}" loading="lazy" class="w-full h-full object-cover">
          <button class="heart-btn absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-2xl drop-shadow-md ${liked ? "liked" : "text-black/50"}" data-id="${l.id}" aria-label="Save">
            ${liked ? "♥" : "♡"}
          </button>
        </div>
        <div class="pt-3 px-0.5">
          <div class="flex justify-between items-start gap-2">
            <span class="font-semibold text-[15px] truncate">${l.location}</span>
            <span class="flex items-center gap-1 text-sm shrink-0">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
              ${l.rating} <span class="text-gray-500">(${l.reviews})</span>
            </span>
          </div>
          <div class="text-[15px] text-gray-500 truncate mt-0.5">${l.title}</div>
          <div class="text-sm text-gray-500 mt-0.5">${l.distance} · ${l.dates}</div>
          <div class="mt-1.5 text-[15px]">
            <strong>$${l.price}</strong> night · <span class="text-gray-500">$${l.price * l.nights} total</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
  lucide.createIcons();
  grid.querySelectorAll(".heart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWishlist(+btn.dataset.id);
    });
  });
  grid.querySelectorAll(".listing-card").forEach(card => {
    card.addEventListener("click", () => openListingModal(+card.dataset.id));
  });
  updateMarkers(filtered);
}

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(id);
    showToast("Saved to wishlist");
  }
  localStorage.setItem("staybnb-wishlist", JSON.stringify(wishlist));
  renderListings();
}

function openListingModal(id) {
  const l = listings.find(x => x.id === id);
  if (!l) return;
  selectedId = id;
  document.getElementById("modal-body").innerHTML = `
    <div class="relative">
      <img src="${l.image}" alt="${l.title}" class="w-full h-64 sm:h-80 object-cover rounded-t-2xl">
    </div>
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-1">${l.title}</h2>
      <div class="flex items-center gap-2 text-sm mb-4">
        <span class="flex items-center gap-1"><i data-lucide="star" class="w-4 h-4 fill-current"></i> ${l.rating}</span>
        <span class="text-gray-400">·</span>
        <span class="underline font-medium">${l.reviews} reviews</span>
        <span class="text-gray-400">·</span>
        <span>${l.location}</span>
      </div>
      <p class="text-gray-600 leading-relaxed mb-4">${l.description}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${l.tags.map(t => `<span class="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">${t.replace("-", " ")}</span>`).join("")}
      </div>
      <div class="flex items-center gap-4 text-sm text-gray-600 mb-5">
        <span class="flex items-center gap-1.5"><i data-lucide="home" class="w-4 h-4"></i> ${l.type}</span>
        <span class="flex items-center gap-1.5"><i data-lucide="users" class="w-4 h-4"></i> Up to ${l.guests} guests</span>
      </div>
      <div class="border-t border-gray-200 pt-4 flex items-end justify-between">
        <div>
          <div class="text-xl font-semibold">$${l.price} <span class="text-base font-normal text-gray-500">night</span></div>
          <div class="text-sm text-gray-500">$${l.price * l.nights} total for 7 nights</div>
        </div>
        <button id="reserve-btn" class="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold hover:opacity-95 transition-opacity shadow-md">Reserve</button>
      </div>
    </div>
  `;
  lucide.createIcons();
  document.getElementById("reserve-btn")?.addEventListener("click", () => {
    showToast("🎉 Booking request sent! (demo)");
    closeAllModals();
  });
  openModal("listing-modal");
  Object.values(markers).forEach(m => m.getElement()?.classList.remove("selected"));
  if (markers[id]) {
    markers[id].getElement()?.classList.add("selected");
    map.setView([l.lat, l.lng], 12, { animate: true });
  }
}

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("hidden");
  el.classList.add("open", "flex");
  document.body.style.overflow = "hidden";
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(m => {
    m.classList.add("hidden");
    m.classList.remove("open", "flex");
  });
  document.getElementById("guests-popup")?.classList.add("hidden");
  document.getElementById("dates-popup")?.classList.add("hidden");
  document.body.style.overflow = "";
  selectedId = null;
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  t.classList.add("show");
  setTimeout(() => {
    t.classList.add("hidden");
    t.classList.remove("show");
  }, 2500);
}

function initMap() {
  map = L.map("map", { center: [-8.65, 115.2], zoom: 11, zoomControl: false });
  L.control.zoom({ position: "topright" }).addTo(map);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OSM &copy; CARTO",
    maxZoom: 19
  }).addTo(map);
  listings.forEach(l => {
    const icon = L.divIcon({ className: "custom-marker", iconSize: [26, 26], iconAnchor: [13, 26] });
    const marker = L.marker([l.lat, l.lng], { icon }).addTo(map);
    marker.bindPopup(`<strong>${l.title}</strong><br>$${l.price}/night`);
    marker.on("click", () => openListingModal(l.id));
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
  let text = total === 1 ? "1 guest" : `${total} guests`;
  if (guests.infants) text += `, ${guests.infants} infant${guests.infants > 1 ? "s" : ""}`;
  document.getElementById("guests-input").value = text;
  document.getElementById("adults-count").textContent = guests.adults;
  document.getElementById("children-count").textContent = guests.children;
  document.getElementById("infants-count").textContent = guests.infants;
}

function positionPopup(popup, trigger) {
  const rect = trigger.getBoundingClientRect();
  popup.style.top = `${rect.bottom + 8 + window.scrollY}px`;
  popup.style.left = `${Math.min(rect.left, window.innerWidth - 340)}px`;
}

function bindEvents() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      if (f === "price") { openModal("price-modal"); return; }
      if (f === "type") { openModal("type-modal"); return; }
      if (f === "all") {
        activeFilters.clear();
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderListings();
        return;
      }
      if (activeFilters.has(f)) {
        activeFilters.delete(f);
        btn.classList.remove("active");
      } else {
        activeFilters.add(f);
        btn.classList.add("active");
      }
      document.querySelector('[data-filter="all"]')?.classList.remove("active");
      renderListings();
    });
  });

  document.getElementById("apply-price")?.addEventListener("click", () => {
    const min = +document.getElementById("price-min").value || 0;
    const max = +document.getElementById("price-max").value || 1000;
    priceRange = { min, max };
    closeAllModals();
    renderListings();
    showToast(`Showing stays $${min} – $${max}`);
  });

  document.getElementById("price-range")?.addEventListener("input", (e) => {
    document.getElementById("price-max").value = e.target.value;
  });

  document.getElementById("apply-type")?.addEventListener("click", () => {
    selectedTypes.clear();
    document.querySelectorAll('input[name="type"]:checked').forEach(cb => selectedTypes.add(cb.value));
    closeAllModals();
    renderListings();
  });

  document.querySelectorAll(".close-modal, #modal-close").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => { if (e.target === modal) closeAllModals(); });
  });

  document.getElementById("become-host-btn")?.addEventListener("click", () => openModal("host-modal"));
  document.getElementById("menu-host")?.addEventListener("click", () => {
    closeAllModals();
    openModal("host-modal");
  });

  document.getElementById("menu-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal("menu-modal");
  });

  document.getElementById("sort")?.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderListings();
  });

  document.getElementById("search-btn")?.addEventListener("click", () => {
    const loc = document.getElementById("location-input").value;
    resultsCount.textContent = `${getFilteredListings().length} stays in ${loc.split(",")[0] || "Bali"}`;
    showToast("Search updated");
  });

  const guestsField = document.getElementById("guests-field");
  const guestsPopup = document.getElementById("guests-popup");
  guestsField?.addEventListener("click", (e) => {
    e.stopPropagation();
    positionPopup(guestsPopup, guestsField);
    guestsPopup.classList.remove("hidden");
    document.getElementById("dates-popup")?.classList.add("hidden");
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

  document.getElementById("guests-done")?.addEventListener("click", () => guestsPopup.classList.add("hidden"));

  const datesField = document.getElementById("dates-field");
  const datesPopup = document.getElementById("dates-popup");
  datesField?.addEventListener("click", (e) => {
    e.stopPropagation();
    positionPopup(datesPopup, datesField);
    datesPopup.classList.remove("hidden");
    guestsPopup.classList.add("hidden");
  });

  document.getElementById("dates-done")?.addEventListener("click", () => {
    const cin = document.getElementById("checkin").value;
    const cout = document.getElementById("checkout").value;
    if (cin && cout) {
      const fmt = d => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      document.getElementById("dates-input").value = `${fmt(cin)} – ${fmt(cout)}`;
    }
    datesPopup.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!guestsPopup.contains(e.target) && !guestsField.contains(e.target)) guestsPopup.classList.add("hidden");
    if (!datesPopup.contains(e.target) && !datesField.contains(e.target)) datesPopup.classList.add("hidden");
  });

  document.getElementById("mobile-map-btn")?.addEventListener("click", () => {
    mapSection.classList.add("mobile-open");
    setTimeout(() => map.invalidateSize(), 100);
  });
  document.getElementById("map-toggle")?.addEventListener("click", () => {
    if (mapSection.classList.contains("mobile-open")) mapSection.classList.remove("mobile-open");
  });

  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      if (tab.dataset.tab !== "stays") showToast(`${tab.textContent} coming soon`);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });
}

document.addEventListener("DOMContentLoaded", init);
