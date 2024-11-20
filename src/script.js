document.addEventListener("DOMContentLoaded", () => {
    //paralax effect
    const paralaxEl = document.querySelectorAll(".paralax");
    const heroSection = document.querySelector(".hero-section");

    heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();

        let xValueCursor = (e.clientX - rect.left - rect.width / 2);
        let yValueCursor = (e.clientY - rect.top - rect.height / 2);
        
        paralaxEl.forEach( (el) => {
            const speedX = el.dataset.speedx
            const speedY = el.dataset.speedy
            el.style.transform = `translate(calc(-50% + ${-xValueCursor * speedX}px), calc(-50% + ${-yValueCursor * speedY}px))`;
        });
    });

    //animation for paralax
    const bgImg = document.querySelectorAll(".bg-img")

    const bgImgObserver = new IntersectionObserver((e)=>{
        e.forEach((e)=>{
            if(e.isIntersecting){
                e.target.classList.add("show-bg-img")
            }else{
                e.target.classList.remove("show-bg-img")
            }
        })
    })

    bgImg.forEach((e)=> bgImgObserver.observe(e))

    //animation for news
    const news = document.querySelector(".news")

    const newsObserver = new IntersectionObserver((e)=>{
        e.forEach(e => {
            if(e.isIntersecting){
                e.target.classList.add("show-h1")
            }else{
                e.target.classList.remove("show-h1")
            }
        })
    })
    newsObserver.observe(news)



    //nav bar
    const navBar = document.querySelector("nav")

    document.addEventListener("scroll", () => {
        let scrollDistance = window.scrollY;

        if(scrollDistance >= 180){
            navBar.style.backgroundColor = "#000000"
        }else{
            navBar.style.backgroundColor = "transparent"
        }
    })

    //main character paralax
    const backgroundMaincharacter = document.querySelector(".paralax-main-character .background");
    window.addEventListener("scroll", () => {
        const offset = window.scrollY;
        const backgroundMovement = offset * -0.1 + 350;
    
        backgroundMaincharacter.style.backgroundPositionY = backgroundMovement + "px";
    });

    //carousel

    //declare
    const chevronLeft = document.querySelector(".carousel-nav .left")
    const chevronRight = document.querySelector(".carousel-nav .right")

    const items = document.querySelectorAll('.carousel .carousel-item');
    const indicatorItems = document.querySelectorAll('.carousel-indicator .carousel-indicator-child');

    const informationH1 = document.querySelector(".info .info-h1")
    const circles = document.querySelectorAll(".info-difficulty .circle-difficulty")
    const ex1 = document.querySelector(".info .ex1")
    const ex2 = document.querySelector(".info .ex2")

    let currentIndex = 0
    const length = items.length
    const information = [
        {
            title : "The Midnight Woods",
            difficulty: 4,
            ex1 : "The Crystal Forest or Midnight Woods is a biome on the West area of the land of light.",
            ex2: "It is filled with various green regenerative Hard Light Crystals. The crystals seem infectious, as the inhabitors of the forest can become encased in them.Various Crystal Beasts seem to be the outcome of being infected by these crystals."
        },
        {
            title : "The Divine Path",
            difficulty: 2,
            ex1 : "The Mountains, also called Divine Path, the North and the Crystal Cliffs, are the northern area of the land of light.",
            ex2: "The Mountains are a collection of snowy mountaintops, abandoned structures, and underground cave systems. The area is inhabited by the Bird People, a tribe of Vultures. The Vultures, Vulture Acolytes, and Vulture Shamans are enemies exclusive to this area."
        },
        {
            title : "The Eastern Watershelf",
            difficulty: 3,
            ex1 : "The Eastern Watershelf or lake is a biome on the East area of the land of light.",
            ex2: "The Lake requires hopping between various decayed platforms, and the player is primarily dependent on moving platforms with large safe areas in between. Along with the moving platforms, the player goes underground to skip between areas."
        },
        {
            title : "The Barren Hills",
            difficulty: 5,
            ex1 : "The Barren Hills or simply Wastes is the South region of the land of light.",
            ex2: "The Barren Hills is home to a large underground laboratory complex that also serves as a robot factory and is responsible for the creation of various creatures seen around the world such as the Dirks and blue-skins."
        }
    ]

    //brain of carousel
    function updateCarousel(index){
        items.forEach((item, i) =>{
            item.classList.remove('carousel-active');
            if (i === index) {
                item.classList.add('carousel-active');
            }
        })

        indicatorItems.forEach((item, i)=>{
            item.classList.remove("carousel-indicator-active")
            if (i == index){
                item.classList.add("carousel-indicator-active")
            }
            console.log(item, i)
        })

        informationH1.textContent = information[index].title
        ex1.textContent = information[index].ex1
        ex2.textContent = information[index].ex2

        circles.forEach((circle, i) =>{
            circle.classList.remove("circle-active")
            if(i < information[index].difficulty){
                circle.classList.add("circle-active")
            }
        })
    }

    chevronLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + length) % length;
        updateCarousel(currentIndex);
    });

    chevronRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % length;
        updateCarousel(currentIndex);
    });

    indicatorItems.forEach((item, i)=>{
        item.addEventListener("click", ()=>{
            currentIndex = i
            updateCarousel(currentIndex)
        })
    })

    updateCarousel(currentIndex)


    //map masking
    const mapUpper = document.querySelector(".map");
    const mapUnder = document.querySelector(".map img");
    
    function updateMaskPosition(x, y) {
        const rect = mapUpper.getBoundingClientRect();
        let xValueCursor = x - rect.left;
        let yValueCursor = y - rect.top;
    
        const maskSize = 150;
        xValueCursor -= maskSize / 2;
        yValueCursor -= maskSize / 2;
    
        mapUnder.style.webkitMaskPositionX = xValueCursor + 'px';
        mapUnder.style.webkitMaskPositionY = yValueCursor + 'px';
    }
    
    mapUpper.addEventListener("mousemove", (e) => {
        updateMaskPosition(e.clientX, e.clientY);
    });
    
    mapUpper.addEventListener("touchmove", (e) => {
        e.preventDefault();
    
        const touch = e.touches[0];
        if (touch) {
            updateMaskPosition(touch.clientX, touch.clientY);
        }
    });

    mapUnder.addEventListener("mouseleave", () => {
        // Reset the mask position or perform other actions
        // Example: Hide the mask
        mapUnder.style.maskImage = 'none';
    });
    
    mapUnder.addEventListener("mouseenter", () => {
        // Show the mask again when the mouse enters
        mapUnder.style.maskImage = "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/40713/xray-machine.png')";
    });



// Create a new AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.getElementById('soundtrack');
const track = audioContext.createMediaElementSource(audioElement);
const analyser = audioContext.createAnalyser();

analyser.fftSize = 256; // Smaller FFT size for more bars
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

track.connect(analyser);
analyser.connect(audioContext.destination);

const canvas = document.getElementById('waveformCanvas');
const canvasCtx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const maxBarHeight = canvas.height / 2 - 5; // Maximum bar height with a 5px margin from the top and bottom
const barWidth = 2; // Set the bar width to be thinner
const gap = 5; // Set the gap between bars

function drawBars() {
    requestAnimationFrame(drawBars);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 255 * maxBarHeight;
        
        // Draw the top bar
        canvasCtx.fillStyle = 'rgba(255, 0, 0, 1)'; // Bright red for the top bar
        canvasCtx.fillRect(x, canvas.height / 2 - barHeight, barWidth, barHeight);
        
        // Draw the mirrored bottom bar
        canvasCtx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Darker red for the mirrored bar
        canvasCtx.fillRect(x, canvas.height / 2, barWidth, barHeight);

        x += barWidth + gap; // Increase x by barWidth + gap to create space between bars
    }
}

drawBars();
});
