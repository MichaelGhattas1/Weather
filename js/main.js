let days = ['Sunday', 'Monday', 'Thusday', 'Wednesday', 'Thurshday', 'Friday', 'Saturday']
let monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let response;
let dayOrNight;
let SRC;
let searchInput = document.getElementById("searchinput")

searchInput.addEventListener('keyup', async function () {

    getWeather(this.value)
})
var z = new Date;
var dayIndex = days.indexOf(days[z.getDay()])
console.log(monthes[z.getMonth()])
console.log((dayIndex += 2) % 7)
async function getWeather(location = "cairo") {
    let weather = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6af56e1306fb49a0816174810211709%20&q=${location}&days=3`)
    response = await weather.json();
    console.log(response);

    dayOrNight = response.current.is_day;
    if (dayOrNight == 0) {
        SRC = "images/weather/icons/night/113.png"
    }
    if (dayOrNight == 1) {
        SRC = "images/weather/icons/day/113.png"
    }

    await display();

}
getWeather();
function display() {
    let cartona = `
    <div class="col-md-4 col-sm-12 d-flex  flex-column c ">
        <div class="d-flex light-chess justify-content-between ">
            <h3>${days[z.getDay()]}</h3>
            <h4>${z.getDate()}${monthes[z.getMonth()]}</h4>
        </div>
        <div class="d-flex flex-column dark-chess justify-content-center ">
            <h2 class="ms-3"> ${response.location.name} </h2>
            <div class="d-flex justify-content-between align-items-center" >
                <h1 class="ms-5">${response.current.temp_c}  C </h1> 
                <img src="${SRC}" class="w-25" alt="al icon id="dayAndNight">
            </div>
            <div class="text-align-left mb-3">
                <p  class="ms-3" > ${response.current.condition.text}</p>

            </div>
            <div class="d-flex " >
                <div class="col-md-3 ms-2" > <i class="fas fa-tint"></i>  ${response.current.humidity}</div>
                <div class="col-md-3 ms-2" > <i class="fas fa-wind"></i> ${response.current.wind_kph} </div>
                <div class="col-md-3 ms-2" > <i class="fas fa-directions"></i> ${response.current.wind_dir}</p> </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-12 d-flex  flex-column gx-0 gy-0 d">
        <div class="text-center dark-chess ">
            <h3>${days[(z.getDay() + 1) % 7]}</h3>
            
        </div>
        <div class="d-flex flex-column light-chess justify-content-center align-items-center ">
            <h2 class="mb-3"> ${response.forecast.forecastday[1].day.maxtemp_c}</h2>
            <h6 class="mb-3"> ${response.forecast.forecastday[1].day.mintemp_c}</h6>
            <img src="https:${response.forecast.forecastday[1].day.condition.icon}" class="w-25 mb-3" alt="al icon">
                <p >${response.forecast.forecastday[1].day.condition.text} </p>
        </div>
    </div>
    <div class="col-md-4 col-sm-12 d-flex flex-column gx-0 gy-0 d">
        <div class="d-flex light-chess justify-content-center align-items-center">
            <h3>${days[(z.getDay() + 2) % 7]}</h3>
            
        </div>
        <div class="d-flex flex-column dark-chess justify-content-center align-items-center ">
        <h2 class="mb-3"> ${response.forecast.forecastday[2].day.maxtemp_c}</h2>
        <h6 class="mb-3"> ${response.forecast.forecastday[2].day.mintemp_c}</h6>
        <img src="https:${response.forecast.forecastday[2].day.condition.icon}" class="w-25 mb-3" alt="al icon">
            <p >${response.forecast.forecastday[2].day.condition.text} </p>
        </div>
    </div>
    `
    document.getElementById('forcast').innerHTML = cartona;
}


