// let Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json" ;

let selectors = document.querySelectorAll(".dropdowns select");
let resButton = document.querySelector("#resBtn");
let amount = document.querySelector(".amount input");

let fromCurr = document.querySelector("#selector1");
let toCurr = document.querySelector("#selector2");

let resultMsg = document.querySelector(".msg");





let updateFlag = (evtTarget)=> {
    let currCode = evtTarget.value ;
    let countryCode = countryList[currCode];
    let newImageSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let parent = evtTarget.parentElement ;
    // console.log(parent);
    let newImg = parent.querySelector("img");
    newImg.src = newImageSrc ;
}

selectors.forEach((select)=> {
    for(currCode in countryList) {
        // console.log(currCode, countryList[currCode]);

        let newOption = document.createElement("option");
        newOption.textContent = currCode;
        newOption.value = currCode;
        select.appendChild(newOption);

        // default selected
        if(select.id==="selector1" && currCode==="USD") {
            newOption.selected = "selected";
        }
        if(select.id==="selector2" && currCode==="BDT") {
            newOption.selected = "selected";
        }
    }

    select.addEventListener("change", (event)=> {
        // console.log(event.target);
        updateFlag(event.target);
    });
});



let calCurrency = async (amountVal) => {
    let frm = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();

    let Base_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${frm}.json`;
    
    let response = await fetch(Base_URL) ;
    let data = await response.json() ;

    let userCurr = data[frm] ;
    let targetCurrRate ;
    
    for(curr in userCurr) {
        if(curr===to) {
            // console.log(curr, userCurr[curr]);
            targetCurrRate = userCurr[curr];
            break;
        }
    }
    let finalAmount = amountVal*targetCurrRate ; 

    resultMsg.textContent = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


// button starts here
resButton.addEventListener("click", (event)=> {
    event.preventDefault();

    if(amount.value==="" || parseFloat(amount.value)<=0) {
        amount.value = 1 ;
    }
    let amountVal = parseFloat(amount.value) ;

    calCurrency(amountVal);
});