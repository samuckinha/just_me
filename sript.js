document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.querySelector('.content-area');

    /**
     * Função auxiliar para gerar o HTML da galeria de imagens
     * @param {string} prefix - Prefixo do nome do arquivo (ex: 'tr' para teatro)
     * @param {number} count - Número total de imagens (ex: 5 para tr1.jpg a tr5.jpg)
     * @returns {string} HTML da galeria de fotos
     */
    function generateGalleryHTML(prefix, count) {
        let imagesHTML = '';
        for (let i = 1; i <= count; i++) {
            imagesHTML += `<img src="${prefix}${i}.jpg" alt="Foto ${i} da Seção">`;
        }
        return `
            <section class="gallery-section">
                <div class="photo-gallery">
                    ${imagesHTML}
                </div>
            </section>
        `;
    }

    // Conteúdo dinâmico para cada aba, incluindo as novas galerias
    const pageContent = {
        'HOME': {
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
        },
        'TEATRO': {
            title: '🎭 Minha Jornada no Teatro',
            html: `
                <p>Desde a minha infância, o teatro é a minha grande paixão. Aqui vou compartilhar os espetáculos que participei, os papéis que interpretei e as futuras apresentações.</p>
                <ul>
                    <li><strong>Última Peça:</strong> O Mágico de Oz (Elenco Principal)</li>
                    <li><strong>Papel Sonhado:</strong> Fyero Tigelaar em "Wicked"</li>
                    <li><strong>Próximo Projeto:</strong> Musical Original "O Sol Nasce no Sul" - Ensaio em breve!</li>
                </ul>
                ${generateGalleryHTML('tr', 5)} <p style="margin-top: 20px; text-align: center;">Para saber mais sobre meus projetos e performances, <a href="#" onclick="alert('Funcionalidade em desenvolvimento!')">clique aqui</a>.</p>
            `
        },
        'AMIGOS': {
            title: '🤝 A Galeria dos Melhores Amigos',
            html: `
                <p>Amores da minha vida, minha base! Cada um deles me inspira a ser melhor. Confira alguns dos nossos momentos mais divertidos e especiais.</p>
                <ul>
                    <li><strong>Passeio Favorito:</strong> Parque Barigui, Curitiba</li>
                    <li><strong>Melhor Memória:</strong> Acampamento de Teatro em 2024</li>
                    <li><strong>Momentos Inesquecíveis:</strong> Risadas e conversas infinitas.</li>
                </ul>
                ${generateGalleryHTML('amg', 16)} <p style="margin-top: 20px; text-align: center;">Quer ver mais fotos com a galera? Visite nosso <a href="#" onclick="alert('Álbum de amigos em breve!')">álbum especial</a>.</p>
            `
        },
        'SOBRE MIM': {
            title: '✨ Conheça um Pouco Mais',
            html: `
                <p>Olá novamente! Meu nome é Samuel. Sou um apaixonado pela arte e espiritualidade. Busco sempre equilibrar minha vida profissional no teatro com meus valores pessoais. A arte e a fé são os pilares que me sustentam em todos os meus projetos e sonhos, como a esperança de um dia atuar na Broadway.</p>
                <ul>
                    <li><strong>Cidade Natal:</strong> Araucária/PR</li>
                    <li><strong>Sonho:</strong> Estrelar um Musical na Broadway</li>
                    <li><strong>Interesses:</strong> Música, leitura, viagens e culinária.</li>
                    <li><strong>Contato:</strong> <a href="mailto:schamnesamuel@gmail.com">schamnesamuel@gmail.com</a></li>
                </ul>
                ${generateGalleryHTML('me', 3)} <p style="margin-top: 20px; text-align: center;">Siga-me nas redes sociais para mais atualizações!</p>
                <div class="social-links" style="text-align: center; margin-top: 15px;">
                    <a href="#" onclick="alert('Instagram em breve!')">Instagram</a> | 
                    <a href="#" onclick="alert('Facebook em breve!')">Facebook</a>
                </div>
            `
        }
    };

    /**
     * Função que renderiza o conteúdo da aba clicada com animação
     * @param {string} pageKey - A chave da página (ex: 'TEATRO')
     */
    function loadContent(pageKey) {
        const content = pageContent[pageKey];
        
        // 1. Inicia o Fade Out
        contentArea.style.opacity = 0;
        contentArea.style.transform = 'translateY(10px)'; 

        // Espera a animação de opacidade terminar (0.4s definido no CSS)
        setTimeout(() => {
            // 2. Monta o novo conteúdo com a classe de animação
            const newContentHTML = `
                <section class="info-section">
                    <h2>${content.title}</h2>
                    ${content.html}
                </section>
            `;
            
            // 3. Substitui o conteúdo
            contentArea.innerHTML = newContentHTML;

            // 4. Aplica o Fade In
            contentArea.style.opacity = 1;
            contentArea.style.transform = 'translateY(0)';

            // 5. Destaca o link ativo na navegação principal
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // O seletor usa data-page para encontrar o link correto
            const activeLink = document.querySelector(`.main-nav .nav-link[data-page="${pageKey}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }, 400); // 400ms = Duração da transição CSS
    }

    // Adiciona o ouvinte de evento (click) a CADA link de navegação
    document.addEventListener('click', function(event) {
        // Verifica se o elemento clicado ou um de seus pais é um link de navegação
        const target = event.target.closest('.nav-link');
        if (target) {
            event.preventDefault(); // Impede o link de recarregar a página
            const pageName = target.dataset.page; // Obtém o nome da aba do atributo data-page
            
            // Evita recarregar se já estiver na página, exceto para HOME onde o clique pode vir dos botões internos
            const currentActiveLink = document.querySelector('.main-nav .nav-link.active');
            if (currentActiveLink && currentActiveLink.dataset.page === pageName && pageName !== 'HOME' && target.closest('.main-nav')) {
                // Não faz nada se já estiver ativo e o clique veio da nav principal
                return;
            }
            
            loadContent(pageName);
            // Rola para o topo da área de conteúdo para a melhor UX
            contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Carrega o conteúdo inicial da HOME quando a página é carregada
    loadContent('HOME'); 
});