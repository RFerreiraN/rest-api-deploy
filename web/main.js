function getProductos() {
  fetch('http://localhost:1314/productos')
    .then(data => data.json())
    .then(productos => {
      const containArticle = productos.map(producto => {
        return `
        <article data-id="${producto.id}">
          <h2>${producto.title}</h2>
          <img src="${producto.image}"
          <h3>${producto.price} €</h3>
        </article>
        `
      }).join('')
      const main = document.getElementById('main')
      main.innerHTML = containArticle
    })
}
getProductos()
