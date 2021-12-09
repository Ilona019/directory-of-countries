<script>
import axios from 'axios';

export default {
  name: 'country-detail',
  data () {
    return {
      loading: false,
      error: null,
      countryData: null,
      borderCountries: null
    }
  },
  mounted () {
    this.loading = true;
        return axios
        .get(`https://restcountries.com/v3.1/alpha/${this.$route.params.country}`)
        .then(response => 
        {
            (this.countryData = response.data
            , this.borderCountries = response.data['0']?.borders
            )
        })
        .catch(error => (this.errorBorders = error))
        .catch(error => (this.error = error))
        .finally( () => { this.loading = false });
  }
}
</script>

<template>
  <div class="country-detail">
    <a @click="$router.go(-1)" class="backBtn"><font-awesome-icon icon="chevron-left"/> Back</a>

    <h1 v-if="error !== null">Sorry, an error has occurred {{error}}</h1>
    <div class="loaderContainer"><div v-if="loading" class="loader"></div></div>

    <div v-for="country in countryData" class="countryDetailCard" v-bind:key="country.id">
      <img v-bind:src="country.flags.svg" alt="Country Flag" class="flag">
      <div class="country-details">
        <div class="containerTitleCountry">
            <h1>{{country.name.common}}</h1>
            <img v-bind:src="country.coatOfArms.svg" alt="Coast of arms" class="coatOfArms">
        </div>
        <div class="listInfoCountry">
          <ul>
            <li><span>Native Name:</span> {{country.name.official || country.name.nativeName.common}}</li>
            <li><span>Population:</span> {{country.population }}</li>
            <li><span>Region:</span> {{country.region}}</li>
            <li><span>Sub Region:</span> {{country?.subregion || 'no'}}</li>
            <li><span>Capital:</span> {{ country.capital ? country.capital['0'] : 'no'}}</li>
          </ul>
          <ul>
            <li><span>Top Level Domain:</span> {{country.tld['0']}}</li>
            <li><span>Languages: </span> 
                <span v-if="!('languages' in country)">no</span>
              <span 
                v-for="(language, index) in country.languages" 
                v-bind:key="index" 
                class="languages">
                {{language}} <span></span>
              </span>
            </li>
          </ul>
        </div>
        <div class="borders">
          <div class="bordersWrapper">
            <span class="notFoundedResults" v-if="!borderCountries">No border countries</span>
            <span class="borderTitle" v-else>Border Countries:</span>
            <span v-for="countryBorderDetails in borderCountries" v-bind:key="countryBorderDetails.id" class="borderList">
              <router-link :to="{ name: 'country-detail', params: { country: countryBorderDetails }}" class="borderLink">
                {{countryBorderDetails}} 
              </router-link>
            </span>
          </div>
        </div>
        <div class="currencies">
            <span class="notFoundedResults" v-if="!('currencies' in this.countryData['0'])">No currencies</span>
            <span class="currenciesTitle" v-else>Currencies: <font-awesome-icon icon="money-bill-alt"/></span>
              <span 
                v-for="(currency, index) in this.countryData['0'].currencies" 
                v-bind:key="index" 
                class="currencies">
                <div class="currencyElement">{{currency.name}} <span class="currencySymbol">{{currency.symbol}}</span></div>
              </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.country-detail {
  background: #d4e4d2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  height: 100%;
  font-size: 16px;
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
.borders .loader {
  width: 60px;
  height: 60px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loaderContainer {
  display: flex;
  justify-content: center;
}
.containerTitleCountry {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding-bottom: 10px;
}
.containerTitleCountry h1 {
    margin: 0 0;
}
.backBtn, .borderLink {
  display: block;
  background: #fff;
  width: 100px;
  box-shadow: 1px 1px 7px 0px rgb(0, 0, 0, 0.20);
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
  color: #111517;
  padding: 5px 0;
  text-align: center;
}
.countryDetailCard {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 10px;
}
.flag {
  max-width: 570px;
  min-width: 350px;
  padding-bottom: 70px;
  width: 100%;
  height: 100%;
}
.coatOfArms {
  max-width: 100px;
  min-width: 150px;
}
.country-details {
  text-align: left;
  min-width: 400px;
  max-width: 650px;
  margin: 0 0 0 auto;
  width: 100%;
  padding-left: 40px;
}
.listInfoCountry {
  display: flex;
}
.country-details ul {
  list-style: none;
  text-align: left;
  line-height: 32px;
  padding-left: 0;
  margin: 0 auto 0 0;
}
.country-details ul:last-child {
  margin: 0 0 0 auto;
}
li span {
  font-weight: 600;
}
.languages, .languages span {
  font-weight: 400;
}
.borders {
  display: flex;
  padding-top: 50px;
}
.borderTitle {
  font-weight: 600;
  padding-right: 5px;
}
.bordersWrapper {
  display: flex;
  flex-wrap: wrap;
  padding-top: 16px;
}
.borderList {
  padding-bottom: 10px;
}
.borderLink {
  margin: 0 5px;
  min-width: 100px;
  width: inherit;
  padding: 0;
  display: table;
  align-self: center;
  padding: 2px 5px;
}
.borderLink:hover{
  background: #63c963
}
.notFoundedResults {
  font-weight: 600;
  margin: 16px 0;
}
.currenciesTitle {
  font-weight: 600;
  padding-right: 5px;
}
.currencies {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.currencyElement {
    margin: 16px 0;
}
.currencySymbol {
    font-weight: 600;
    font-size: larger;
}
</style>