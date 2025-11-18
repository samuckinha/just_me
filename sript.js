document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.querySelector('.content-area');
    // Salva o HTML inicial da galeria para poder recarregá-lo
    const initialGalleryHTML = document.querySelector('.gallery-section').outerHTML;

    // Conteúdo dinâmico para cada aba, incluindo imagens e links
    const pageContent = {
        'GALERIA': {
            title: 'Minhas Fotos Recentes',
            html: initialGalleryHTML // Usamos o HTML salvo para a galeria
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
                <img src="teatro_foto.jpg" alt="No palco durante uma peça" class="section-image">
                <p>Para saber mais sobre meus projetos e performances, <a href="#" onclick="alert('Funcionalidade em desenvolvimento!')">clique aqui</a>.</p>
            `
        },
        'AMIGOS': {
            title: '🤝 A Galeria dos Melhores Amigos',
            html: `
                <p>Amores da minha vida, minha base! Cada um deles me inspira a ser melhor. Em breve, uma galeria de fotos dedicada a eles.</p>
                <ul>
                    <li><strong>Passeio Favorito:</strong> Parque Barigui, Curitiba</li>
                    <li><strong>Melhor Memória:</strong> Acampamento de Teatro em 2024</li>
                    <li><strong>Momentos Inesquecíveis:</strong> Risadas e conversas infinitas.</li>
                </ul>
                <img src="amigos_foto.jpg" alt="Grupo de amigos se divertindo" class="section-image">
                <p>Quer ver mais fotos com a galera? Visite nosso <a href="#" onclick="alert('Álbum de amigos em breve!')">álbum especial</a>.</p>
            `
        },
        'SOBRE MIM': {
            title: '✨ Conheça um Pouco Mais',
            html: `
                <p>Olá! Meu nome é Samuel. Sou ator, compositor, cantor e amo muito o que eu faço. Sou católico devoto de Nssª Sraª de Guadalupe, e aqui você pode encontrar um pouco mais sobre minha vida pessoal, meus sonhos e conquistas.</p>
                <ul>
                    <li><strong>Cidade Natal:</strong> Araucária/PR</li>
                    <li><strong>Sonho:</strong> Estrelar um Musical na Broadway</li>
                    <li><strong>Interesses:</strong> Música, leitura, viagens e culinária.</li>
                    <li><strong>Contato:</strong> <a href="mailto:schamnesamuel@gmail.com">schamnesamuel@gmail.com</a></li>
                </ul>
                <img src="sobre_mim_foto.jpg" alt="Samuel em um momento descontraído" class="section-image">
                <p>Siga-me nas redes sociais para mais atualizações!</p>
                <div class="social-links">
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
        contentArea.style.transform = 'translateY(10px)'; // Pequeno movimento para o efeito

        // Espera a animação de opacidade terminar (0.4s definido no CSS)
        setTimeout(() => {
            let newContentHTML;
            
            if (pageKey === 'GALERIA') {
                 // Para GALERIA, insere a estrutura salva
                newContentHTML = content.html;
            } else {
                // Para outras abas, insere a estrutura com a classe info-section (que tem o fadeIn)
                newContentHTML = `
                    <section class="info-section">
                        <h2>${content.title}</h2>
                        ${content.html}
                    </section>
                `;
            }
            
            // 3. Substitui o conteúdo
            contentArea.innerHTML = newContentHTML;

            // 4. Aplica o Fade In
            contentArea.style.opacity = 1;
            contentArea.style.transform = 'translateY(0)';

            // 5. Destaca o link ativo
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[data-page="${pageKey}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }, 400); // 400ms = Duração da transição CSS
    }

    // 3. Adiciona o ouvinte de evento (click) a cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o link de recarregar a página
            const pageName = this.dataset.page; // Obtém o nome da aba do atributo data-page
            loadContent(pageName);
        });
    });

    // Carrega o conteúdo inicial da GALERIA quando a página é carregada
    // Garante que a classe 'active' esteja no botão correto ao carregar
    loadContent('GALERIA'); 
});
