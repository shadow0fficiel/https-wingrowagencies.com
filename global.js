/**
 * WinGrow Agences - Global JavaScript
 */

 document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Configuration Globale
    // ========================================
    const CONFIG = {
      siteName: 'WinGrow Agences',
      currency: localStorage.getItem('wingrow_currency') || 'XOF',
      username: localStorage.getItem('wingrow_username') || 'Utilisateur'
    };
  
    // Pays et réseaux
    const COUNTRIES = {
      // XOF - UEMOA
      CI: { name: 'Côte d\'Ivoire', prefix: '+225', currency: 'XOF', networks: ['Orange', 'MTN', 'Moov', 'Wave'] },
      SN: { name: 'Sénégal', prefix: '+221', currency: 'XOF', networks: ['Orange', 'Free', 'Wave'] },
      ML: { name: 'Mali', prefix: '+223', currency: 'XOF', networks: ['Orange', 'Moov'] },
      BF: { name: 'Burkina Faso', prefix: '+226', currency: 'XOF', networks: ['Orange', 'Moov'] },
      BJ: { name: 'Bénin', prefix: '+229', currency: 'XOF', networks: ['MTN', 'Moov'] },
      TG: { name: 'Togo', prefix: '+228', currency: 'XOF', networks: ['Togocel', 'Moov'] },
      NE: { name: 'Niger', prefix: '+227', currency: 'XOF', networks: ['Airtel', 'Moov'] },
      GW: { name: 'Guinée-Bissau', prefix: '+245', currency: 'XOF', networks: ['MTN', 'Orange'] },
      // XAF - CEMAC
      CM: { name: 'Cameroun', prefix: '+237', currency: 'XAF', networks: ['Orange', 'MTN', 'Nexttel'] },
      GA: { name: 'Gabon', prefix: '+241', currency: 'XAF', networks: ['Airtel', 'Moov'] },
      CG: { name: 'Congo', prefix: '+242', currency: 'XAF', networks: ['MTN', 'Airtel'] },
      TD: { name: 'Tchad', prefix: '+235', currency: 'XAF', networks: ['Airtel', 'Moov'] },
      CF: { name: 'Centrafrique', prefix: '+236', currency: 'XAF', networks: ['Orange', 'Moov'] },
      GQ: { name: 'Guinée Équatoriale', prefix: '+240', currency: 'XAF', networks: ['Orange', 'MTN'] }
    };
  
    const NETWORK_STYLES = {
      Orange: { icon: 'O', class: 'orange' },
      MTN: { icon: 'M', class: 'mtn' },
      Moov: { icon: 'M', class: 'moov' },
      Wave: { icon: 'W', class: 'wave' },
      Free: { icon: 'F', class: 'free' },
      Airtel: { icon: 'A', class: 'airtel' },
      Nexttel: { icon: 'N', class: 'nexttel' },
      Togocel: { icon: 'T', class: 'togocel' }
    };
  
    // ========================================
    // Slide Menu
    // ========================================
    const menuBtn = document.getElementById('menuBtn');
    const menuClose = document.getElementById('menuClose');
    const slideMenu = document.getElementById('slideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
  
    function openMenu() {
      if (slideMenu) slideMenu.classList.add('active');
      if (menuOverlay) menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    function closeMenu() {
      if (slideMenu) slideMenu.classList.remove('active');
      if (menuOverlay) menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  
    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  
    // Submenus
    document.querySelectorAll('.menu-toggle').forEach(toggle => {
      toggle.addEventListener('click', function() {
        const parent = this.parentElement;
        document.querySelectorAll('.menu-item.open').forEach(item => {
          if (item !== parent) item.classList.remove('open');
        });
        parent.classList.toggle('open');
      });
    });
  
    // ========================================
    // Eye Toggle (Masquer/Afficher soldes)
    // ========================================
    const toggleSolde = document.getElementById('toggleSolde');
    const soldeEl = document.getElementById('soldeDisponible');
    const toggleRetire = document.getElementById('toggleRetire');
    const retireEl = document.getElementById('totalRetire');
  
    function setupEyeToggle(btn, el) {
      if (!btn || !el) return;
      let visible = true;
      btn.addEventListener('click', () => {
        visible = !visible;
        if (visible) {
          el.textContent = el.dataset.value;
          btn.innerHTML = '<i class="ri-eye-line"></i>';
        } else {
          el.textContent = '••••••••';
          btn.innerHTML = '<i class="ri-eye-off-line"></i>';
        }
      });
    }
  
    setupEyeToggle(toggleSolde, soldeEl);
    setupEyeToggle(toggleRetire, retireEl);
  
    // ========================================
    // Copy Referral Link
    // ========================================
    const copyBtn = document.getElementById('copyBtn');
    const refLink = document.getElementById('refLink');
  
    if (copyBtn && refLink) {
      refLink.value = `https://wingrow.com/ref/${CONFIG.username}`;
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(refLink.value).then(() => {
          showToast('✅ Lien copié !', 'success');
          copyBtn.innerHTML = '<i class="ri-check-line"></i>';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="ri-file-copy-line"></i>';
          }, 2000);
        });
      });
    }
  
    // ========================================
    // WhatsApp Box
    // ========================================
    const whatsappClose = document.getElementById('whatsappClose');
    const whatsappSection = document.getElementById('whatsappSection');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappInput = document.getElementById('whatsappInput');
  
    if (whatsappClose && whatsappSection) {
      whatsappClose.addEventListener('click', () => {
        whatsappSection.classList.add('hidden');
      });
    }
  
    if (whatsappBtn && whatsappInput) {
      whatsappBtn.addEventListener('click', () => {
        const num = whatsappInput.value.replace(/\s/g, '');
        if (num.length >= 8) {
          localStorage.setItem('wingrow_whatsapp', num);
          showToast('✅ Numéro enregistré !', 'success');
          whatsappSection.classList.add('hidden');
        } else {
          showToast('⚠️ Numéro invalide', 'error');
        }
      });
    }
  
    // ========================================
    // Payment Page Logic
    // ========================================
    const paysSelect = document.getElementById('pays');
    const networkGroup = document.getElementById('networkGroup');
    const networkOptions = document.getElementById('networkOptions');
    const phoneGroup = document.getElementById('phoneGroup');
    const phonePrefix = document.getElementById('phonePrefix');
    const payBtn = document.getElementById('payBtn');
    const paymentForm = document.getElementById('paymentForm');
  
    let selectedNetwork = null;
  
    if (paysSelect) {
      paysSelect.addEventListener('change', function() {
        const code = this.value;
        if (!code) {
          if (networkGroup) networkGroup.classList.add('hidden');
          if (phoneGroup) phoneGroup.classList.add('hidden');
          if (payBtn) payBtn.classList.add('hidden');
          return;
        }
  
        const country = COUNTRIES[code];
        localStorage.setItem('wingrow_country', code);
        localStorage.setItem('wingrow_currency', country.currency);
  
        // Render networks
        if (networkOptions) {
          networkOptions.innerHTML = country.networks.map(network => {
            const style = NETWORK_STYLES[network];
            return `
              <button type="button" class="network-btn" data-network="${network}">
                <div class="icon ${style.class}">${style.icon}</div>
                <span class="name">${network}</span>
              </button>
            `;
          }).join('');
  
          document.querySelectorAll('.network-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              document.querySelectorAll('.network-btn').forEach(b => b.classList.remove('selected'));
              this.classList.add('selected');
              selectedNetwork = this.dataset.network;
              if (phoneGroup) phoneGroup.classList.remove('hidden');
              if (payBtn) payBtn.classList.remove('hidden');
            });
          });
        }
  
        if (phonePrefix) phonePrefix.textContent = country.prefix;
        if (networkGroup) networkGroup.classList.remove('hidden');
        if (phoneGroup) phoneGroup.classList.add('hidden');
        if (payBtn) payBtn.classList.add('hidden');
        selectedNetwork = null;
      });
    }
  
    // Phone formatting
    const phoneInput = document.getElementById('numero');
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        let val = this.value.replace(/\D/g, '');
        let formatted = '';
        for (let i = 0; i < val.length && i < 10; i++) {
          if (i > 0 && i % 2 === 0) formatted += ' ';
          formatted += val[i];
        }
        this.value = formatted;
      });
    }
  
    // Payment form submit
    if (paymentForm) {
      paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = phoneInput ? phoneInput.value.replace(/\s/g, '') : '';
        
        if (phone.length < 8) {
          showToast('⚠️ Numéro invalide', 'error');
          return;
        }
  
        if (payBtn) {
          payBtn.disabled = true;
          payBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i> Traitement...';
        }
  
        setTimeout(() => {
          if (payBtn) {
            payBtn.disabled = false;
            payBtn.innerHTML = '<i class="ri-secure-payment-line"></i> Payer 5 000 FCFA';
          }
          showToast('✅ Validez sur votre téléphone !', 'success');
        }, 2000);
      });
    }
  
    // ========================================
    // Update Username displays
    // ========================================
    const headerUsername = document.getElementById('headerUsername');
    const balanceUsername = document.getElementById('balanceUsername');
    
    if (headerUsername) headerUsername.textContent = CONFIG.username;
    if (balanceUsername) balanceUsername.textContent = CONFIG.username;
  
    // ========================================
    // Toast Function
    // ========================================
    window.showToast = function(msg, type = '') {
      const existing = document.querySelector('.toast');
      if (existing) existing.remove();
  
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = msg;
      document.body.appendChild(toast);
  
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    };
  
    // ========================================
    // Expose globals
    // ========================================
    window.WinGrow = {
      CONFIG,
      COUNTRIES,
      NETWORK_STYLES,
      showToast
    };
  
  });