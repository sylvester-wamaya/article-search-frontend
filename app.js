
document.addEventListener('DOMContentLoaded', () => {
    const searchEl = document.getElementById('search-field');
    const statsEl = document.getElementById('stats');
    const articlesEl = document.getElementById('articles');
    let articlesArray = []

    searchEl.focus();

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

    const clearNode = (node) => {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    setInterval(() => {
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

            fetch('http://127.0.0.1:3000/articles')
            .then(response => response.json())
            .then(data => {
                
                articlesArray = data;
                appendArticles(data);
                
               
            });
    }, 1000000);
   
    
    searchEl.addEventListener("input", () => {
        let searchValue = searchEl.value;
        if (searchValue.length > 0){
            fetch("http://127.0.0.1:3000/searches", {
                method: "POST",
                body: JSON.stringify({searchValue}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            clearNode(articlesEl);
            let filteredArticles= articlesArray.filter(article => article.title.toLowerCase().includes(searchValue.toLowerCase()) || article.description.toLowerCase().includes(searchValue.toLowerCase()));
            console.log(filteredArticles)
            appendArticles(filteredArticles);
            


        }
    
    });

    
            
        }
    );
    