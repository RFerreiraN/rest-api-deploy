function getProductos() {
  fetch('http://localhost:1314/productos')
    .then(data => data.json())
    .then(productos => {
      const containArticle = productos.map(producto => {
        return `
        <article data-id="${producto.id}">
          <p>${producto.title}</p>
          <img src="${producto.image}"
          <h3>${producto.price} €</h3>
          <button>Eliminar</button>
        </article>
        `
      }).join('')

      const main = document.getElementById('main')
      main.innerHTML = containArticle

      document.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
          const article = e.target.closest('article')
          const id = article.dataset.id

          fetch(`http://localhost:1314/productos/${id}`, {
            method: 'DELETE'
          })
            .then(res => {
              if (res.ok) {
                article.remove()
              }
            })
        }
      })
    })
}

getProductos()
