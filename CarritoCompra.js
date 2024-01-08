// carrito-compra.js

const app = Vue.createApp({
    data() {
      return {
        productos: [
          { id: 1, nombre: 'Patin A', precio: 20, cantidad: 1, imagen: '/img/patin1.jpg' },
          { id: 2, nombre: 'Patin B', precio: 30, cantidad: 1, imagen: '/img/patin2.jpg' },
          { id: 3, nombre: 'Patin C', precio: 25, cantidad: 1, imagen: '/img/patin3.jpg' },
          { id: 4, nombre: 'Patin D', precio: 40, cantidad: 1, imagen: '/img/patin4.jpg' },
          // Agrega más productos según necesites
        ],
        carrito: [],
        mostrarSidebarCarrito: false,
        moneda: 'EUR',
        tasasDeCambio: {
          EUR: 1,  // Euro
          USD: 1.12,  // Dólar estadounidense
          GBP: 0.86,  // Libra esterlina
          // Agrega más tasas de cambio según necesites
        },
      };
    },
    methods: {
      agregarAlCarrito(producto) {
        const itemExistente = this.carrito.find(itemCarrito => itemCarrito.id === producto.id);
  
        if (itemExistente) {
          itemExistente.cantidad += producto.cantidad;
        } else {
          this.carrito.push({ ...producto });
        }
      },
      mostrarCarrito() {
        this.mostrarSidebarCarrito = !this.mostrarSidebarCarrito;
      },
      calcularTotal() {
        const tasaDeCambio = this.tasasDeCambio[this.moneda] || 1;
        return this.carrito.reduce((total, item) => total + item.precio * item.cantidad * tasaDeCambio, 0);
      },
    },
    template: `
      <div>
        <div v-for="producto in productos" :key="producto.id" class="producto">
          <img :src="producto.imagen" alt="Imagen del producto" />
          <h3>{{ producto.nombre }}</h3>
          <p>{{ producto.precio * tasasDeCambio[moneda] }} {{ moneda }}</p>
          <input type="number" v-model="producto.cantidad" min="1" />
          <button @click="agregarAlCarrito(producto)">Añadir al carrito</button>
        </div>
        <button @click="mostrarCarrito">Ver carrito</button>
        
        <div v-if="mostrarSidebarCarrito" class="sidebar-carrito">
          <div v-for="item in carrito" :key="item.id">
            <p>{{ item.nombre }}</p>
            <p>{{ item.cantidad }}</p>
            <p>{{ item.precio * item.cantidad * tasasDeCambio[moneda] }} {{ moneda }}</p>
          </div>
          <p>Total: {{ calcularTotal() }} {{ moneda }}</p>
        </div>
      </div>
    `,
  });
  
  app.mount('#app');
