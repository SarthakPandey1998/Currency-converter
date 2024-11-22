// currency converter with USD base 
const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_1iuIb9duGr0lr4jet2w4WQscKeNpe0Ta6HjdphSX";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");



for (var select of dropdowns) {
    for (var code in countryList) {
        var newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = 'selected';
        }
        else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.appendChild(newOption);

        select.addEventListener("change", (event) => {
            handleFlagChange(event.target);
        })
    }
}

function handleFlagChange(element) {
    var countryCode = countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
})
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    const url = `${BASE_URL}`;
    try {
        var response = await fetch(url);
        if(!response.ok){
            throw new Error("Failed to fetch exchange rate");
        }
        var data = response.json();
        console.log(data);

        data.then((res) => {
            var rate = res.data[to.value].value;
            var exchangeRate = (amountValue * rate).toFixed(2);
            document.querySelector(".msg").innerHTML = `${amountValue} ${from.value} = ${exchangeRate} ${to.value}`;
        })
    }
    catch(err){
        document.querySelector(".msg").innerHTML = `Error fetching exchange rate.Please try again`
        console.log(err);
    }
}

window.addEventListener("load",()=>{
    updateExchangeRate();
})