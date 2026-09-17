/* ================================================================
   PROFIL.JS - Script Page Mon Profil WinGrow
================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ÉLÉMENTS DOM ==========
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editModal = document.getElementById('editModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEdit = document.getElementById('cancelEdit');
    const editProfileForm = document.getElementById('editProfileForm');
    
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const passwordModal = document.getElementById('passwordModal');
    const closePasswordModal = document.getElementById('closePasswordModal');
    const cancelPassword = document.getElementById('cancelPassword');
    const changePasswordForm = document.getElementById('changePasswordForm');
    
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const referralLink = document.getElementById('referralLink');
    
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const photoInput = document.getElementById('photoInput');
    const profileImage = document.getElementById('profileImage');
    const avatarPlaceholder = document.getElementById('avatarPlaceholder');
    
    const shareWhatsApp = document.getElementById('shareWhatsApp');
    const shareFacebook = document.getElementById('shareFacebook');
    const shareTelegram = document.getElementById('shareTelegram');
    
    const logoutBtn = document.getElementById('logoutBtn');
    const twoFactorBtn = document.getElementById('twoFactorBtn');
    
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    // ========== FONCTIONS UTILITAIRES ==========
    
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ========== MODAL ÉDITION PROFIL ==========
    
    editProfileBtn.addEventListener('click', function() {
        // Pré-remplir les champs avec les valeurs actuelles
        document.getElementById('editUsername').value = document.getElementById('infoUsername').textContent;
        document.getElementById('editEmail').value = document.getElementById('infoEmail').textContent;
        document.getElementById('editPhone').value = document.getElementById('infoPhone').textContent;
        openModal(editModal);
    });
    
    closeEditModal.addEventListener('click', function() {
        closeModal(editModal);
    });
    
    cancelEdit.addEventListener('click', function() {
        closeModal(editModal);
    });
    
    editProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mettre à jour les informations affichées
        const newUsername = document.getElementById('editUsername').value;
        const newEmail = document.getElementById('editEmail').value;
        const newPhone = document.getElementById('editPhone').value;
        
        document.getElementById('infoUsername').textContent = newUsername;
        document.getElementById('infoEmail').textContent = newEmail;
        document.getElementById('infoPhone').textContent = newPhone;
        
        // Mettre à jour le lien de parrainage
        referralLink.value = 'https://wingrow.com/ref/' + newUsername;
        
        // Mettre à jour les initiales
        const initials = newUsername.substring(0, 2).toUpperCase();
        document.getElementById('avatarInitials').textContent = initials;
        
        closeModal(editModal);
        showToast('Profil mis à jour avec succès !');
    });
    
    // ========== MODAL CHANGEMENT MOT DE PASSE ==========
    
    changePasswordBtn.addEventListener('click', function() {
        openModal(passwordModal);
    });
    
    closePasswordModal.addEventListener('click', function() {
        closeModal(passwordModal);
    });
    
    cancelPassword.addEventListener('click', function() {
        closeModal(passwordModal);
    });
    
    changePasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPwd = document.getElementById('currentPassword').value;
        const newPwd = document.getElementById('newPassword').value;
        const confirmPwd = document.getElementById('confirmNewPassword').value;
        
        // Validation basique
        if (newPwd !== confirmPwd) {
            showToast('Les mots de passe ne correspondent pas !');
            return;
        }
        
        if (newPwd.length < 6) {
            showToast('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }
        
        // Simuler la mise à jour
        closeModal(passwordModal);
        changePasswordForm.reset();
        showToast('Mot de passe modifié avec succès !');
    });
    
    // ========== TOGGLE PASSWORD VISIBILITY ==========
    
    document.querySelectorAll('.toggle-password').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            
            // Changer l'icône
            const svg = this.querySelector('svg');
            if (type === 'text') {
                svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
            } else {
                svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
            }
        });
    });
    
    // ========== COPIER LIEN DE PARRAINAGE ==========
    
    copyLinkBtn.addEventListener('click', function() {
        referralLink.select();
        referralLink.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(referralLink.value).then(function() {
            showToast('Lien copié dans le presse-papier !');
        }).catch(function() {
            // Fallback pour les anciens navigateurs
            document.execCommand('copy');
            showToast('Lien copié !');
        });
    });
    
    // ========== PARTAGE RÉSEAUX SOCIAUX ==========
    
    const shareMessage = "Rejoignez WinGrow Agences et commencez à gagner de l'argent grâce à l'affiliation ! Inscrivez-vous avec mon lien : ";
    
    shareWhatsApp.addEventListener('click', function() {
        const url = 'https://wa.me/?text=' + encodeURIComponent(shareMessage + referralLink.value);
        window.open(url, '_blank');
    });
    
    shareFacebook.addEventListener('click', function() {
        const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(referralLink.value);
        window.open(url, '_blank');
    });
    
    shareTelegram.addEventListener('click', function() {
        const url = 'https://t.me/share/url?url=' + encodeURIComponent(referralLink.value) + '&text=' + encodeURIComponent(shareMessage);
        window.open(url, '_blank');
    });
    
    // ========== CHANGEMENT PHOTO DE PROFIL ==========
    
    changePhotoBtn.addEventListener('click', function() {
        photoInput.click();
    });
    
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImage.src = event.target.result;
                profileImage.classList.add('visible');
                avatarPlaceholder.style.display = 'none';
                showToast('Photo de profil mise à jour !');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // ========== AUTHENTIFICATION DEUX FACTEURS ==========
    
    twoFactorBtn.addEventListener('click', function() {
        const status = this.querySelector('.security-status');
        if (status.classList.contains('off')) {
            status.classList.remove('off');
            status.classList.add('on');
            status.textContent = 'Activé';
            showToast('Authentification à deux facteurs activée !');
        } else {
            status.classList.remove('on');
            status.classList.add('off');
            status.textContent = 'Désactivé';
            showToast('Authentification à deux facteurs désactivée');
        }
    });
    
    // ========== DÉCONNEXION ==========
    
    logoutBtn.addEventListener('click', function() {
        // Simuler la déconnexion
        showToast('Déconnexion en cours...');
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1500);
    });
    
    // ========== FERMER MODALS EN CLIQUANT À L'EXTÉRIEUR ==========
    
    editModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(editModal);
        }
    });
    
    passwordModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(passwordModal);
        }
    });
    
});