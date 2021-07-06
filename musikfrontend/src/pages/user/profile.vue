<template>
  <q-page>
    <div class="jumbotron">
      <h1 class="text-h2 text-weight-bold yoi">{{ $q.localStorage.getItem('dataUser').namaLengkap }}</h1><br>
    </div>
    <div class="yes">
      <q-btn :to="{ name:'editUseR', params: { id: $q.localStorage.getItem('dataUser')._id }}" label="Edit Profile" color="warning" unelevated/>
    </div>
  </q-page>
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
      password: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`user/update/${this.$route.params.id}`, this.form)
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(user => {
              return Object.assign(user, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style>
  .jumbotron{
    width: 100%;
    height: 657px;
    background-image: url(~assets/a.jpg);
    background-repeat: no-repeat;
    /*parallax*/
    background-attachment: fixed;
    background-size: cover;
    margin: auto;
    position: relative;
    background-position: 0 -200px;
    overflow: hidden;
  }

  .jumbotron .yoi{
    text-align: center;
    line-height: 657px;
    color: white;
  }

  .yes {
    width: 119px;
    text-decoration: none;
    margin: auto;
    transition: 0.2s ease-in-out;
  }
</style>
