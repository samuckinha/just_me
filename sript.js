document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.main-nav li a');
    const contentArea = document.querySelector('.content-area');
    // Salva o HTML da galeria inicial antes de qualquer modificação
    const initialGalleryHTML = document.querySelector('.gallery-section').outerHTML;

    // Conteúdo dinâmico para cada aba
    const pageContent = {
        'GALERIA': {
            title: 'Minhas Fotos Recentes',
            html: initialGalleryHTML
        },
        'TEATRO': {
            title: '🎭 Minha Jornada no Teatro',
            html: `
                <p>Desde a minha infância, o teatro é a minha grande paixão. Aqui vou compartilhar os espetáculos que participei, os papéis que interpretei e as futuras apresentações.</p>
                <ul>
                    <li>**Ultima Peça:** O Mágico de Oz </li>
                    <li>**Dream Role:** Fyero Tigelaar</li>
                    <li>**Próximo Projeto:** Musical Original "O Sol Nasce no Sul"</li>
                </ul>
            `
        },
        'AMIGOS': {
            title: '🤝 A Galeria dos Melhores Amigos',
            html: `
                <p>Amores da minha vida, minha base! Cada um deles me inspira a ser melhor. Em breve, uma galeria de fotos dedicada a eles.</p>
                <ul>
                    <li>**Passeio Favorito:** Parque Barigui, Curitiba</li>
                    <li>**Melhor Memória:** Acampamento de Teatro em 2024</li>
                </ul>
            `
        },
        'SOBRE MIM': {
            title: '✨ Conheça um Pouco Mais',
            html: `
                <p>Olá! Meu nome é Samuel, e sou ator, compositor, cantor e amo muito o que eu faço. Sou católico devoto de Nssª Sraª de Guadalupe, e aqui você pode encontrar um pouco mais sobre minha vida pessoal, meus sonhos e conquistas.</p>
                <ul>
                    <li>**Cidade Natal:** Araucária/PR</li>
                    <li>**Sonho:** Estrelar um Musical na Broadway</li>
                    <li>**Contato:** schamnesamuel@gmail.com </li>
                </ul>
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

        // Espera a animação de opacidade terminar (0.4s definido no CSS)
        setTimeout(() => {
            // 2. Cria o novo conteúdo
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

            // 5. Destaca o link ativo
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.textContent.toUpperCase() === pageKey) {
                    link.classList.add('active');
                }
            });
        }, 400); // 400ms = Duração da transição CSS
    }

    // 3. Adiciona o ouvinte de evento (click) a cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o link de recarregar a página
            const pageName = this.textContent.toUpperCase(); // Obtém o nome da aba
            loadContent(pageName);
        });
    });

    // Garante que o estado inicial (GALERIA) é carregado corretamente
    // Nota: Seu HTML já carrega a GALERIA, o JS apenas garante a lógica de clique.
});