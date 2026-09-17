/**
 * WinGrow Agences - Page de Connexion
 * Gère l'authentification et la redirection vers le dashboard
 */

 document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Elements
    // ========================================
    const loginForm = document.getElementById('loginForm');
    const identifierInput = document.getElementById('identifier');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const rememberMe = document.getElementById('rememberMe');
  
    // ========================================
    // Toggle Password Visibility
    // ========================================
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        if (type === 'password') {
          icon.className = 'ri-eye-off-line';
        } else {
          icon.className = 'ri-eye-line';
        }
      });
    }
  
    // ========================================
    // Form Submission
    // ========================================
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const identifier = identifierInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberMe ? rememberMe.checked : false;
  
        // Validation basique
        if (!identifier || !password) {
          showError('Veuillez remplir tous les champs');
          return;
        }
  
        // Afficher le loader
        setLoading(true);
        hideError();
  
        try {
          // ========================================
          // Appel API d'authentification
          // À remplacer par votre vraie API
          // ========================================
          const response = await authenticateUser(identifier, password);
          
          if (response.success) {
            // Stocker les infos utilisateur
            if (remember) {
              localStorage.setItem('wingrow_user', JSON.stringify(response.user));
              localStorage.setItem('wingrow_token', response.token);
            } else {
              sessionStorage.setItem('wingrow_user', JSON.stringify(response.user));
              sessionStorage.setItem('wingrow_token', response.token);
            }
            
            // Redirection vers le dashboard selon la devise
            const dashboard = response.user.currency === 'XAF' 
              ? 'dashboard-xaf.html' 
              : 'dashboard-xof.html';
            
            window.location.href = dashboard;
          } else {
            showError(response.message || 'Identifiants incorrects');
          }
        } catch (error) {
          showError('Erreur de connexion. Veuillez réessayer.');
          console.error('Login error:', error);
        } finally {
          setLoading(false);
        }
      });
    }
  
    // ========================================
    // Simulate API Call (À remplacer par vraie API)
    // ========================================
    async function authenticateUser(identifier, password) {
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1500));
  
      // ========================================
      // EXEMPLE : Remplacer par votre vraie API
      // ========================================
      // const response = await fetch('https://votre-api.com/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ identifier, password })
      // });
      // return await response.json();
  
      // ========================================
      // Simulation pour test (À SUPPRIMER EN PROD)
      // ========================================
      const testUsers = [
        { 
          id: 1,
          email: 'test@wingrow.com', 
          phone: '0700000000',
          password: 'test123', 
          name: 'Jean Dupont',
          currency: 'XOF'
        },
        { 
          id: 2,
          email: 'user@wingrow.com', 
          phone: '690000000',
          password: 'user123', 
          name: 'Marie Kamga',
          currency: 'XAF'
        }
      ];
  
      const user = testUsers.find(u => 
        (u.email === identifier || u.phone === identifier) && u.password === password
      );
  
      if (user) {
        return {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            currency: user.currency
          },
          token: 'fake-jwt-token-' + Date.now()
        };
      } else {
        return {
          success: false,
          message: 'Email/téléphone ou mot de passe incorrect'
        };
      }
    }
  
    // ========================================
    // UI Helpers
    // ========================================
    function setLoading(isLoading) {
      const btnText = loginBtn.querySelector('.btn-text');
      const btnLoader = loginBtn.querySelector('.btn-loader');
      
      if (isLoading) {
        loginBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
      } else {
        loginBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
      }
    }
  
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.classList.add('show');
    }
  
    function hideError() {
      errorMessage.classList.remove('show');
    }
  
    // ========================================
    // Auto-fill from localStorage (Remember Me)
    // ========================================
    const savedUser = localStorage.getItem('wingrow_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.email) {
          identifierInput.value = user.email;
          rememberMe.checked = true;
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
  
    // ========================================
    // Check if already logged in
    // ========================================
    const token = localStorage.getItem('wingrow_token') || sessionStorage.getItem('wingrow_token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('wingrow_user') || sessionStorage.getItem('wingrow_user') || '{}');
      if (user.currency) {
        const dashboard = user.currency === 'XAF' ? 'dashboard-xaf.html' : 'dashboard-xof.html';
        window.location.href = dashboard;
      }
    }
  });