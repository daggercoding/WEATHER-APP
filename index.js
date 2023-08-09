const userTab=document.querySelector("[data-user-weather]");
const searchTab=document.querySelector("[data-search-weather]"); 
const userContainer=document.querySelector(".weather-container");
const dataSearchForm = document.querySelector("[data-search-form]");
const grantContainer=document.querySelector(".grant-location-container");  
const loadingContainer=document.querySelector(".loading-container"); 
const userInfoContainer=document.querySelector(".user-info-container");
const grantAccessButton=document.querySelector("data-grant-access");

//initially variable needed
let currentTab=userTab;
const API_key="fdc1ff42c2824fabe3578b3de289bc48";
currentTab.classList.add("current-tab");


//SWITCHING TABS    
function switchTab(clickedTab){
    if(currentTab!=clickedTab)
    {
   currentTab.classList.remove("current-tab");
   currentTab=clickedTab;
   currentTab.classList.add("current-tab");
    }
  
}

userTab.addEventListener("click",()=>{
    switchTab(userTab);
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
})

