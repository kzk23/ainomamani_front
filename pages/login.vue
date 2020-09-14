<template>
  <section
    class="hero-1 is-fullheight"
    style="background-image: url('index.jpg')"
  >
    <div class="hero-body">
      <div class="container content has-text-centered">
        <h2 class="title has-text-white">Login</h2>
        <form class="px-6" @keydown.enter="login">
          <b-field @keydown.enter="login">
            <b-input
              ref="email"
              v-model="email"
              placeholder="Email"
              rounded
            ></b-input>
          </b-field>
          <b-field>
            <b-input
              v-model="password"
              placeholder="Password"
              type="password"
              rounded
              password-reveal
            ></b-input>
          </b-field>
          <b-button rounded block type="is-primary" @click="login"
            >Login</b-button
          >
        </form>
        <h2 class="title has-text-white">or</h2>
        <div v-for="s in strategies" :key="s.key">
          <b-button
            block
            type="is-primary"
            class="has-text-white"
            @click="$auth.loginWith(s.key)"
          >
            Login with {{ s.name }}
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.hero-1 {
  @extend .hero;
  background-size: cover;
  background-position: center center;
  background-attachment: scroll;
}
</style>

<script>
export default {
  middleware: ['auth'],
  components: {},
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  computed: {
    strategies: () => [{ key: 'google', name: 'Google', color: '#ec5425' }],
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    },
    errorMessage() {
      const { error } = this
      if (!error || typeof error === 'string') {
        return error
      }
      let msg = ''
      if (error.message) {
        msg += error.message
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, '')
          .replace(/:/g, ': ')
          .replace(/,/g, ' ')})`
      }
      return msg
    },
  },
  methods: {
    login() {
      this.error = null

      return this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then(() => {
          this.$router.push('/secure')
          this.$buefy.toast.open('ログインに成功しました。')
        })
        .catch((e) => {
          this.error = e.response.data
          this.$buefy.toast.open('エラーが発生しちゃったみたい。')
        })
    },
  },
}
</script>
