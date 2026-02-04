// Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const detailContent = document.getElementById('detailContent');
    
    // Get business ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = parseInt(urlParams.get('id'));
    
    // Find the business
    const business = businesses.find(b => b.id === businessId);
    
    if (business) {
        renderBusinessDetail(business);
        updatePageTitle(business.name);
    } else {
        renderNotFound();
    }
    
    function renderBusinessDetail(business) {
        detailContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 40px;">
                <a href="index.html" class="back-link" style="text-decoration: none; color: var(--text-secondary); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">← Back to Collection</a>
            </div>
            
            <div class="detail-card">
                <div class="detail-header-section">
                    <span class="detail-category">${business.category}</span>
                    <h1 class="detail-title">${business.name}</h1>
                    <div style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--text-secondary); margin-top: 24px; line-height: 1.8; max-width: 700px; margin-left: auto; margin-right: auto;">
                        ${business.description}
                    </div>
                </div>
                
                <div class="detail-info-grid">
                    <div class="info-item">
                        <h4>Location</h4>
                        <p>${business.address}</p>
                    </div>
                    
                    <div class="info-item">
                        <h4>Reservations</h4>
                        <p><a href="tel:${business.phone.replace(/\s/g, '')}">${business.phone}</a></p>
                    </div>
                    
                    <div class="info-item">
                        <h4>Hours</h4>
                        <p>${business.hours}</p>
                    </div>
                    
                    <div class="info-item">
                        <h4>Connect</h4>
                        <p><a href="${business.website}" target="_blank" rel="noopener noreferrer">Visit Website ↗</a></p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function updatePageTitle(name) {
        document.title = `${name} | Pune Dining Collection`;
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
