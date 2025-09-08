document.addEventListener('DOMContentLoaded', function() {
    
    // Animação dos cards da galeria
    const cards = document.querySelectorAll('.galeria-card');
    const cardObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);
    
    cards.forEach(card => {
        card.classList.add('hidden');
        cardObserver.observe(card);
    });

    // Funcionalidade de Animação de Seções na Rolagem
    const sections = document.querySelectorAll('.performance-section, .specs-section, .optional-packages-section, .curiosities-section, .comparisons-section, .video-section, .contato-section');
    
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // Funcionalidade dos Modais
    const cardTriggers = document.querySelectorAll('.galeria-card');
    
    cardTriggers.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    const closeButtons = document.querySelectorAll('.modal .close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Funcionalidade do botão de voltar ao topo
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Nova funcionalidade: Navegação Ativa
    const navLinks = document.querySelectorAll('header nav a');
    const allSections = document.querySelectorAll('section[id]');

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`header nav a[href="#${id}"]`);

            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            } else {
                if (navLink) {
                    navLink.classList.remove('active');
                }
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    });

    allSections.forEach(section => {
        activeNavObserver.observe(section);
    });
    
    // Nova funcionalidade: Validação e Confirmação de Formulário
    const contactForm = document.querySelector('.contato-form');
    const successMessage = document.getElementById('mensagem-sucesso');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o recarregamento da página

        // Simula uma validação de formulário (os campos já estão como "required" no HTML)
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        if (nome && email && mensagem) {
            // Exibe a mensagem de sucesso
            successMessage.classList.remove('hidden');
            successMessage.classList.add('visible');

            // Limpa o formulário
            contactForm.reset();

            // Esconde a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                successMessage.classList.remove('visible');
                successMessage.classList.add('hidden');
            }, 5000);
        } else {
            alert('Por favor, preencha todos os campos do formulário.');
        }
    });
});