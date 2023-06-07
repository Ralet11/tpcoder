Bienvenidos a Action Games Improved
Action Games Improved es nuestro proyecto final para el curso de Coderhouse Programacion Backend.

Descripción
Action Games Improved es una aplicación e-commerce que ofrece una amplia selección de juegos, consolas y accesorios.

Instalación
Clona este repositorio en tu máquina local.
Instala las dependencias necesarias ejecutando el comando npm install.
Configura cualquier variable de entorno requerida (si es necesario).
Inicia la aplicación ejecutando el comando npm start.

Uso
Una vez que hayas instalado y ejecutado la aplicación, puedes acceder a ella a través de tu navegador web.

Comentatior

Este proyecto es el trabajo final realizado para el curso de Coderhouse. Inicialmente, la aplicación estaba diseñada para devolver respuestas en formato JSON para ser visualizadas fácilmente utilizando Postman. Sin embargo, se decidió implementar un frontend sencillo para mejorar la experiencia de visualización de la información. Ahora, al realizar las solicitudes en Postman, muchas veces se renderizan directamente las vistas que contienen la información solicitada.

Aunque la mayoría de las funcionalidades están disponibles en las vistas, hay algunas que no están accesibles directamente y requieren utilizar Postman para probarlas. A continuación, se detallan las funcionalidades y se comparte la forma de las solicitudes en Postman para poder probarlas:

---------------------
seleccionar productos por id:

GET /api/productos/id/647e6101f8f6fecc104ad58c <------ id de producto

devuelve:

{
    "data": {
        "id": "647e6101f8f6fecc104ad58c",
        "name": "Nintendo switch",
        "price": 4444,
        "image": "https://masonlineprod.vtexassets.com/arquivos/ids/214549/Nintendo-Switch-Neon-32gb-2-17642.jpg?v=637853963236300000",
        "category": "Consoles"
    }
}

--------------------

Borrar un producto por id:

POST /api/productos/647e6101f8f6fecc104ad58c <------ id de producto

Borra el producto y devuelve:

{
    "message": "Product deleted successfully"
}
--------------------

Crear producto:

POST /api/productos/

Cuerpo de solicitud:

{
  "name": "Teclado 1",
  "price": "552.45",
  "category":"Accesorios",
  "image": "https://i.ytimg.com/vi/hdEDhZvy0GI/maxresdefault.jpg"
}

devuelve:

{
    "data": {
        "id": "647fd044ce10b918068facfa",
        "name": "Teclado 1",
        "price": 552.45,
        "image": "https://i.ytimg.com/vi/hdEDhZvy0GI/maxresdefault.jpg",
        "category": "Accesorios"
    },
    "message": "Product has been created"
}

--------------------

Update Product:

POST /api/productos/updateProducto/647fd044ce10b918068facfa <---- id del producto

cuerpo de la solicitud:

(aqui se cambian los parametros deseados del producto)
{
  "name": "Teclado 1",
  "price": "625",
  "category":"Accesorios",
  "image": "https://i.ytimg.com/vi/hdEDhZvy0GI/maxresdefault.jpg"
}

devuelve:

{
    "data": {
        "id": "647fd044ce10b918068facfa",
        "name": "Teclado 1",
        "price": "625",
        "image": "https://i.ytimg.com/vi/hdEDhZvy0GI/maxresdefault.jpg",
        "category": "Accesorios"
    },
    "message": "Product updated successfully"
}

-------------------

El resto de las funcionalidades puede ser apreciada desde las vistas sin problema.

-Asegurece al registrarse de proporcionar un mail correcto para recibir el mensaje correspondiente.








