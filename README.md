# Ecommerce realizado con React  y Node Js

Una aplicación  ecommerce para una marca ficticia como Limonhada Bolsos, llevada a cabo utilizando **React**, como frontend, y **Node  JS**, junto con **Mongo DB**, para el backend.  
  
Esta pagina esta realizada enteramente con motivos educativos, y ganar experiencia en el uso de estas herramientas ya antes mencionadas.  
  
Básicamente consiste en la pagina web, que ofrece un shop para la compra de bolsos de tipo tote  bag, y beach  bag. La pagina ofrece un muestrario de los productos que ofrece, se puede filtrar por tipo de modelo, y además es posible agregar bolsos que te interesen a favoritos. Cabe destacar que no posee sistemas de autenticación, tanto el carrito de compra como los favoritos son manejados del lado del cliente a través del **Local Storage**.

## Frontend

Esta enteramente realizado con **React**, posee 3 paginas principales, la home, el shop y el cart.  
La home actualmente se encuentra en construcción. El shop esta completamente terminado, con todas sus funcionalidades antes comentadas, como un filtro de productos, la posibilidad de la elección de favoritos, entre otras.  
  
El cart  también esta finalizado y depende absolutamente de que ya se hayan agregado productos al carrito, de lo contrario se encontrara con una pagina que se lo hará saber. Esta pagina posibilita ver que productos tenemos agregado al carro, manejar la cantidad de los mismo, y eliminarlos si es que ya no los queremos, además se calcula en tiempo real en el order  summary el total estimado, para la realización de la compra.  
La compra es absolutamente ficticia ya que toda la pagina fue realizada de forma educacional y con ese fin únicamente.

## Backend

El backend esta llevado a cabo con **Node  Js** y **Mongo DB**, para toda la estructura del servidor, que permite al frontend obtener la información sobre los productos y de esa manera mostrarla.  
El backend tiene un único modelo actualmente que es el de los bolsos, el cual permite estructurar la información de estos, para luego ser guardado en la base de datos.  
  
Una cuestión que cabe destacar es la integración del server con **Cloudinary**. Esta herramienta nos permite el manejo de todas nuestras imágenes de manera externa sin necesidad de alojarlas en nuestro servidor, y nos posibilita además  muchísimas opciones de edición.

## V  0.0.1
Actualmente nos encontramos en esta versión, pero la idea inicial y que en un futuro se llevara a cabo es la posibilidad de que el admin tenga un panel de productos, donde pueda agregar nuevos, editar ya creados y eliminarlos si es necesario.  
De esta manera le entrega otra versatilidad a la aplicación, ya que además hay que implementar una estructura de autenticación.

## License
eccentricfoxestudio@gmail.com
www.eccentricfox.com.ar
