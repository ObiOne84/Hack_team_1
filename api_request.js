import axios from "axios";



const fetchCountryBtn = document.getElementById('fetch-country-btn')


// Async function that fetching country information from rest-countries API

async function fetchCountryData(name='ireland') {
    const url =`https://restcountries.com/v3.1/name/${name}`

    try {
        const {data} = await axios(url)
        console.log(data)
    } catch (error) {

        print(error)
        
    }

}


fetchCountryBtn.addEventListener('click', fetchCountryData('ireland'))

