import { createApp, h, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import { apolloClient, apolloProvider, DefaultApolloClient } from "./apollo/ApolloProvider.js"
import { vuetify } from "./components/Vuetify"

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(apolloProvider)
app.use(router)
app.use(vuetify)
app.mount("#app");
