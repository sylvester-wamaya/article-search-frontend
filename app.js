
document.addEventListener('DOMContentLoaded', () => {
    const searchEl = document.getElementById('search-field');
    const statsEl = document.getElementById('stats');
    const articlesEl = document.getElementById('articles');
    let articlesArray = []
    let typingTimeOut = null

    // Function to append articles to the DOM
    const appendArticles = (articles) => {
        articles.forEach(element => {
            const div1El = document.createElement('div');
            const div2El = document.createElement('div');
            const imageEl = document.createElement('img');
            const h3El = document.createElement('h4');
            const pEl = document.createElement('p');
            const aEl = document.createElement('a');
            imageEl.src = element.image;
            h3El.innerText = element.title;
            pEl.innerText = element.description;
            aEl.href = element.url
            aEl.innerText = "Read more";
            div1El.classList.add('article');
            div2El.appendChild(h3El);
            div2El.appendChild(pEl);
            div2El.appendChild(aEl);
            div1El.appendChild(imageEl);
            div1El.appendChild(div2El);
            articlesEl.appendChild(div1El);
        });
    }

    // Function to clear the node
    const clearNode = (node) => {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    // Function to fetch articles from the API
    const fetchArticles = () => {
        fetch('http://127.0.0.1:3000/articles')
            .then(response => response.json())
            .then(data => {

                articlesArray = data;
                appendArticles(data);
            });
    }

    fetchArticles();

    // Function to fetch search stats from the API
    const fetchStats = () => {
        fetch('http://127.0.0.1:3000/searches/search_stats')
            .then(response => response.json())
            .then(data => {
                clearNode(statsEl);
                data.forEach(element => {
                    const divEl = document.createElement('div');
                    const h3El = document.createElement('h4');
                    const pEl = document.createElement('p');
                    divEl.classList.add('search-item');
                    h3El.innerText = element.search[0];
                    pEl.innerText = element.count;
                    divEl.appendChild(h3El);
                    divEl.appendChild(pEl);
                    statsEl.appendChild(divEl);
                });
            });

    }

    // Fetch search stats every 1 seconds
    setInterval(() => {
        fetchStats();
    }, 1000000);

    // Function to post search to the API
    const postSearch = (searchValue) => {
        fetch("http://127.0.0.1:3000/searches", {
            method: "POST",
            body: JSON.stringify({ searchValue }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // Event listener for the search input field
    searchEl.addEventListener("input", () => {
        clearTimeout(typingTimeOut);
        typingTimeOut = setTimeout(() => {

            let searchValue = searchEl.value;
            let filteredArticles = articlesArray.filter(article => article.title.toLowerCase().includes(searchValue.toLowerCase()) || article.description.toLowerCase().includes(searchValue.toLowerCase()));
            if (searchValue.length > 3) {

                postSearch(searchValue);

            }
            clearNode(articlesEl);
            appendArticles(filteredArticles);
        }, 1000);


    });


});
