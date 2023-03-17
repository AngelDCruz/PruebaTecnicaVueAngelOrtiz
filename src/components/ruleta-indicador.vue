<template>
  <div>
    <vue-winwheel
      :segments="items"
      ref="wins"
      @numeroGanador="numeroGanador"
      :duration="2"
    />
  </div>
</template>

<script>
import VueWinwheel from "vue-winwheel-reversion/vue-winwheel";

export default {
  name: "ruleta-indicador",
  components: {
    VueWinwheel,
  },
  data() {
    return {
      items: [],
      colores: [],
    };
  },
  created() {
    this.colores = this.generarColorRandom();
    this.crearRangoNumeros();
  },
  methods: {
    numeroGanador() {},
    iniciarJuego(numeroGanador, grados, accion) {
      this.crearRangoNumeros();
      this.colores = this.generarColorRandom();

      this.$refs.wins.establecerNumeroGanador(grados);
      accion({
        numero: numeroGanador,
        color: this.colorNumeroParOImpar(numeroGanador, this.colores),
      });
    },
    crearRangoNumeros() {
      this.items = [];
      let elems = [];

      for (let num = 1; num <= 32; num++) {
        elems.push({
          textFillStyle: "#fff",
          fillStyle: this.colorNumeroParOImpar(num, this.colores),
          text: num.toString(),
        });
      }

      this.items = elems;
    },
    colorNumeroParOImpar(numero, colores) {
      return numero % 2 == 0 ? colores[0] : colores[1];
    },
    generarColorRandom() {
      let num = Math.ceil(Math.random() * 2) - 1;
      let colores = ["#C34A36", "#4B4453"];

      return [colores[num], colores[num == 0 ? 1 : 0]];
    },
    reiniciar() {
      this.colores = this.crearRangoNumeros();
    },
  },
  mounted() {
    setTimeout(() => {}, 2000);
  },
};
</script>
