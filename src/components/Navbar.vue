<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-light bg-light nav-wrapper">
      <div class="logo-container">
        <router-link class="toolbar-items link-logo d-flex" to="/">
          <img src="../assets/img/logo.png" class="logo-img" />
        </router-link>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" class-active="active">Xəta bildirişləri</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/calibration" class="nav-link" class-active="active">Kalibrasiya</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/motors" class="nav-link" class-active="active">Motorlar</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import brandLogo from "../assets/img/logo.png";
export default {
  data() {
    return {
      color: "white",
      logo: brandLogo
    };
  },

  methods: {}
};
</script>

<style>
.nav-wrapper {
  border-radius: 0 0 5px 5px;
  background-color: rgb(0, 58, 175) !important;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  font-family: "Roboto", helvetica, arial, sans-serif !important;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-toggler {
  background-color: #fb8c00 !important;
  margin-right: 15px !important;
}

.logo {
  height: 28px;
  width: 40px;
}

.logo-img {
  height: 28px;
  width: 40px;
}

.nav-link {
  color: #fff !important;
  text-decoration: none;
  padding: 10px 25px;
  border-radius: 5px;
  margin: 0 20px;
  text-align: center;
}

.nav-link:hover {
  background: #eba148;
}

.router-link-exact-active {
  background: #fb8c00 !important;
}

.link-logo {
  background: transparent !important;
  height: 28px !important;
}

.logout-icon {
  color: #fff !important;
  height: 40px !important;
}

@media screen and (max-width: 520px) {
  .navbar-nav {
    margin-top: 20px;
  }
}
</style>