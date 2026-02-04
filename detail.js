// Detail Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const detailContent = document.getElementById("detailContent");

  // Get business ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const businessId = parseInt(urlParams.get("id"));

  // Find the business
  const business = businesses.find((b) => b.id === businessId);

  if (business) {
    renderBusinessDetail(business);
    updatePageTitle(business.name);
  } else {
    renderNotFound();
  }

  function renderBusinessDetail(business) {
    const mapUrl = business.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + " " + business.address)}`;
    const lat = business.latitude || "Not Available";
    const long = business.longitude || "Not Available";
    
    // Format phone number for display if needed
    const displayPhone = business.phone || "Contact Unavailable";

    detailContent.innerHTML = `
            <div class="detail-card">
                <a href="index.html" class="back-btn-top">
                    <span>←</span> Back to Collection
                </a>
                
                <div class="detail-header-section">
                    <span class="category-badge">${business.category}</span>
                    <h1 class="detail-title">${business.name}</h1>
                    
                    <div class="divider"></div>
                    
                    <!-- Address Section -->
                    <div class="detail-section-title">
                        <i>📍</i> ADDRESS
                    </div>
                    <div class="address-text">
                        ${business.address}
                    </div>
                    
                    <a href="${mapUrl}" target="_blank" class="map-btn">
                        🗺️ Open in Maps
                    </a>
                    
                    <!-- Coordinates Box -->
                    <div class="info-box">
                        <span class="info-label">Coordinates:</span> ${lat}, ${long}
                    </div>
                    
                    <!-- Phone Section -->
                    <div class="detail-section-title" style="margin-top: 40px;">
                        <i>📞</i> PHONE
                    </div>
                    <div class="info-box" style="background: #efebe9;">
                        ${displayPhone}
                    </div>
                </div>
            </div>
        `;
  }

  function updatePageTitle(name) {
    document.title = `${name} | Akola Book Stores`;
  }

  function renderNotFound() {
    detailContent.innerHTML = `
            <div style="text-align: center; padding: 100px 0;">
                <h2 style="font-family: var(--font-heading); font-size: 3rem; margin-bottom: 20px;">Restaurant Not Found</h2>
                <a href="index.html" class="view-btn" style="display: inline-block; width: auto; padding: 12px 30px;">Return Home</a>
            </div>
        `;
  }
});
