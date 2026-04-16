
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.btn');
    const galleryItems = document.querySelectorAll('.column');
    
    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');
    
    // Function to filter gallery items based on category
    function filterGallery(filterValue) {
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
            } else {
                if (item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            }
        });
        
        const visibleItems = document.querySelectorAll('.column:not(.hide)');
        visibleItems.forEach((item, index) => {
            item.style.animation = 'none';
            item.offsetHeight;
            item.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.03}s`;
        });
    }
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterGallery(filterValue);
        });
        
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', `Filter by ${button.innerText}`);
    });
    
    // Lightbox functionality
    const allContentCards = document.querySelectorAll('.content');
    
    allContentCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const imgElement = this.querySelector('img');
            const imgSrc = imgElement ? imgElement.src : '';
            
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeLightboxFunction() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (!lightbox.classList.contains('active')) {
                lightboxImg.src = '';
            }
        }, 300);
    }
    
    closeLightbox.addEventListener('click', closeLightboxFunction);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunction();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxFunction();
        }
    });
    
    // Initialize gallery showing all images
    filterGallery('all');
    
    // Add lazy loading to all images for better performance
    const allImages = document.querySelectorAll('.content img');
    allImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.addEventListener('error', function() {
            this.style.background = '#d9e2dc';
            this.style.objectFit = 'cover';
        });
    });
    
    // Responsive grid gap adjustment
    function handleResize() {
        const grid = document.querySelector('.row');
        if (window.innerWidth < 520) {
            grid.style.gap = '0.8rem';
        } else {
            grid.style.gap = '1.8rem';
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    
    console.log('Gallery ready — Click any image to view full size!');
});