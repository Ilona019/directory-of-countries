import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown, faMoneyBillAlt, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSearch, faChevronDown, faMoneyBillAlt, faChevronLeft);

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app');
