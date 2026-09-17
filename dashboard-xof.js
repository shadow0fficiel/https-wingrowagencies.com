/**
 * WinGrow Agences - Dashboard XAF
 */

 document.addEventListener('DOMContentLoaded', function() {
  const username = 'Utilisateur';
  
  document.getElementById('headerUsername').textContent = username;
  document.getElementById('balanceUsername').textContent = username;
  document.getElementById('refLink').value = `https://wingrow.com/ref/${username}`;

  // Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const menuClose = document.getElementById('menuClose');
  const slideMenu = document.getElementById('slideMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  function openMenu() {
    slideMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    slideMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Submenu Toggle
  document.querySelectorAll('.menu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const parent = this.parentElement;
      document.querySelectorAll('.menu-item.open').forEach(item => {
        if (item !== parent) item.classList.remove('open');
      });
      parent.classList.toggle('open');
    });
  });

  // Toggle Solde
  const toggleSolde = document.getElementById('toggleSolde');
  const soldeDisponible = document.getElementById('soldeDisponible');
  let soldeVisible = true;

  toggleSolde.addEventListener('click', function() {
    soldeVisible = !soldeVisible;
    if (soldeVisible) {
      soldeDisponible.textContent = soldeDisponible.getAttribute('data-value');
      this.innerHTML = '<i class="ri-eye-line"></i>';
    } else {
      soldeDisponible.textContent = '••••••••';
      this.innerHTML = '<i class="ri-eye-off-line"></i>';
    }
  });

  const toggleRetire = document.getElementById('toggleRetire');
  const totalRetire = document.getElementById('totalRetire');
  let retireVisible = true;

  toggleRetire.addEventListener('click', function() {
    retireVisible = !retireVisible;
    if (retireVisible) {
      totalRetire.textContent = totalRetire.getAttribute('data-value');
      this.innerHTML = '<i class="ri-eye-line"></i>';
    } else {
      totalRetire.textContent = '••••••••';
      this.innerHTML = '<i class="ri-eye-off-line"></i>';
    }
  });

  // Copy Referral
  const copyBtn = document.getElementById('copyBtn');
  const refLink = document.getElementById('refLink');

  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(refLink.value).then(() => {
      showToast('✅ Lien copié !');
      copyBtn.innerHTML = '<i class="ri-check-line"></i>';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="ri-file-copy-line"></i>';
      }, 2000);
    });
  });

  // WhatsApp Box
  const whatsappSection = document.getElementById('whatsappSection');
  const whatsappClose = document.getElementById('whatsappClose');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const whatsappInput = document.getElementById('whatsappInput');

  // Check if already saved or dismissed
  if (localStorage.getItem('whatsappSaved') || localStorage.getItem('whatsappDismissed')) {
    whatsappSection.classList.add('hidden');
  }

  // Close button
  whatsappClose.addEventListener('click', function() {
    whatsappSection.classList.add('hidden');
    localStorage.setItem('whatsappDismissed', 'true');
  });

  // Save number
  whatsappBtn.addEventListener('click', function() {
    const number = whatsappInput.value.replace(/\s/g, '');
    
    if (number.length >= 8) {
      localStorage.setItem('whatsappNumber', number);
      localStorage.setItem('whatsappSaved', 'true');
      whatsappSection.classList.add('hidden');
      showToast('✅ Numéro enregistré !');
    } else {
      showToast('⚠️ Numéro invalide');
      whatsappInput.focus();
    }
  });

  // Toast
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
});