// Initialisation des animations AOS
document.addEventListener('DOMContentLoaded', () => {
    // Configuration AOS optimisée pour des animations rapides et fluides
    AOS.init({
        duration: 600,      // Réduit de 800ms à 600ms pour plus de rapidité
        easing: 'ease-out', // Courbe d'animation fluide
        once: true,         // L'animation ne se joue qu'une seule fois
        offset: 100,        // Déclenche l'animation un peu plus tôt
        delay: 0,          // Pas de délai pour une apparition immédiate
        anchorPlacement: 'top-bottom', // Déclenche quand le haut de l'élément atteint le bas de la fenêtre
        disable: 'mobile'  // Désactive sur mobile pour de meilleures performances
    });

    // Gestion du thème (clair/sombre)
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Vérifie si un thème est déjà enregistré
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
    } else {
        // Par défaut, on utilise le thème sombre
        htmlElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }

    // Gestion du clic sur le bouton de thème
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Rafraîchit les animations lors du changement de thème
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    });

    // Animation de défilement doux pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion de la navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--card-bg');
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--card-bg');
        }

        lastScroll = currentScroll;
    });

    // Optimisation des performances en limitant les calculs d'animation
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                AOS.refresh();
                ticking = false;
            });
            ticking = true;
        }
    });
});