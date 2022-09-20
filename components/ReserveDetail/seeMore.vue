<template lang="pug">
  .hotel
    //- div {{t_hab}}
    //- div {{tipo_hab}}
    div(v-for="tip in tipo_hab")
      div(v-if="tip.nombre === t_hab")
        //- div {{tip.servicio}}
        h1 Detalle de habitación {{tip.nombre}}
        el-divider
        //- div(v-if="parraf.length > 300")
        div(v-if="parraf.length > 300")
          div#more
            span {{parraf.slice(0,150)}}
            span.see(@click="moreDesc") ..Ver mas
          div#minus.none
            span {{parraf}}
            span.see(@click="moreDesc") ..Ver menos
        div(v-else)
          p {{parraf}}
        .box_modal
          el-alert(closable=true)
            i(class="el-icon-price-tag")
            p S/.{{tip.tiempo[0].precio}}
          el-carousel.one
            el-carousel-item
              el-image.carousel__img(:src="`https://www.apirenti.com/${tip.foto_uno}`" fit="cover")
            el-carousel-item
              el-image.carousel__img(:src="`https://www.apirenti.com/${tip.foto_dos}`" fit="cover")
            el-carousel-item
              el-image.carousel__img(:src="`https://www.apirenti.com/${tip.foto_tres}`" fit="cover")

          el-card.two
            //- h2 Precio:
            //-   span S/.{{tip.tiempo.precio}}
            //- el-divider
            h2 Capacidad: 
              span {{tip.capacidad_persona}}
            el-divider
            h2 Servicios
            .servicios__item(v-for="(servicio, index) in tip.servicio" :key="index")
              //- font-awesome-icon.servicios__item__icon(:icon="['fas', 'coffee']")
              span {{servicio.nombre}}

</template>

<script>

export default {
  props: ["t_hab", "tipo_hab"],

  name: "seeMore",
  data() {
    return {
      parraf: "Este hotel de 5 estrellas se encuentra en la isla de Esteves y cuenta con conexión Wi-Fi gratuita y spa con bañera de hidromasaje y sauna. Además, tiene vistas panorámicas al lago Titicaca, desde los Andes hasta Bolivia. Las habitaciones del Libertador Lake Titicaca son elegantes y amplias y están equipadas con TV, minibar y baño privado. Además, tienen vistas al lago. El restaurante Los Uros sirve una fusión de cocina internacional y andina. Además, el Libertador Lake Titicaca cuenta con tiendas y gimnasio con actividades de entrenamiento cardiovascular. El centro de Puno enlaza con la zona continental mediante un puente y está a solo 5 minutos en coche. El aeropuerto internacional Manco Cápac de Juliaca está a 45 minutos. Hay aparcamiento público gratuito.",
      show: false,
      
    };
  },
  methods: {
    moreDesc() {
      this.show=true;
      document.querySelector('#more').classList.toggle('none');
      document.querySelector('#minus').classList.toggle('none');
    },
    
  }
  

};
</script>
<style lang="stylus">
  @import "../../assets/style/renti//seeMore.styl"
</style>
