<template>
  <div class="login" id="firebaseui-auth-container"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebaseApp from "@/services/firebase";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { mapGetters } from "vuex";

const WIDGET_CONTAINER_SELECTOR = "#firebaseui-auth-container";

@Component({
  components: {},
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
})
export default class Login extends Vue {
  mounted() {
    this.setupUI();
  }

  /**
   * Setup the login form
   */
  private setupUI() {
    const widget = firebaseui.auth.AuthUI.getInstance();

    // Remove the existing instance
    if (widget) {
      widget.delete().then(() => this.initLoginWidget());
    } else {
      this.initLoginWidget();
    }
  }

  /**
   * Initiate login widget
   */
  private initLoginWidget() {
    const widget = new firebaseui.auth.AuthUI(firebaseApp.auth());

    widget.start(WIDGET_CONTAINER_SELECTOR, {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: "/"
    });
  }
}
</script>
