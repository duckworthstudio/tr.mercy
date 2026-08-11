document.addEventListener('DOMContentLoaded', function () {

    // ================================================================
    // 1. FULL‑PAGE OVERLAY LOGIC
    // ================================================================
    const overlay = document.getElementById('galleryOverlay');
    const overlayTitle = document.getElementById('galleryTitle');
    const overlayGrid = document.getElementById('galleryGrid');
    const closeBtn = document.getElementById('galleryClose');

    document.querySelectorAll('.card').forEach(function (card) {
        const btn = card.querySelector('.view-btn');
        if (!btn) return;

        btn.addEventListener('click', function () {
            const title = card.dataset.title || 'Photos';
            const images = card.querySelectorAll('.image_container img');

            overlayGrid.innerHTML = '';
            images.forEach(function (img) {
                const clone = document.createElement('img');
                clone.src = img.src;
                clone.alt = img.alt || title;
                overlayGrid.appendChild(clone);
            });

            overlayTitle.textContent = title;
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeOverlay() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeOverlay();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
    });

    // ================================================================
    // 2. CATEGORY DROPDOWN & FILTERED GRID
    // ================================================================
    const toolbarLeft = document.getElementById('toolbarLeft');
    const toolbarTitle = document.getElementById('toolbarTitle');
    const arrowBtn = document.getElementById('toolbarArrowBtn');
    const dropdown = document.getElementById('categoryDropdown');
    const cards = document.querySelectorAll('.card');
    const contentEl = document.querySelector('.content');
    const filteredGrid = document.getElementById('filteredGrid');

    function clearFilter() {
        filteredGrid.classList.remove('active');
        filteredGrid.innerHTML = '';
        toolbarTitle.textContent = 'Global';
        contentEl.style.display = '';
    }

    cards.forEach(function (card) {
        const name = card.dataset.title;
        if (!name) return;
        const item = document.createElement('button');
        item.className = 'category-item';
        item.textContent = name;
        item.dataset.category = name;
        dropdown.appendChild(item);
    });

    const allItem = document.createElement('button');
    allItem.className = 'category-item category-item-all';
    allItem.textContent = 'Global (All)';
    allItem.dataset.category = 'all';
    dropdown.appendChild(allItem);

    function toggleDropdown() {
        dropdown.classList.toggle('open');
        toolbarLeft.classList.toggle('dropdown-open');
    }

    arrowBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleDropdown();
    });

    document.addEventListener('click', function (e) {
        if (!toolbarLeft.contains(e.target)) {
            dropdown.classList.remove('open');
            toolbarLeft.classList.remove('dropdown-open');
        }
    });

    dropdown.addEventListener('click', function (e) {
        const btn = e.target.closest('.category-item');
        if (!btn) return;

        const category = btn.dataset.category;
        dropdown.classList.remove('open');
        toolbarLeft.classList.remove('dropdown-open');

        if (category === 'all') {
            clearFilter();
            return;
        }

        const matchedCard = Array.from(cards).find(function (c) {
            return c.dataset.title === category;
        });
        if (!matchedCard) return;

        toolbarTitle.textContent = category;

        filteredGrid.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'filtered-grid-header';

        const titleEl = document.createElement('h3');
        titleEl.textContent = category;

        const closeFilterBtn = document.createElement('button');
        closeFilterBtn.className = 'filtered-grid-close';
        closeFilterBtn.innerHTML = '&times;';
        closeFilterBtn.setAttribute('aria-label', 'Close filter');
        closeFilterBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            clearFilter();
        });

        header.appendChild(titleEl);
        header.appendChild(closeFilterBtn);
        filteredGrid.appendChild(header);

        const imagesGrid = document.createElement('div');
        imagesGrid.className = 'filtered-grid-images';

        const images = matchedCard.querySelectorAll('.image_container img');
        images.forEach(function (img) {
            const clone = document.createElement('img');
            clone.src = img.src;
            clone.alt = img.alt || category;
            imagesGrid.appendChild(clone);
        });

        filteredGrid.appendChild(imagesGrid);
        filteredGrid.classList.add('active');
        contentEl.style.display = '';
    });

    // ================================================================
    // 3. "MORE" BUTTON – small & at the bottom
    // ================================================================
    const moreBtn = document.getElementById('moreBtn');
    const hiddenRows = document.getElementById('hiddenRows');

    moreBtn.addEventListener('click', function () {
        const isOpen = hiddenRows.classList.toggle('open');
        moreBtn.textContent = isOpen ? 'Show less' : 'More';
    });

});