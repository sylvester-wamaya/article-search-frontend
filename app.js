
document.addEventListener('DOMContentLoaded', () => {
    const searchEl = document.getElementById('search-field');
    const statsEl = document.getElementById('stats');

    searchEl.focus();

    setInterval(() => {
        fetch('http://127.0.0.1:3000/searches/search_stats')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
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
    }, 10000000);
   
    
    searchEl.addEventListener("input", () => {
        const searchValue = searchEl.value;
        if (searchValue.length > 0){
            fetch("http://127.0.0.1:3000/searches", {
                method: "POST",
                body: JSON.stringify({searchValue}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    });
            
        }
    );
    