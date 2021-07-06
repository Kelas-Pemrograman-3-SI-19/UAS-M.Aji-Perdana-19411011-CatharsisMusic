<template>
    <q-page padding>
        <div class="row q-mb-md col-gutter-md">
          <div class="col-md-12 col-xs-12 col-lg-12">
            <div class="row">
              <div class="col-auto">
                <div class="left blue"></div>
              </div>
              <div class="col">
                <q-banner inline-actions class="text-blue-grey-14">
                  <div class="text-h6">Edit Musik</div>
                  <div>Edit Data Musik</div>
                </q-banner>
              </div>
            </div>
          </div>
        </div>
        <q-card flat>
          <q-card-section class="row">
            <q-form
              @submit="onSubmit()"
              class="q-gutter-md col-md-6 col-xs-12"
            >
              <q-input
                v-model="form.username"
                filled
                label="Username"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Username']"
              />
              <q-input
                v-model="form.namaLengkap"
                filled
                label="Nama Lengkap"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Nama Lengkap']"
              />
              <q-input
                v-model="form.alamat"
                filled
                label="Alamat"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Alamat']"
              />
              <q-input
                v-model="form.email"
                filled
                label="E-Mail"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi email']"
              />
              <q-input
                v-model="form.notelepon"
                filled
                label="Nomor Telepon"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Nomor Telepon']"
              />
              <q-input
                v-model="form.password"
                filled
                label="Password"
                :rules="[ val => val && val.length > 0 || 'Mohon Isi Password']"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: null,
        namaLengkap: null,
        alamat: null,
        email: null,
        notelepon: null,
        password: null
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`user/getbyid/${this.$route.params.id}`)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$router.push({ name: 'dataUser' })
          }
        })
    },
    onSubmit () {
      this.$axios.put(`user/update/${this.$route.params.id}`, this.form)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataUser' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
.left{
  width: 5px;
  height: 100%;
  background-color:rgb(89, 251, 251);
}
</style>
