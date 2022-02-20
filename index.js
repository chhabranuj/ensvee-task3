starRating = ["fiveStar", "fourStar", "threeStar", "twoStar", "oneStar"]
shoeRating = ["fiveStarRating", "fourStarRating", "threeStarRating", "twoStarRating", "oneStarRating"]
sortBy = ["price", "delivery", "starRating", "name"]

sortSelector = 4
sortTick = "Sort by &nbsp"
sortId = ""

function onPageLoad() {
    for(i=0; i< starRating.length; i++) {
        document.getElementById(starRating[i]).style.display = "none";
    }
    document.getElementById("all").style.display = "block";

    for(i=0; i< sortBy.length; i++) {
        document.getElementById(sortBy[i]).style.display = "none";
    }

    count = 0
    for (i=0; i<shoeRating.length; i++) {
        let elementList = document.getElementsByClassName(shoeRating[i]);
        for(j=0; j<elementList.length; j++) {
            count++
        }
    }
    document.getElementById("totalProducts").innerHTML = count;
}

function rating(btnText, className) {
    document.getElementById("filterRating").innerHTML = btnText;

    for(i=0; i< shoeRating.length; i++) {
        document.getElementById("all").style.display = "none";
        if(className == shoeRating[i]) {
            document.getElementById(starRating[i]).style.display = "block";
        }
        else {
            document.getElementById(starRating[i]).style.display = "none";
        }
    }

    count = 0

    for (i=0; i<shoeRating.length; i++) {
        if(shoeRating[i] == className){
            let visibleElementList = document.getElementsByClassName(shoeRating[i]);
            for(j=0; j<visibleElementList.length; j++) {
                visibleElementList[j].style.display = "flex"
                count++
            }
            continue
        }
        let elementList = document.getElementsByClassName(shoeRating[i]);
        for(j=0; j<elementList.length; j++) {
            elementList[j].style.display = "none"
        }
    }

    if(className == '') {
        document.getElementById("all").style.display = "block";
        for (i=0; i<shoeRating.length; i++) {
            document.getElementById(starRating[i]).style.display = "none";
            let elementList = document.getElementsByClassName(shoeRating[i]);
            for(j=0; j<elementList.length; j++) {
                elementList[j].style.display = "flex"
                count++
            }
        }
    }
    document.getElementById("totalProducts").innerHTML = count;

    sort(sortSelector, sortTick)
}

function sort(btnCount, btnTick, btnId) {
    sortSelector = btnCount
    sortTick = btnTick
    sortId = btnId

    document.getElementById("sortRating").innerHTML = btnTick
    for(i=0; i<sortBy.length; i++) {
        if(sortBy[i] == btnId) {
            document.getElementById(sortBy[i]).style.display = "block"
        }
        else {
            document.getElementById(sortBy[i]).style.display = "none"
        }
    }

    const shoeParentList = document.getElementsByClassName("shoeData")
    const visibleShoeParentList = []

    for(y=0; y<shoeParentList.length; y++) {
        if(window.getComputedStyle(shoeParentList[y]).display == "flex") {
            visibleShoeParentList.push(shoeParentList[y])
        }
    }

    image = ""
    nameAndrating = ""
    price = ""
    delivery = ""

    function swapData() {
        image = visibleShoeParentList[m].children[0].outerHTML
        visibleShoeParentList[m].children[0].outerHTML = visibleShoeParentList[n].children[0].outerHTML
        visibleShoeParentList[n].children[0].outerHTML = image

        nameAndrating = visibleShoeParentList[m].children[2].outerHTML
        visibleShoeParentList[m].children[2].outerHTML = visibleShoeParentList[n].children[2].outerHTML
        visibleShoeParentList[n].children[2].outerHTML = nameAndrating

        price = visibleShoeParentList[m].children[3].innerHTML
        visibleShoeParentList[m].children[3].innerHTML = visibleShoeParentList[n].children[3].innerHTML
        visibleShoeParentList[n].children[3].innerHTML = price

        delivery = visibleShoeParentList[m].children[4].innerHTML
        visibleShoeParentList[m].children[4].innerHTML = visibleShoeParentList[n].children[4].innerHTML
        visibleShoeParentList[n].children[4].innerHTML = delivery
    }

    if(btnCount == 0) {
        for(m=0; m<visibleShoeParentList.length; m++) {
            for(n=0; n<visibleShoeParentList.length; n++) {
                if(Number.parseInt(visibleShoeParentList[m].children[3].innerHTML.split("₹ ")[1]) > Number.parseInt(visibleShoeParentList[n].children[3].innerHTML.split("₹ ")[1])) {
                    swapData()
                }
            }
        }
    }

    else if(btnCount == 1) {
        for(m=0; m<visibleShoeParentList.length; m++) {
            for(n=0; n<visibleShoeParentList.length; n++) {
                if(new Date(visibleShoeParentList[m].children[4].innerHTML.split(":- ")[1].slice(0,10)) < new Date(visibleShoeParentList[n].children[4].innerHTML.split(":- ")[1].slice(0,10))) {
                    swapData()
                }
            }
        }
    }
    
    else if(btnCount == 2) {
        for(m=0; m<visibleShoeParentList.length; m++) {
            for(n=0; n<visibleShoeParentList.length; n++) {
                if(visibleShoeParentList[m].children[2].children[1].innerHTML > visibleShoeParentList[n].children[2].children[1].innerHTML) {
                    swapData()
                }
            }
        }
    }

    else if(btnCount == 3) {
        for(m=0; m<visibleShoeParentList.length; m++) {
            for(n=0; n<visibleShoeParentList.length; n++) {
                if(visibleShoeParentList[m].children[2].children[0].innerHTML < visibleShoeParentList[n].children[2].children[0].innerHTML) {
                    swapData()
                }
            }
        }
    }
}