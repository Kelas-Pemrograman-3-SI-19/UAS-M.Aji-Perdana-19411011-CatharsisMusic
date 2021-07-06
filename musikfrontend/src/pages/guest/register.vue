<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="bgg">
        <div class="row">
          <q-card class="fixed-center col-md-4 col-xs-12">
            <q-card-section>
              <div class="text-h6">
                Halaman Register
              </div>
              <q-form
                @submit="onSubmit"
              >
                <q-input
                  v-model="username"
                  label="Username"
                  :rules="[
                    val => !!val || 'Tolong Isi Username Anda'
                  ]"
                />
                <q-input
                  v-model="namaLengkap"
                  label="Nama Lengkap"
                  :rules="[
                    val => !!val || 'Tolong Isi Nama Lengkap Anda'
                  ]"
                />
                <q-input
                  v-model="alamat"
                  label="Alamat Anda"
                  :rules="[
                    val => !!val || 'Tolong Isi Alamat Tinggal Anda'
                  ]"
                />
                <q-input
                  v-model="email"
                  label="E-Mail"
                  :rules="[
                    val => !!val || 'Tolong Isi E-Mail Anda'
                  ]"
                />
                <q-input
                  v-model="notelepon"
                  label="No Telepon"
                  :rules="[
                    val => !!val || 'Tolong Isi No Telepon Anda Anda'
                  ]"
                />
                <q-input v-model="password" :type="isPwd ? 'password' : 'text'" label="Password"
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
                    :loading="loading3"
                    :percentage="percentage3"
                    dark-percentage
                    unelevated
                    color="primary"
                    @click="startComputing(3)"
                    label="Register"
                    type="submit"
                  />
                  <q-btn
                    unelevated
                    color="primary"
                    label="Login"
                    flat
                    :to="{ name: 'loginPage' }"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      namaLengkap: null,
      alamat: null,
      email: null,
      notelepon: null,
      password: null,
      isPwd: true,
      loading3: false,
      percentage3: 0
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('user/register', {
        username: this.username,
        namaLengkap: this.namaLengkap,
        alamat: this.alamat,
        email: this.email,
        notelepon: this.notelepon,
        password: this.password
      }).then((res) => {
        if (res.data.sukses) {
          this.$showNotif(res.data.pesan, 'positive')
          this.$router.push({ name: 'loginPage' })
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    },
    startComputing (id) {
      this[`loading${id}`] = true
      this[`percentage${id}`] = 0
      this[`interval${id}`] = setInterval(() => {
        this[`percentage${id}`] += Math.floor(Math.random() * 8 + 10)
        if (this[`percentage${id}`] >= 100) {
          clearInterval(this[`interval${id}`])
          this[`loading${id}`] = false
        }
      }, 700)
    }
  }
}
</script>
<style>
  .bgg{
    background: linear-gradient(0deg, rgba(34,195,161,1) 0%, rgba(45,63,253,1) 100%);
  }
</style>
