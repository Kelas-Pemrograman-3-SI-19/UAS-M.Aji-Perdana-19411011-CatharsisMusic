<template>
    <q-page padding class=" bg-blue-grey-1">
      <div class="row q-mb-md col-gutter-md">
        <q-card style="margin-top:60px;" class="posisi col-md-7 col-xs-12">
          <q-card-section>
            <div class="text-h6">
              Edit Profile Anda
            </div>
            <q-form
              @submit="onSubmit"
            >
              <q-input
                v-model="form.username"
                label="Username"
                :rules="[
                  val => !!val || 'Tolong Isi Username Anda'
                ]"
              />
              <q-input
                v-model="form.namaLengkap"
                label="Nama Lengkap"
                :rules="[
                  val => !!val || 'Tolong Isi Nama Lengkap Anda'
                ]"
              />
              <q-input
                v-model="form.alamat"
                label="Alamat Anda"
                :rules="[
                  val => !!val || 'Tolong Isi Alamat Tinggal Anda'
                ]"
              />
              <q-input
                v-model="form.email"
                label="E-Mail"
                :rules="[
                  val => !!val || 'Tolong Isi E-Mail Anda'
                ]"
              />
              <q-input
                v-model="form.notelepon"
                label="No Telepon"
                :rules="[
                  val => !!val || 'Tolong Isi No Telepon Anda Anda'
                ]"
              />
              <q-input v-model="form.password" :type="isPwd ? 'password' : 'text'" label="Password"
                :rules="[
                  val => !!val || 'Tolong Isi Password Anda Anda'
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <div class="q-gutter-md">
                <q-btn
                  dark-percentage
                  unelevated
                  color="primary"
                  label="Update"
                  type="submit"
                />
                <q-btn
                  unelevated
                  color="red"
                  label="Batal"
                  :to="{ name: 'Profile' }"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
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
      },
      isPwd: true
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
            this.$router.push({ name: 'homeUser' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style>
  .posisi{
    margin: auto;
  }
</style>
