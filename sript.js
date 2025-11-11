document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleciona os elementos principais
    const navLinks = document.querySelectorAll('.main-nav li a');
    const contentArea = document.querySelector('.content-area');
    const gallerySection = document.querySelector('.gallery-section');

    // Conteúdo dinâmico para cada aba
    const pageContent = {
        'GALERIA': {
            title: 'Minhas Fotos Recentes',
            html: gallerySection.outerHTML // Usa o HTML da galeria já existente
        },
        'TEATRO': {
            title: '🎭 Minha Jornada no Teatro',
            html: '<p>Desde a minha infância, o teatro é a minha grande paixão. Aqui vou compartilhar os espetáculos que participei, os papéis que interpretei e as futuras apresentações.</p><ul><li>**Ultima Peça:** O Mágico de Oz </li><li>**Dream Role:** Fyero Tigelaar</li></ul>'
        },
        'AMIGOS': {
            title: '🤝 A Galeria dos Melhores Amigos',
            html: '<p>Aqui temos fotos ccom os maiores amores da minha vida</p>'
        },
        'SOBRE MIM': {
            title: '✨ Conheça um Pouco Mais',
            html: '<p>Olá! Meu nome é Samuel, e sou ator, compositor, cantor e amo muito oque eu faço, sou católico devoto de Nssª Sraª de Guadalupe, e aqui você pode encontrar um pouco mais sobre minha vida pessoal, meus sonhos e conquistas.</p><ul><li>**Cidade Natal:** Araucária/PR</li><li>**Sonho:** Estrelar um Musical na Broadway</li><li>**Contato:** schamnesamuel@gmail.com </li></ul>'
        }
    };

    /**
     * Função que renderiza o conteúdo da aba clicada
     * @param {string} pageKey - A chave da página (ex: 'TEATRO')
     */
    function loadContent(pageKey) {
        // 1. Destaca o link ativo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent.toUpperCase() === pageKey) {
                link.classList.add('active');
            }
        });

        // 2. Cria o novo conteúdo
        const content = pageContent[pageKey];
        
        // Verifica se o conteúdo é a galeria (que já existe no HTML)
        if (pageKey === 'GALERIA') {
             // Se for GALERIA, apenas garante que a seção original está no lugar
             contentArea.innerHTML = content.html;
        } else {
             // Para outras abas, cria o container de conteúdo dinâmico
             contentArea.innerHTML = `
                <section class="info-section">
                    <h2>${content.title}</h2>
                    ${content.html}
                </section>
             `;
        }
    }

    // 3. Adiciona o ouvinte de evento (click) a cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o link de recarregar a página
            const pageName = this.textContent.toUpperCase(); // Obtém o nome da aba
            loadContent(pageName);
        });
    });

    // 4. Carrega o conteúdo inicial (Galeria)
    // Garante que o estado inicial da página corresponde ao link ativo (já configurado no HTML)
    // loadContent('GALERIA'); // Não é necessário chamar, pois o HTML já está correto.
});
