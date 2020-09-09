<template>
  <section
    class="hero-1 is-fullheight"
    style="background-image: url('index.jpg')"
  >
    <div class="hero-body">
      <div class="container content has-text-centered">
        <h2 class="title has-text-white">Registration</h2>
        <form class="mx-6 px-6" @keydown.enter="login">
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
          <b-field>
            <b-input
              v-model="passwordConfirm"
              placeholder="PasswordConfirm"
              type="password"
              rounded
              password-reveal
            ></b-input>
          </b-field>
          <b-button rounded block type="is-primary" @click="registration"
            >Registration</b-button
          >
        </form>
      </div>
    </div>
  </section>
</template>

<style></style>

<script>
export default {
  middleware: ['auth'],
  options: {
    auth: false,
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      error: null,
    }
  },
  computed: {
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
    registration() {
      this.error = null

      this.$axios
        .post(`/server/rest-auth/registration/`, {
          email: this.email,
          password1: this.password,
          password2: this.passwordConfirm,
        })
        .then(() => {
          this.$router.push('/login')
          this.$buefy.toast.open(
            '登録が完了しました。確認メールを認証してください。'
          )
        })
        .catch((e) => {
          this.error = e.response.data
          this.$buefy.toast.open('エラーが発生しちゃったみたい。')
        })
    },
  },
}
</script>
