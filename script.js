async function iniciarPortal() {
    try {
        const resposta = await fetch('dados.json');
        if (!resposta.ok) throw new Error("Erro ao carregar dados.");

        const noticias = await resposta.json();
        const container = document.getElementById('lista-noticias');
        container.innerHTML = '';

        noticias.forEach((noticia) => {
            const imagemUrl = noticia.image ? noticia.image : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800';

            // Arruma a data e hora para o padrão do Brasil
            let dataPublicacao = "";
            if (noticia.data) {
                const dataObj = new Date(noticia.data);
                dataPublicacao = dataObj.toLocaleDateString('pt-BR') + ' às ' + dataObj.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
            }

            // Cria o card da notícia com a data
            container.innerHTML += `
                <article class="card-noticia">
                    <img src="${imagemUrl}" alt="Notícia" class="foto-noticia">
                    <div class="conteudo">
                        <span class="data-noticia">${dataPublicacao}</span>
                        <h2>${noticia.title}</h2>
                        <p>${noticia.body}</p>
                        <a href="${noticia.url}" target="_blank" class="botao-ler-mais">Ler Reportagem Completa →</a>
                    </div>
                </article>
            `;
        });
    } catch (error_) {
        console.error("Erro no Portal:", error_);
    }
}

// Efeito de sombra no menu ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    window.scrollY > 50 ? header.classList.add('rolagem') : header.classList.remove('rolagem');
});

// Funcionamento da Barra de Pesquisa
document.getElementById('campo-pesquisa')?.addEventListener('input', function(evento) {
    const termoPesquisado = evento.target.value.toLowerCase();
    const cardsNoticias = document.querySelectorAll('.card-noticia');

    cardsNoticias.forEach(card => {
        const titulo = card.querySelector('h2').innerText.toLowerCase();
        const texto = card.querySelector('p').innerText.toLowerCase();

        if (titulo.includes(termoPesquisado) || texto.includes(termoPesquisado)) {
            card.style.display = 'flex'; 
        } else {
            card.style.display = 'none';
        }
    });
});

iniciarPortal();