document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.querySelector('.content-area');

    // O conteúdo HOME continua sendo gerado diretamente no JS
    const homeContent = {
        title: '👋 Bem-vindo ao Meu Perfil!',
        html: `
            <p>Olá! Meu nome é Samuel. Sou ator, compositor, cantor e amo muito o que eu faço. Sou católico devoto de Nssª Sraª de Guadalupe, e este é o meu espaço pessoal online. Aqui você pode encontrar um pouco mais sobre minha vida, minha paixão pelo teatro e as pessoas que me inspiram.</p>
            
            <p>Use os botões abaixo para explorar as seções do meu perfil:</p>

            <div class="home-buttons">
                <a href="#" class="nav-link" data-page="TEATRO">🎭 Ir para TEATRO</a>
                <a href="#" class="nav-link" data-page="AMIGOS">🫂 Ir para AMIGOS</a>
                <a href="#" class="nav-link" data-page="SOBRE MIM">✨ Ir para SOBRE MIM</a>
            </div>

            <p style="margin-top: 30px; text-align: center; color: #666;">**Dica:** Você também pode usar a navegação fixa no topo.</p>
        `
    };

    /**
     * Função que renderiza o conteúdo da aba clicada com animação
     * @param {string} pageKey - A chave da página (ex: 'TEATRO')
     */
    function loadContent(pageKey) {
        
        // 1. Inicia o Fade Out
        contentArea.style.opacity = 0;
        contentArea.style.transform = 'translateY(10px)'; 

        // Espera a animação de opacidade terminar (0.4s definido no CSS)
        setTimeout(() => {
            let newContentHTML;

            if (pageKey === 'HOME') {
                // Conteúdo HOME (montado no JS)
                newContentHTML = `
                    <section class="info-section">
                        <h2>${homeContent.title}</h2>
                        ${homeContent.html}
                    </section>
                `;
            } else {
                // 💥 NOVO: Pega o conteúdo completo do <template> HTML
                const template = document.getElementById(`template-${pageKey}`);
                if (template) {
                    // Clona o conteúdo do template
                    newContentHTML = template.innerHTML;
                } else {
                    newContentHTML = `<p>Conteúdo da página ${pageKey} não encontrado.</p>`;
                }
            }
            
            // 3. Substitui o conteúdo
            contentArea.innerHTML = newContentHTML;

            // 4. Aplica o Fade In
            contentArea.style.opacity = 1;
            contentArea.style.transform = 'translateY(0)';

            // 5. Destaca o link ativo na navegação principal
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.main-nav .nav-link[data-page="${pageKey}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }, 400); 
    }

    // Adiciona o ouvinte de evento (click) ao DOCUMENTO
    document.addEventListener('click', function(event) {
        const target = event.target.closest('.nav-link');
        if (target) {
            event.preventDefault(); 
            const pageName = target.dataset.page; 
            
            const currentActiveLink = document.querySelector('.main-nav .nav-link.active');
            const clickedFromMainNav = target.closest('.main-nav');
            
            if (currentActiveLink && currentActiveLink.dataset.page === pageName && clickedFromMainNav) {
                return;
            }
            
            loadContent(pageName);
            contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Carrega o conteúdo inicial da HOME quando a página é carregada
    loadContent('HOME'); 
});