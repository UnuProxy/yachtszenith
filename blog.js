document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.getElementById('mainArticle');
    const shareBtn = document.getElementById('shareBtn');
    
    document.querySelectorAll('.side-article').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-article');
            loadArticle(articleId);
            history.pushState({ articleId: articleId }, '', `?article=${articleId}`);
            updateShareLink(articleId); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    function loadArticle(articleId) {
        fetch('article.json')
            .then(response => response.json())
            .then(articles => {
                const article = articles.find(article => article.id === articleId);
                if (article) {
                    articlesContainer.innerHTML = `<h1>${article.title}</h1>${article.content}`;
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                } else {
                    articlesContainer.innerHTML = `<p>Article not found.</p>`;
                }
            })
            .catch(error => {
                console.error('Error loading the articles:', error);
                articlesContainer.innerHTML = `<p>Error loading the article.</p>`;
            });
    }

    function updateShareLink(articleId) {
        shareBtn.onclick = function(e) {
            e.preventDefault(); 
            const articleUrl = `${window.location.origin}${window.location.pathname}?article=${articleId}`;
            navigator.clipboard.writeText(articleUrl).then(() => {
                alert("Article link copied to clipboard!"); 
            }).catch(err => {
                console.error('Error in copying text: ', err);
            });
        };
    }
    shareBtn.addEventListener('click', function(e) {
        e.preventDefault(); 
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("Page link copied to clipboard!"); 
        }).catch(err => {
            console.error('Error in copying text: ', err);
        });
    });

    window.onpopstate = function(event) {
        if(event.state && event.state.articleId) {
            loadArticle(event.state.articleId);
            updateShareLink(event.state.articleId); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        } else {
            
            loadArticle('default');
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');
    if(articleId) {
        loadArticle(articleId);
        updateShareLink(articleId); 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const breadcrumbArticleName = document.getElementById('breadcrumbArticleName');
    const backBtn = document.getElementById('backBtn');
    
    // Hide the Home link if no article is selected (i.e., on the homepage)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');
    if (!articleId) {
        backBtn.style.display = 'none';
        breadcrumbArticleName.style.display = 'none'; // Hide breadcrumb part if not needed
    } else {
        // If there's an article, you might only want to hide the 'Home >' part, not the entire breadcrumb
        // Adjust based on your preference
    }

    document.querySelectorAll('.side-article').forEach(item => {
        item.addEventListener('click', function() {
            const articleName = this.querySelector('h2').textContent;
            // Show and update breadcrumb as before
            breadcrumbArticleName.textContent = ' > ' + articleName;
            breadcrumbArticleName.style.display = 'inline';
            backBtn.style.display = 'inline'; // Make sure to show it again if it was hidden
        });
    });

    // Your existing code for loading articles...
});

document.addEventListener('DOMContentLoaded', function() {
    const mainArticle = document.getElementById('mainArticle');

    document.querySelectorAll('.mainMenu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the link from causing a page refresh
            const href = this.getAttribute('href');
            loadPageContent(href);
        });
    });

    function loadPageContent(page) {
        // Assuming each page corresponds to a directory with an index.html
        fetch(`/${page}/index.html`)
            .then(response => response.text())
            .then(html => {
                mainArticle.innerHTML = html;
                history.pushState({path: page}, '', `/${page}`);
            })
            .catch(error => console.error('Error loading the page: ', error));
    }

    window.addEventListener('popstate', function(event) {
        // Load the content corresponding to the popstate event
        const path = event.state.path;
        if (path) {
            loadPageContent(path);
        }
    });
});

