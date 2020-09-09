<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~/assets/sarumen_logo.png" alt="sarumen" />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button
              type="is-primary"
              tag="router-link"
              :to="{ path: '/registration' }"
              @click="openLoading"
            >
              Sign in
            </b-button>
            <b-button
              type="is-light"
              tag="router-link"
              :to="{ path: '/login' }"
              @click="openLoading"
            >
              Log in
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="main-content">
      <nuxt />
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <strong>ainomamani.com</strong>
        <p>
          by sarumen. #パンにmellowのジャムを塗ろう #気持ちいいforMen
          #ご飯にchillを振りかけよう
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma-social/bin/bulma-social.min.css'
export default {
  data() {
    return {
      isLoading: false,
      isFullPage: true,
    }
  },
  methods: {
    openLoading() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 10 * 1000)
    },
  },
}
</script>
