const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grantAcessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");
const grantAcessButton=document.querySelector("[data-grantAccess]");

let currentTab=userTab;
const API_key="fdc1ff42c2824fabe3578b3de289bc48";
currentTab.classList.add("current-tab");

sessionStorage = 
{ lon: 78.1792,
  lat: 26.2236
}

//creating a function for tab switching
function switchTab(clickedTab)
{
    if(clickedTab!==currentTab)
    {
        //iska matlab hume search tab mai jana hai 
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");
        getfromSessionStorage();
    
    if(!searchForm.classList.contains("active"))
    {
        //if search form is invisible make it visisble 
        grantAcessContainer.classList.remove("active");
        userInfoContainer.classList.remove("active");   
        searchForm.classList.add("active");
    }
    else
    {
        //pehle mai search tab pai tha ab user tab pai hu
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        // ab mujheh is tab mai user ka weather bhi display karna padega do at first lets check the local storage for the coordinates   
        getfromSessionStorage();
    }
 }
}

        
userTab.addEventListener("click",()=>{
 //passed current tab as input parameter in function
 switchTab(userTab);   
});
searchTab.addEventListener("click",()=>{
    //passed current tab as input parameter in function
    switchTab(searchTab);   
   });

function getfromSessionStorage()
{
    const loacalCoordinates=sessionStorage.getItem("user-coordinates");
    if(!loacalCoordinates)
    {
        grantAcessContainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatheInfo(coordinates);
    }
}
async function fetchUserWeatheInfo(coordinates)
{
    const{lat,lon}=coordinates;
    //make grant acess container invisible
    grantAcessContainer.classList.remove("active");
    //make loader visible 
    loadingScreen.classList.add("active");
    const response =await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
    const data = await response.json();
    //make loader invisible
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
}
async function renderWeatherInfo(weatherInfo)
{
//firstly we have to fech the elements
const cityName=document.querySelector("[data-cityName]")
const countryIcon=document.querySelector("[data-countryIcon]")
const desc =document.querySelector("[data-weatherDesc]")
const weatherIcon=document.querySelector("[data-weatherIcon]")
const temp=document.querySelector("[data-temp]")
const windSpeed=document.querySelector("[data-windSpeed]")
const humidity=document.querySelector("[data-humidity]")
const wind=document.querySelector("[data-cloudiness]")

//fetch values from the api
cityName.innerText=weatherInfo.name;
countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
desc.innerText=weatherInfo?.weather?.[0]?.description;
weatherIcon.src=`https://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}@2x.png`;
temp.innerText=`${weatherInfo?.main?.temp}°C`;
windSpeed.innerText=`${weatherInfo?.wind?.speed} m/s`;
humidity.innerText=`${weatherInfo?.main?.humidity} %`;
wind.innerText=`${weatherInfo?.clouds?.all} %`;
}

function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
       alert("Geolocation is not supported by this browser.");
    }
}
let lat="07.45";
let lon="78.45";
function showPosition(position)
{
    const userCoordinates =
   
    {
        
        lat:position.coords.latitude,
        lon:position.coords.longitude
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    //make grant acess container visible
    fetchUserWeatheInfo(userCoordinates); 
}

grantAcessButton.addEventListener("click",getLocation)

const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
e.preventDefault();
let cityName=searchInput.value;
if(cityName==="")
return;
else
{
    fetchSearchWeatheInfo(cityName);
}
})

async function fetchSearchWeatheInfo(city)
{
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAcessContainer.classList.remove("active");
    const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
    const data=await res.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
}
