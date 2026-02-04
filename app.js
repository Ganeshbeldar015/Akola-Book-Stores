// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const ITEMS_PER_PAGE = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(businesses.length / ITEMS_PER_PAGE);

    // DOM Elements
    const cardsContainer = document.getElementById('cardsContainer');
    const pagination = document.getElementById('pagination');
    const showingText = document.getElementById('showingText');

    // Initialize the page
    init();

    function init() {
        // Check for page parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        if (pageParam) {
            const parsedPage = parseInt(pageParam);
            if (parsedPage >= 1 && parsedPage <= totalPages) {
                currentPage = parsedPage;
            }
        }
        
        renderBusinessCards();
        renderPagination();
        updateShowingText();
    }

    function renderBusinessCards() {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentBusinesses = businesses.slice(startIndex, endIndex);

        cardsContainer.innerHTML = '';

        currentBusinesses.forEach((business, index) => {
            const card = createBusinessCard(business, startIndex + index + 1);
            cardsContainer.appendChild(card);
        });
    }

    function createBusinessCard(business, displayNumber) {
        const card = document.createElement('div');
        card.className = 'business-card';
        // Make the whole card clickable except the button which has its own link
        card.onclick = (e) => {
             if (e.target.tagName !== 'A') {
                 viewBusinessDetail(business.id);
             }
        };

        // Format phone number
        const displayPhone = business.phone && business.phone !== "Contact Unavailable" ? business.phone : "No Phone";

        card.innerHTML = `
            <div class="card-badge">${displayNumber}</div>
            
            <h3 class="card-title">${business.name}</h3>
            
            <div class="card-address">
                ${business.address}
            </div>
            
            <div class="card-meta">
                <div class="meta-pill">
                    <i>📞</i> ${displayPhone}
                </div>
                <div class="meta-pill">
                    ${business.category.split(' ')[0]}
                </div>
            </div>
            
            <a href="detail.html?id=${business.id}" class="view-btn-block">
                View Details
            </a>
        `;

        return card;
    }

    function renderPagination() {
        pagination.innerHTML = '';

        // Previous Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn nav-btn';
        prevBtn.innerHTML = '←';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => goToPage(currentPage - 1);
        pagination.appendChild(prevBtn);

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => goToPage(i);
            pagination.appendChild(pageBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn nav-btn';
        nextBtn.innerHTML = '→';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => goToPage(currentPage + 1);
        pagination.appendChild(nextBtn);
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        
        currentPage = page;
        
        // Update URL without reloading
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('page', page);
        window.history.pushState({}, '', newUrl);
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        renderBusinessCards();
        renderPagination();
        updateShowingText();
    }

    function updateShowingText() {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
        const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, businesses.length);
        showingText.textContent = `Displaying ${startIndex}-${endIndex} of ${businesses.length} Establishments`;
        showingText.style.opacity = '0.5';
        showingText.style.fontSize = '0.8rem';
        showingText.style.marginTop = '24px';
        showingText.style.letterSpacing = '1px';
        showingText.style.textTransform = 'uppercase';
    }

    function viewBusinessDetail(id) {
        window.location.href = `detail.html?id=${id}`;
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        if (pageParam) {
            currentPage = parseInt(pageParam);
        } else {
            currentPage = 1;
        }
        renderBusinessCards();
        renderPagination();
        updateShowingText();
    });
});
