<template>
  <v-form ref="form">
    <v-row dense>
      <v-col cols="12" class="text-center mb-10" v-if="esInicio">
        <v-btn x-large class="btn__guardar" @click="guardar"
          ><v-icon class="mr-4">mdi-content-save</v-icon> Guardar
        </v-btn>
        <v-btn x-large class="btn__guardar ml-5" @click="cancelar"
          ><v-icon class="mr-4">mdi-close</v-icon> Abandonar
        </v-btn>
      </v-col>

      <v-col cols="8" class="py-0">
        <v-text-field
          v-model="datosModelo.nombre"
          outlined
          dense
          label="Nombre"
          :rules="[rules.required]"
          clearable
          @keyup.enter="busqueda"
        ></v-text-field>
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field
          type="number"
          v-model="datosModelo.monto"
          outlined
          dense
          label="Capital"
          :rules="[rules.required]"
          clearable
        ></v-text-field
      ></v-col>
      <v-col cols="4" class="py-0">
        <v-row>
          <v-col cols="12">
            <v-text-field
              type="number"
              v-model="datosModelo.apuesta"
              outlined
              dense
              label="Apuesta"
              :rules="[rules.required]"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" v-if="noSeleccionado">
            <h4>Selecciona alguna opcion de las listadas para apostar</h4>
          </v-col>
          <v-col cols="3" class="py-0 mt-4 mr-4">
            <v-text-field
              type="number"
              v-model="datosModelo.numero"
              outlined
              dense
              label="Número"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="py-0 ml-10">
            <v-radio-group v-model="datosModelo.color">
              <template v-slot:label>
                <p>
                  <v-btn icon @click="limpiarColor"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                  <strong>Color</strong>
                </p>
              </template>
              <v-radio value="#C34A36">
                <template v-slot:label>
                  <div class="caja__contenedor">
                    <div class="caja__color caja__color__1">
                      <strong>Rojo</strong>
                    </div>
                  </div>
                </template>
              </v-radio>
              <v-radio value="#4B4453">
                <template v-slot:label>
                  <div class="caja__contenedor">
                    <div class="caja__color caja__color__2">
                      <strong>Negro</strong>
                    </div>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="3" class="py-0">
            <v-radio-group v-model="datosModelo.esPar">
              <template v-slot:label>
                <div class="mb-3">
                  <v-btn icon @click="limpiarParOImpar">
                    <v-icon>mdi-close</v-icon></v-btn
                  ><strong>Par o impar</strong>
                </div>
              </template>
              <v-radio :value="true">
                <template v-slot:label>
                  <div>
                    <div>
                      <strong>Par</strong>
                    </div>
                  </div>
                </template>
              </v-radio>
              <v-radio :value="false">
                <template v-slot:label>
                  <div>
                    <div>
                      <strong>Impar</strong>
                    </div>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="py-0 mt-4 text-center">
        <v-btn
          :disabled="esDesactivado"
          color="white"
          class="contenedor__accionador"
          @click="empezarApuesta"
          x-large
        >
          Empezar el juego
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "ruleta-datos",

  data() {
    return {
      esInicio: true,
      datosModelo: {
        nombre: "",
        apuesta: null,
        monto: null,
        numero: null,
        color: "",
        esPar: null,
      },
      esDesactivado: false,
      noSeleccionado: true,
      rules: {
        required: (v) => !!v || "Requerido",
      },
    };
  },

  methods: {
    limpiarColor() {
      this.datosModelo.color = null;
    },
    limpiarParOImpar() {
      this.datosModelo.esPar = null;
    },
    empezarApuesta() {
      if (this.$refs.form.validate()) {
        if (
          this.datosModelo.color ||
          this.datosModelo.esPar ||
          this.datosModelo.numero
        ) {
          this.esDesactivado = true;
          this.noSeleccionado = false;
          this.esInicio = true;
          this.$emit("emitirDatos", this.datosModelo);
        } else {
          this.noSeleccionado = true;
        }
        setTimeout(() => (this.esDesactivado = false), 1500);
      }
    },
    guardar() {
      this.esInicio = false;
      if (!this.datosModelo?.id) {
        this.axios
          .post("https://localhost:44314/api/jugador", {
            nombre: this.datosModelo.nombre,
            monto: this.datosModelo.monto,
          })
          .then((res) => console.log(res));
      }else{
        this.axios
          .put("https://localhost:44314/api/jugador", {
            id: this.datosModelo.id,
            nombre: this.datosModelo.nombre,
            monto: this.datosModelo.monto,
          })
          .then((res) => console.log(res));
      }
      // this.datosModelo = {};
      this.$swal("Se ha guardado correctamente");
    },
    cancelar() {
      this.esInicio = false;
      this.$refs.form.reset();
    },
    restarPremio() {
      this.datosModelo.apuesta -= this.datosModelo.apuestaInicial;
    },
    busqueda() {
      this.axios
        .get(`https://localhost:44314/api/jugador/${this.datosModelo.nombre}`)
        .then((res) => {
          if (!res) {
            this.datosModelo = {};
          } else {
            let data = res?.data;
            this.datosModelo = {
              id: data.Id,
              nombre: data.Nombre,
              monto: data.Monto,
            };

            this.$refs.form.resetValidation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.caja__color {
  width: 60px;
  height: 60px;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.caja__color__1 {
  background: #c34a36 !important;
}
.caja__color__2 {
  background: #4b4453 !important;
}
</style>
