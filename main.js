const inputTextEl = document.querySelector(".search-box");
const locationEl = document.querySelector(".city");
const dateEl = document.querySelector(".date");
const tempEl = document.querySelector(".temp");
const weatherEl = document.querySelector(".weather");
const countryEl = document.querySelector('.country')
const modalEl = document.querySelector('.modal')
const errorTextEl = document.querySelector('.errorText')
const errorTitleEl = document.querySelector('.title')
const darkBackgroundEl = document.querySelector('.darkBackground')
const tempMinMaxEl = document.querySelector('.hi-low')


const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const setQuery = event => {
    if (event.keyCode == 13) {
        getData(inputTextEl.value);
      }
}

// Render error
const renderError = (e) => {
        errorTextEl.textContent = e
        modalEl.classList.remove('hidden')
        darkBackgroundEl.classList.remove('hidden')
        setTimeout(() => {
            modalEl.classList.add('hidden')
            darkBackgroundEl.classList.add('hidden')
        }, 3500)
    }

// Make a API request
const getData = async (query) => {
    try{
        const res = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        const data = await res.json()
        console.log(data)

        if(!res.ok) {
            throw new Error(data.message)
        }

        // Get the date and format it 
        let today = new Date();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);

        // Removes the hidden class
        dateEl.classList.remove('hidden')
        locationEl.classList.remove('hidden')
        tempEl.classList.remove('hidden')    
        weatherEl.classList.remove('hidden')  
        tempMinMaxEl.classList.remove('hidden')


        // Displays the stuff on the screen
        dateEl.textContent = formattedDate
        locationEl.innerHTML = `${data.name}, ${data.sys.country}`
        tempEl.textContent = Math.round(data.main.temp);
        weatherEl.textContent = data.weather[0].description
        tempMinMaxEl.textContent = `${Math.round(data.main.temp_max) + '°c'} / ${Math.round(data.main.temp_min) + '°c'}`

    }catch(error) {
        renderError(error)
    }
    
}

inputTextEl.addEventListener('keypress', setQuery);
