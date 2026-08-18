// ==========================================================================
// INTERATIVIDADE E COMPORTAMENTOS (JavaScript)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Verifica preferência salva no navegador ou padrão escuro
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }

    // ----------------------------------------------------
    // 2. MENU MOBILE
    // ----------------------------------------------------
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileIcon = mobileToggleBtn.querySelector('i');

    mobileToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            mobileIcon.className = 'fa-solid fa-xmark';
        } else {
            mobileIcon.className = 'fa-solid fa-bars';
        }
    });

    // Fecha o menu mobile ao clicar em qualquer link da navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileIcon.className = 'fa-solid fa-bars';
        });
    });

    // ----------------------------------------------------
    // 3. ATUALIZAR LINK ATIVO CONFORME A ROLAGEM DA PÁGINA
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // ----------------------------------------------------
    // 4. FORMULÁRIO DE CONTATO (abre o e-mail do usuário)
    // ----------------------------------------------------
    const contactForm = document.getElementById('contato-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            const subject = encodeURIComponent(`Contato pelo portfólio - ${nome}`);
            const body = encodeURIComponent(
                `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`
            );

            window.location.href = `mailto:chiaradiadiogo205@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
