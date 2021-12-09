<script>
import axios from 'axios';

export default {
  name: 'home',
  data () {
    return {
      loading: false,
      error: null,
      dataOnCountries: null,
      search: '',
      showFilter: false,
      showAllRegion: false,
      region: ''
    }
  },
  mounted () {
    this.loading = true;
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => (this.dataOnCountries = response.data))
      .catch(error => (this.error = error ))
      .finally(() => { this.loading = false });
  },
  computed: {
    filteredCountries: function () {
      let filteredByRegion = [];
      if (this.region !== '' && this.region !== 'All Regions') {
        filteredByRegion = this.dataOnCountries.filter((country) => {
            return country.region === this.region;
        })
      } else {
        filteredByRegion = this.dataOnCountries;
      }

      if (this.search !== '') {
        return filteredByRegion.filter((country) => {
            return country.name.common.toLowerCase().match(new RegExp('^'+this.search.toLowerCase(), 'i'));
        });
      } 
      else {
        return filteredByRegion;
      }
    }
  },
  methods: {
    handleFilterClick () {
      setTimeout(() => {
        this.showFilter = !this.showFilter;
        this.showAllRegion = true;
      })
    }
  }
}
</script>

<template>
  <div class="home">
    <!-- Строка поиска по названию страны -->
    <div class="searchBar">
      <div class="searchContainer">
        <font-awesome-icon icon="search"/>
        <input 
          class="searchInput" 
          type="text" 
          v-model="search"
          aria-label="Search for a country..."
          placeholder="Search for a country..."
        />
        <ul class="searchResults"></ul>
      </div>
    <!-- Фильтр по региону -->
      <div class="dropDownMenu">
        <!-- Текст по умолчанию на фильтре перед выбором -->
        <div  v-if="!showAllRegion" @click="showFilter = !showFilter" class="dropDownButton">
            Filter by Region
        <font-awesome-icon icon="chevron-down"/>
        </div>
        <div v-else @click="showFilter = !showFilter" class="dropDownButton">
           {{ region }}
        <font-awesome-icon icon="chevron-down"/>
        </div>
        <ul v-if="showFilter" class="dropDownPanel">
          <li>
            <input 
              id="radioAfrica" 
              class="dropdownInput" 
              type="radio" 
              name="africa" 
              value="Africa" 
              v-model="region" 
              @click="handleFilterClick"
            />
            <label for="radioAfrica">Africa</label>
          </li>
          <li>
            <input 
              id="radioAmericas" 
              class="dropdownInput" 
              type="radio" 
              name="america" 
              value="Americas" 
              v-model="region" 
              @click="handleFilterClick"
            />
            <label for="radioAmerica">Americas</label>
          </li>
          <li>
            <input 
              id="radioAsia" 
              class="dropdownInput" 
              type="radio" 
              name="asia" 
              value="Asia" 
              v-model="region" 
              @click="handleFilterClick"
            />
            <label for="radioAsia">Asia</label>
          </li>
          <li>
            <input 
              id="radioEurope" 
              class="dropdownInput" 
              type="radio" 
              name="europe" 
              value="Europe" 
              v-model="region" 
              @click="handleFilterClick"
            />
            <label for="radioEurope">Europe</label>
          </li>
          <li>
            <input 
              id="radioOceania" 
              class="dropdownInput" 
              type="radio" 
              name="oceania" 
              value="Oceania" 
              v-model="region" 
              @click="handleFilterClick"
            />
            <label for="radioOceania">Oceania</label>
          </li>
          <li v-if="showAllRegion">
            <input 
              id="radioAll" 
              class="dropdownInput" 
              type="radio" 
              name="all" 
              value="All Regions" 
              v-model="region" 
              @click="handleFilterClick"
            />
            <label for="radioAll">All Regions</label>
          </li>
        </ul>
      </div>
    </div>
    <!-- Панель поиска -->
    <h1 v-if="error !== null">Sorry, an error has occurred {{error}}</h1>
    <!-- Анимация загрузки -->
    <div class="loaderContainer"><div v-if="loading" class="loader"></div></div>

    <!-- Вывод списка стран -->
    <div v-if="dataOnCountries" class="countriesGrid">
      <div v-for="country in filteredCountries" class="countryCard" v-bind:key="country.id">
        <router-link 
          :to="{ name: 'country-detail', params: {country: country.cca3 }}" 
          class="linkTile">
          <img v-bind:src="country.flags.svg" alt="Country flag" class="flag">
          <div class="text">
            <h1 class>{{ country.name.common }}</h1>
            <p><span>Capital: </span> {{ country.capital ? country.capital['0'] : 'no' }}</p>
            <p><span>Population: </span>{{country.population }}</p>
            <p><span>Region: </span> {{ country.region }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  background-color: #d4e4d2;
}
.searchBar {
  padding: 35px 75px;
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}
.searchContainer {
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  width: 500px;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.searchIcon {
  font-size: 16px;
  color: #848484;
  padding-right: 30px;
}
.searchInput {
  border: none;
  outline:none;
  font-size: 18px;
  font-family: sans-serif;
  width: 400px;
  margin-left: 10px;
}
.dropDownButton {
  background: #fff;
  height: 50px;
  width: 140px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
}
.dropDownPanel {
  background-color: #fff;
  text-align: left;
  margin-top: 3px;
  padding: 10px 0; 
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  border-radius: 3px;
  position: absolute;
  width: 200px;
  z-index: 100;
}
.dropDownPanel li {
  list-style: none;
  line-height: 2;
  cursor: pointer;
}
.dropDownPanel li label {
  cursor: pointer;
  padding: 0 30px;
  display: block;
  width: 140px;
}
.dropDownPanel li:hover {
  background-color: #f9f9f9;
}
.dropdownInput {
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
}
input[type="radio"] {
  -webkit-appearance: radio;
}
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #4c994c;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin-bottom: 100px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loaderContainer {
  display: flex;
  justify-content: center;
}
.countriesGrid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 25px 50px 0;
  margin: 0 auto;
  max-width: 1450px;
}
.countryCard {
  display: inline-block;
  background-color: #fff;
  width: 300px;
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.1);
  border-radius: 3px;
  cursor: pointer;
  text-align: left;
  margin: 0 25px 80px;
  text-decoration: none;
  color: inherit;
}
.countryCard:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.linkTile {
  display: inline-block;
  width: 300px;
  height: 365px;
  text-decoration: none;
  color: inherit;
}
.flag {
  height: 180px;
  width: 300px;
  border-radius: 3px 3px 0 0;
}
.text {

  padding-left: 30px;
  padding-right: 20px;
}
.text h1 {
  font-size: 20px;
  text-align: center;
}
.text p span {
  font-weight: 600;
}
.text p {
  line-height: 1;
}
::placeholder {
  font-weight: 600;
}
</style>