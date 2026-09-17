/* ========================================
   WinGrow Agences - Niveau 1
   Script JavaScript
   ======================================== */

   document.addEventListener('DOMContentLoaded', function() {
    console.log('WinGrow - Page Niveau 1 chargée');
    
    initSearch();
    updateStats();
});

/* ========================================
   Recherche
   ======================================== */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const tableBody = document.getElementById('tableBody');
    const tableCount = document.getElementById('tableCount');
    const emptyState = document.getElementById('emptyState');
    
    if (!searchInput || !tableBody) return;
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    searchInput.addEventListener('input', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const rows = tableBody.querySelectorAll('tr');
        let visibleCount = 0;
        
        rows.forEach(function(row) {
            const username = row.querySelector('.username-link');
            const phone = row.querySelector('.phone-cell');
            const country = row.querySelector('.country-tag');
            
            const usernameText = username ? username.textContent.toLowerCase() : '';
            const phoneText = phone ? phone.textContent.toLowerCase() : '';
            const countryText = country ? country.textContent.toLowerCase() : '';
            
            if (usernameText.includes(searchTerm) || 
                phoneText.includes(searchTerm) || 
                countryText.includes(searchTerm) ||
                searchTerm === '') {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        if (tableCount) {
            tableCount.textContent = visibleCount + ' résultat' + (visibleCount > 1 ? 's' : '');
        }
        
        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }
}

/* ========================================
   Mise à jour des statistiques
   ======================================== */
function updateStats() {
    const tableBody = document.getElementById('tableBody');
    const totalUsersEl = document.getElementById('totalUsers');
    const totalAmountEl = document.getElementById('totalAmount');
    
    if (!tableBody) return;
    
    const rows = tableBody.querySelectorAll('tr');
    const totalUsers = rows.length;
    
    let totalAmount = 0;
    rows.forEach(function(row) {
        const status = row.querySelector('.status-badge.active');
        if (status) {
            totalAmount += 2000;
        }
    });
    
    if (totalUsersEl) {
        totalUsersEl.textContent = totalUsers;
    }
    
    if (totalAmountEl) {
        totalAmountEl.textContent = formatNumber(totalAmount);
    }
}

/* ========================================
   Fonctions utilitaires
   ======================================== */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.remove();
    }, 3000);
}