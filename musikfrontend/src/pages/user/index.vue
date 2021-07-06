<template>
  <q-page style="padding-top:60px;">
    <div class="q-mb-xl" style="margin-bottom:0px;">
      <q-carousel
        animated
        v-model="slide"
        v-model:fullscreen="fullscreen"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        swipeable
        transition-prev="jump-right"
        transition-next="jump-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="https://wallpapercave.com/wp/o0SLAv0.jpg">
        <div class="absolute-center custom-caption" style="text-align:center; color:white;">
          <div class="text-h2 text-weight-bold">The Beatles</div>
          <div class="text-overline">Hey Jude, In My Life, Ticket To Ride, All You Need Is Love, Come Together, I want To Hold Your Hand, Yesterday</div>
        </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" img-src="https://wallpapercave.com/wp/5YYdy5f.jpg">
        <div class="absolute-center custom-caption" style="text-align:center; color:white;">
          <div class="text-h2 text-weight-bold">Cold Play</div>
          <div class="text-overline">Viva La Vida, Fix You, Yellow, Hymn For The Weekend, A Sky Full Of Stars</div>
        </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" img-src="https://wallpapercave.com/wp/wp5840215.jpg">
        <div class="absolute-center custom-caption" style="text-align:center; color:white;">
          <div class="text-h2 text-weight-bold">Oasis</div>
          <div class="text-overline">Don't Look Back In Anger, Stand By Me, Wonderwall, Champagne Supernova</div>
        </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" img-src="https://www.situstulus.com/wp-content/uploads/2019/10/RR24-Tur-Sewindu-Malang-scaled.jpg">
        <div class="absolute-center custom-caption" style="text-align:center; color:white;">
          <div class="text-h2 text-weight-bold">Tulus</div>
          <div class="text-overline">Pamit, Monokrom, Sewindu, Cahaya, Ruang Sendiri, Gajah, Sepatu</div>
        </div>
        </q-carousel-slide>
        <q-carousel-slide name="soft-jazz">
          <q-video
            class="absolute-full"
            src="https://www.youtube.com/embed/1Ic80VlOh1c"
          />
        </q-carousel-slide>
        <template v-slot:control>
          <q-carousel-control
            position="bottom-right"
            :offset="[18, 18]"
          >
            <q-btn
              push round dense color="white" text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>
    <q-page padding>
      <div class="row q-mb-md col-gutter-md">
        <div class="col-md-12 col-xs-12 col-lg-12">
          <div class="row">
            <div class="col-auto">
              <div class="left blue"></div>
            </div>
            <div class="col">
              <q-banner inline-actions class="text-blue-grey-14">
                <div class="text-h6">Daftar Lagu</div>
                <div>Daftar Lagu Catharsis Music</div>
              </q-banner>
            </div>
          </div>
        </div>
      </div>
      <div class="row q-col-gutter-md">
      <div class="col-md-3 col-xs-12" v-for="(musik, i) in data" :key="i">
        <q-card>
          <q-img :src="'http://localhost:5000/' + musik.image" :ratio="16/9" />

          <q-card-section>
            <q-btn
              fab
              color="warning"
              icon="add_shopping_cart"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
              @click="openDetail(musik)"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ musik.judulLagu }}
              </div>
            </div>

            <div class="row no-wrap items-center">
              <div class="col text-subtitle1 ellipsis">
                {{ musik.penyanyi }}
              </div>
            </div>

            <q-rating v-model="musik.rating" readonly color="orange-5" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Rp.{{ musik.harga }},-
            </div>
            <div class="text-subtitle1">
              {{ musik.genre }}
            </div>
            <div @click="musik.expanded = !musik.expanded" class="text-caption text-grey-10 cursor-pointer">
              Tampilkan Deskripsi
            </div>
            <q-slide-transition>
              <div v-show="musik.expanded">
                <div class="text-grey text-caption" style="text-align:justify;">
                  {{ musik.deskripsi }}
                </div>
              </div>
            </q-slide-transition>
          </q-card-section>

          <q-card-actions>
            <q-btn unelevated @click="openDetail(musik)" class="full-width" color="primary">
              Order Now
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" v-if="dialog" position="bottom">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Detail Pemesanan</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh;" class="scroll">
          {{ activeData.judulFilm }} - Rp.{{ activeData.harga }},-
          <q-form>
            <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Masukkan Jumlah"/>
            Rp.{{ total }},-
            <q-file color="teal" class="q-mt-md" v-model="image" filled label="Upload Bukti Pembayaran">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup/>
          <q-btn color="primary" @click="prosesTransaksi" label="Proses"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-page>
  </q-page>
</template>
<script>
import { ref } from 'vue'
export default {
  data () {
    return {
      slide: 1,
      fullscreen: ref(false),
      autoplay: true,
      stars: 4,
      dialog: false,
      data: [],
      image: null,
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('musik/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(musik => {
              return Object.assign(musik, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idMusik: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
<style scoped>
.left{
  width: 5px;
  height: 100%;
  background-color:#010b30;
}
</style>
