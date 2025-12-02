document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.main-nav li a'); // Seletor ajustado para pegar os links da navegação principal
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
     * Carrega o conteúdo da página especificada.
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
                // Adiciona o HTML da galeria de destaque da página inicial, se você ainda quiser usá-la.
                // Isso requer que você mova a seção '.galeria-inicial' do seu HTML fixo para ser gerada aqui
                // ou que você mude sua estrutura de carregamento. Se a galeria não for dinâmica,
                // apenas certifique-se de que o contentArea NÃO a sobreponha.
                // Como você não forneceu a estrutura de <template> HTML, assumimos que o loadContent
                // deve carregar SOMENTE o conteúdo principal.
                
            } else {
                // Pega o conteúdo completo do <template> HTML
                const template = document.getElementById(`template-${pageKey}`);
                if (template) {
                    newContentHTML = template.innerHTML;
                } else {
                    newContentHTML = `<p>Conteúdo da página ${pageKey} não encontrado. Certifique-se de que o elemento <template id="template-${pageKey}"> está presente.</p>`;
                }
            }
            
            contentArea.innerHTML = newContentHTML;

            contentArea.style.opacity = 1;
            contentArea.style.transform = 'translateY(0)';

            // 3. Atualiza o link ativo na navegação principal (ajustado para o novo seletor)
            document.querySelectorAll('.main-nav li a').forEach(link => {
                link.classList.remove('active');
            });
            // Adiciona a classe 'active' ao link correto
            const activeLink = document.querySelector(`.main-nav li a[href*="${pageKey.toLowerCase()}.html"]`);
            if (activeLink) {
                 activeLink.classList.add('active');
            }
            
            // 💥 PONTO CRUCIAL: Chama a função do modal APÓS o novo conteúdo ser inserido
            setupImageModal();

        }, 400); 
    }
    
    // --- Escuta de Cliques de Navegação ---
    document.addEventListener('click', function(event) {
        const target = event.target.closest('.nav-link, .main-nav a'); // Pega links internos e os da nav principal

        if (target) {
            event.preventDefault(); 
            let pageName = target.dataset.page; 
            
            // Se o clique veio da navegação principal, extrai o nome da página do atributo href
            if (!pageName && target.closest('.main-nav')) {
                const href = target.getAttribute('href');
                pageName = href.replace('.html', '').toUpperCase();
                // O HOME precisa de tratamento especial se o href for index.html
                if (pageName === 'INDEX') pageName = 'HOME';
            }
            
            if (pageName) {
                const currentActiveLink = document.querySelector('.main-nav a.active');
                
                // Evita recarregar se já estiver na página clicada na navegação
                if (currentActiveLink && currentActiveLink.getAttribute('href').toUpperCase().includes(pageName)) {
                    return;
                }
                
                loadContent(pageName);
                contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

    // --- Execução Inicial ---
    loadContent('HOME');
    // Chama o setupImageModal para a galeria que já está no HTML (grid-inicial)
    // Se o HOME está sendo carregado dinamicamente, isso será chamado dentro de loadContent.
    // Se a galeria inicial for fixa no index.html, chame aqui.
    // Como estamos usando o loadContent('HOME') no final, vamos confiar na chamada DENTRO dele.
});


/* ---------------------------------------------------------------------- */
/* --- Função do Modal de Imagem (DEVE FICAR FORA DO DOMContentLoaded) --- */
/* ---------------------------------------------------------------------- */

function setupImageModal() {
    // Pega o modal, a imagem e o botão de fechar
    const modal = document.getElementById('image-modal');
    // Adicionamos a classe 'active-modal' ao modal para acionar a animação no CSS.
    if (!modal) return; // Sai se o modal não existe na página

    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.getElementsByClassName('close-btn')[0];

    // Adiciona o listener para as imagens (tanto da galeria inicial quanto da galeria de fotos)
    const galleryImages = document.querySelectorAll('.grid-inicial img, .photo-gallery img');

    galleryImages.forEach(img => {
        // Remove listeners antigos para evitar duplicação (importante para conteúdo dinâmico)
        img.removeEventListener('click', openModalHandler); 
        img.addEventListener('click', openModalHandler);
    });
    
    function openModalHandler() {
        // Abre o modal
        modal.style.display = 'block';
        modal.classList.add('active-modal'); // Adiciona classe para potencial animação de abertura
        
        // Define o source e o alt da imagem
        modalImg.src = this.src;
        
        // Opcional: define a legenda (caption) baseada no alt da imagem
        const captionText = document.getElementById('caption');
        captionText.innerHTML = this.alt;
    }


    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active-modal');
        modal.style.display = 'none';
    }

    // Quando o usuário clica no "x", fecha o modal
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Quando o usuário clica em qualquer lugar fora da imagem, fecha o modal
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}