<template>
  <v-row dense justify="center" align="start">
    <v-col cols="12" class="titulo mb-8">
      <h2 class="text-center white--text pa-5">Juego de ruleta {{datosGanadores}}</h2>
    </v-col>
    <v-col cols="6" class="text-centr">
      <ruletaDatos @emitirDatos="datosEmitidosEvento" ref="ruletaDatos" />
    </v-col>
    <v-col cols="5" class="text-center">
      <ruletaJuego ref="ruletaTablero" />
    </v-col>
  </v-row>
</template>

<script>
import ruletaDatos from "@/components/ruleta-datos.vue";
import ruletaJuego from "@/components/ruleta-indicador.vue";

export default {
  name: "ruleta-juego",

  components: {
    ruletaDatos,
    ruletaJuego,
  },

  data() {
    return {
      datosEmitidos: {
        color: "S/A",
        numero: 0,
        monto: 0,
      },
      colores: ["#C34A36", "#4B4453"],
      datosGanadores: {
        color: null,
        numero: null,
        esPar: null,
      },
      nuevoMonto: 0,
    };
  },

  methods: {
    datosEmitidosEvento(datos) {
      this.datosGanadores = {
        color: null,
        numero: null,
        esPar: null,
      };
      this.datosEmitidos = datos;
      let numGanador = this.generarNumAleatorio();
      let grados = this.calcularGrados(numGanador);

      if (datos.monto < datos.apuesta || datos.monto <= 0) {
        alert("Saldo insuficiente para apostar");

        return;
      }

      this.$refs.ruletaTablero.iniciarJuego(
        numGanador,
        grados,
        (datosGanadorRuleta) => {
          let esParGanador = this.esPar(numGanador);
          let colorGanador = datosGanadorRuleta.color;

          if (numGanador == datos.numero)
            this.datosGanadores.numero = numGanador;
          if (colorGanador == datos.color)
            this.datosGanadores.color = colorGanador;
          if (esParGanador == datos.esPar)
            this.datosGanadores.esPar = esParGanador;

          if (
            numGanador == datos.numero &&
            colorGanador != datos.color &&
            datos.esPar == null
          ) {
            this.datosGanadores.numero = null;
            this.datosGanadores.color = null;
          } else if (
            numGanador != datos.numero &&
            colorGanador == datos.color &&
            datos.esPar == null
          ) {
            this.datosGanadores.numero = null;
            this.datosGanadores.color = null;
          }

          setTimeout(() => {
            this.validarPremio();
          }, 2100);
        }
      );
    },
    generarNumAleatorio() {
      return Math.ceil(Math.random() * 5);
    },
    generarNumAleatorioParaColores() {
      let numAleatorio = Math.ceil(Math.random() * 2) - 1;
      numAleatorio = numAleatorio < 0 ? 0 : numAleatorio;
      return this.colores[numAleatorio];
    },
    validarPremio() {
      let montoActual = this.datosEmitidos.monto;
      let apuestaActual = this.datosEmitidos.apuesta;

      if (
        this.datosGanadores.esPar == null &&
        this.datosGanadores.numero &&
        this.datosGanadores.color
      ) {
        let premio = apuestaActual * 3;
        this.$refs.ruletaDatos.datosModelo.monto =
          parseFloat(montoActual) + parseFloat(premio);
        this.$swal("numero y color ganador");
      } else if (
        !this.datosGanadores.numero &&
        this.datosGanadores.esPar == null &&
        this.datosGanadores.color
      ) {
        let premio = apuestaActual / 2;
        this.$refs.ruletaDatos.datosModelo.monto =
          parseFloat(montoActual) + parseFloat(premio);
        this.$swal("color ganador");
      } else if (
        !this.datosGanadores.numero &&
        !this.datosGanadores.color &&
        this.datosGanadores.esPar != null
      ) {
        this.$swal(
          `el numero ganador es ${this.datosGanadores.esPar ? "Par" : "Impar"}`
        );
        let premio = apuestaActual * 2;
        this.$refs.ruletaDatos.datosModelo.monto =
          parseFloat(montoActual) + parseFloat(premio);
      } else if (
        !this.datosGanadores.numero &&
        this.datosGanadores.color &&
        this.datosGanadores.esPar != null
      ) {
          this.$swal(`color ganador y numero ${
            this.datosGanadores.esPar ? "Par" : "Impar"
          }`);
        
      } else {
        this.$refs.ruletaDatos.datosModelo.monto =
          parseFloat(montoActual) - parseFloat(apuestaActual);
        this.$swal('Haz perdido');
      }
    },
    esPar(numero) {
      return numero % 2 == 0;
    },
    calcularGrados(numero) {
      let grados = 360 / 32;
      return numero * grados;
    },
    restarMonto() {
      this.da;
    },
  },
  computed: {},
};
</script>

<style>
.contenedor {
  background: #f6f6f6 !important;
}
.titulo {
  background: rgba(10, 92, 179, 0.977);
}
</style>
