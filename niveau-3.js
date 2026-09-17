/* ========================================
   WinGrow Agences - Niveau 3
   Script JavaScript
   ======================================== */

   document.addEventListener('DOMContentLoaded', function() {
    console.log('WinGrow - Page Niveau 3 chargée');
    
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
    
    // Recherche au clic
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Recherche en temps réel
    searchInput.addEventListener('input', performSearch);
    
    // Recherche avec Enter
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
        
        // Mettre à jour le compteur
        if (tableCount) {
            tableCount.textContent = visibleCount + ' résultat' + (visibleCount > 1 ? 's' : '');
        }
        
        // Afficher l'état vide
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
    
    // Calculer le montant (500 XAF par utilisateur niveau 3)
    let totalAmount = 0;
    rows.forEach(function(row) {
        const status = row.querySelector('.status-badge.active');
        if (status) {
            totalAmount += 500;
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

// Toast notification
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.remove();
    }, 3000);
}