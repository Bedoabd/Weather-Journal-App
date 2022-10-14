// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=ce4e52ea9cebe4fdeddff3d7b5bd98c3&units=imperial';
const apiUrl= 'https://api.openweathermap.org/data/2.5/weather?q='
/* Global Variables */
const zipCode = document.getElementById('zip');
const generateBtn = document.getElementById('generate');
const feelings = document.getElementById('feelings');
// Asynchronous function to fetch the data from the web API
let weatherData = {};
const getWeatherData = async function(url,zipCode,key){
    const res = await fetch(url+zipCode+key)
    try {
        let data = await res.json();
        weatherData = data;
    } catch (error) {
        console.log("error",error)
    }
};
// Event listeners to add function to existing HTML DOM element
generateBtn.addEventListener('click',performAction);
function performAction(){
    getWeatherData(apiUrl,zipCode.value,apiKey).then(()=>{
        postData('/postWeather', {
            date:newDate,
            temp:weatherData.main.temp,
            feed:feelings.value
        });
    }).then(()=>{
        retrieveData();
    }).then(async ()=>{
        document.querySelectorAll('#entryHolder>div').forEach((e)=>{
            e.style.display = "block"
        });
    })
    
};
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
    console.log("error", error);
    }
};
/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/getData');
    try {
    const allData = await request.json()
    // UpdateUI
    document.getElementById("date").innerHTML =allData.date;
    document.getElementById('temp').innerHTML = Math.round(allData.temp);
    document.getElementById('content').innerHTML = allData.feed;
    }
    catch(error) {
    console.log("error", error);
    }
};
