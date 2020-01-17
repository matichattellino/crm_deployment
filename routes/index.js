const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');


//middleware para proteger tus rutas
const auth = require('../middleware/auth');


module.exports = function() {
    
    // Agrega nuevos clientes via POST
    router.post('/clientes',
        auth,
        clienteController.nuevoCliente 
    );

    // Obtener todos los clientes
    router.get('/clientes', 
        auth,
        clienteController.mostrarClientes
    );

    // Muestra un cliente en especifico (ID)
    router.get('/clientes/:idCliente',
        clienteController.mostrarCliente );

    // Actualizar Cliente
    router.put('/clientes/:idCliente', 
        auth,
        clienteController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', 
        auth,
        clienteController.eliminarCliente);

    /** PRODUCTOS */
    // nuevos productos
    router.post('/productos', 
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    // Muestra todos los productos
    router.get('/productos', 
        auth,
        productosController.mostrarProductos);

    // muestra un producto en especifico por su ID
    router.get('/productos/:idProducto', 
        auth,
        productosController.mostrarProducto);

    // Actualizar Productos
    router.put('/productos/:idProducto', 
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    // Eliminar Productos
    router.delete('/productos/:idProducto',
        auth, 
        productosController.eliminarProducto
    );

    // Busqueda de Productos
    router.post('/productos/busqueda/:query',
        productosController.buscarProducto);

    /*** PEDIDOS */
    // Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', 
        auth,
        pedidosController.nuevoPedido);

    // mostrar todos los pedidos
    router.get('/pedidos', 
        auth,
        pedidosController.mostrarPedidos);

    // Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido',
        auth,
        pedidosController.mostrarPedido);

    // Actualizar pedidos
    router.put('/pedidos/:idPedido', 
        auth,
        pedidosController.actualizarPedido);

    // Elimina un pedido
    router.delete('/pedidos/:idPedido', 
        auth,
        pedidosController.eliminarPedido);

    //usuarios
    router.post('/crear-cuenta',
        auth, 
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion', 
        usuariosController.autenticarUsuario
    )


    return router;
}