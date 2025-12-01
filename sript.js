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

     * @param {string} pageKey - A chave da página (ex: 'TEATRO')
     */
    function loadContent(pageKey) {
        
        // 1. Inicia o Fade Out
        contentArea.style.opacity = 0;
        contentArea.style.transform = 'translateY(10px)'; 

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
            
            contentArea.innerHTML = newContentHTML;

            contentArea.style.opacity = 1;
            contentArea.style.transform = 'translateY(0)';

            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.main-nav .nav-link[data-page="${pageKey}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }, 400); 
    }

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

    /* --- Funcionalidade do Modal de Imagem --- */

function setupImageModal() {
    // Pega o modal, a imagem e o botão de fechar
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.getElementsByClassName('close-btn')[0];

    // Adiciona o listener para as imagens
    const galleryImages = document.querySelectorAll('.grid-inicial img, .photo-gallery img');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Abre o modal
            modal.style.display = 'block';
            
            // Define o source e o alt da imagem
            modalImg.src = this.src;
            
            // Opcional: define a legenda (caption) baseada no alt da imagem
            const captionText = document.getElementById('caption');
            captionText.innerHTML = this.alt;
        });
    });

    // Quando o usuário clica no "x", fecha o modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Quando o usuário clica em qualquer lugar fora da imagem, fecha o modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// ⚠️ ATENÇÃO: Você precisa chamar essa função DEPOIS que o DOM estiver carregado
// e sempre que carregar um novo conteúdo dinamicamente!

// Para a galeria inicial (que está fixa no index.html):
document.addEventListener('DOMContentLoaded', function() {
    // ... Seu código de navegação (loadContent, etc) ...

    // NOVO: Chama a função de configuração do modal
    setupImageModal(); 
});


// Se você estiver usando o loadContent para carregar galerias DEPOIS
// que a página é carregada (como no seu JS de exemplo), você precisa
// chamar o setupImageModal DENTRO da função loadContent, depois de
// contentArea.innerHTML = newContentHTML; para garantir que os listeners
// sejam adicionados às novas imagens carregadas.
// Exemplo (adapte o seu script.js):
/*
        // Dentro do setTimeout da função loadContent(pageKey)
        setTimeout(() => {
            // ... (restante do código)
            
            contentArea.innerHTML = newContentHTML;

            // ... (restante do código)

            // NOVO: Chama a função após o novo conteúdo ser carregado
            setupImageModal(); 

        }, 400); 
*/

    loadContent('HOME'); 
});