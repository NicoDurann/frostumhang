const app = Vue.createApp({
  data() {
    return {
      img: "",
      nombre: "",
      precio: "",
      cantidad: 1,
      productos: [],
      carrito: [],
    }
  },
  created() {
    this.getJSON();
    this.leerLocal();
  },
  computed: {
    totalPrecio(){
      let total = 0;
      this.carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;
      });
      return total;
    }
  },
  methods: {
    async getJSON() {
      try {
        const resp = await fetch("./api/data.json");
        const json = await resp.json();

        this.productos = json.data;

        console.log(this.producto);
      } catch (error) {
        console.log(error);
      }
    },
    agregarAlCarrito(producto) {
      // Buscar si el producto ya está en el carrito
      const existe = this.carrito.find((p) => p.id === producto.id);

      // Si existe, aumentar la cantidad
      if(existe){
        existe.cantidad++;
      }
      // Si no, agregarlo al carrito
      else{
        this.carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        });
      }

      this.guardarLocal();
    },
    vaciarCarrito(){
      this.carrito = [];
      this.guardarLocal();
    },
    eliminarProducto(index){
      // Si hay más de un producto, se disminuye la cantidad
      if(this.carrito[index].cantidad > 1){
        this.carrito[index].cantidad--;
      }
      // Si no, se elimina el producto
      else{
        this.carrito.splice(index, 1);
      }

      this.guardarLocal();
    },
    leerLocal(){
      if(localStorage.getItem("carrito")){
        this.carrito = JSON.parse(localStorage.getItem("carrito"));
      }
    },
    guardarLocal(){
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
  }
})

app.mount("#app");