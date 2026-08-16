const lang = document.documentElement.lang.startsWith("ja") ? "ja" : "en";

const text = {
    en: {
        sold: "Sold Out",
        featured: "Featured",
        details: "View Details",
        year: "Year",
        mileage: "Mileage",
        fuel: "Fuel",
        transmission: "Transmission"
    },
    ja: {
        sold: "販売済み",
        featured: "おすすめ",
        details: "詳細を見る",
        year: "年式",
        mileage: "走行距離",
        fuel: "燃料",
        transmission: "ミッション"
    }
};

const t = text[lang];

const vehicles = [

  {
    id: 1,
    name: "Daihatsu Move",
    category: "car",
    year: 2012,
    price: "¥150,000",
    mileage: "65,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    image: "images/sell/Daihatsu Move.jpg",
    sold:true
  },
  {
    id: 2,
    name: "Honda N-BOX Custom",
    category: "car",
    year: 2014,
    price: "¥280,000",
    mileage: "60,000 km",
    fuel: "Petrol",
    transmission: "Auto",
    image: "images/sell/Honda N-BOX Custom.jpg"
  },
  {
    id: 3,
    name: "Honda Odyssey",
    category: "car",
    year: 2013,
    price: "¥220,000",
    mileage: "120,000 km",
    fuel: "Diesel",
    transmission: "Auto",
    image: "images/sell/Honda Odyssey.jpg",
    sold:true
  },
  {
    id: 4,
    name: "Mazda3 Fastback",
    category: "car",
    year: 2016,
    price: "¥600,000",
    mileage: "95000 Km",
    fuel: "Diesel",
    transmission: "Auto",
    image: "images/sell/Mazda3 Fastback.jpg",
    sold:true
  }
];

const vehicleGrid = document.getElementById("vehicleGrid");

if (vehicleGrid) {

    vehicles.forEach((vehicle, index) => {

        vehicleGrid.innerHTML += `
            <div class="vehicle-card"
                 data-category="${vehicle.category}"
                 data-aos="fade-up"
                 data-aos-delay="${index * 100}">

                <div class="vehicle-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                    <span class="vehicle-badge">${t.featured}</span>
                    ${vehicle.sold ? `<span class="sold-out">${t.sold}</span>` : ''}
                </div>

                <div class="vehicle-content">

                    <h3>${vehicle.name}</h3>

                    <div class="vehicle-info">
                        <span>📅 ${vehicle.year}</span>
                        <span>💰 ${vehicle.price}</span>
                    </div>

                    ${vehicle.sold
                        ? `<button class="details-btn sold-btn" disabled>${t.sold}</button>`
                        : `<a href="${lang === 'ja'
                            ? `vehicle-details.html?id=${vehicle.id}`
                            : `vehicle-details-en.html?id=${vehicle.id}`}"
                            class="details-btn">
                            ${t.details} →
                        </a>`
                    }

                </div>

            </div>
        `;

    });

    // Cards add karapu passe animation refresh karanawa
    AOS.refresh();

}
const details = document.getElementById("vehicleDetails");

if (details) {

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const vehicle = vehicles.find(v => v.id === id);

    if (vehicle) {

        details.innerHTML = `
    <div class="details-image">
        <img src="${vehicle.image}" alt="${vehicle.name}">
    </div>

    <div class="details-info">
        <h1>${vehicle.name}</h1>

        <h2>Price : ${vehicle.price}</h2>

<p><strong>${t.year} :</strong> ${vehicle.year}</p>

<p><strong>${t.mileage} :</strong> ${vehicle.mileage}</p>

<p><strong>${t.fuel} :</strong> ${vehicle.fuel}</p>

<p><strong>${t.transmission} :</strong> ${vehicle.transmission}</p>

<br>

<a href="${lang === 'ja' ? 'contact.html' : 'contact-en.html'}" class="contact-btn">
    ${lang === 'ja' ? 'お問い合わせ' : 'Contact Us'}
</a>
    </div>
`;
    }

}
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const vehicle = vehicles.find(v => v.id === id);
const related = document.getElementById("relatedVehicles");
console.log(related, vehicle);

if (related && vehicle) {

    vehicles
        .filter(v => v.id !== vehicle.id)
        .slice(0,3)
        .forEach(v => {

            related.innerHTML += `
                <div class="vehicle-card">
                    <img src="${v.image}" alt="${v.name}">
                    <h3>${v.name}</h3>
                    <p>${v.price}</p>
                    <a href="vehicle-details.html?id=${v.id}">
                        View Details
                    </a>
                </div>
            `;

        });

}
const searchBox = document.querySelector(".search-box");

if (searchBox) {
    searchBox.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();
        const cards = document.querySelectorAll(".vehicle-card");

        cards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(keyword)) {
                card.style.removeProperty("display");
            } else {
                card.style.display = "none";
            }

        });

    });
}
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const category = button.dataset.category;

        document.querySelectorAll(".vehicle-card").forEach(card => {

            if (category === "all" || card.dataset.category === category) {

                card.style.removeProperty("display");

            } else {

                card.style.display = "none";

            }

        });

    });

});


const truckGrid = document.getElementById("truckGrid");

if (truckGrid) {

    trucks.forEach(item => {

        truckGrid.innerHTML += `
            <div class="vehicle-card" data-category="${item.category}">

                <img src="${item.image}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>Year : ${item.year}</p>

                <p>Price : ${item.price}</p>

                <a href="#">View Details</a>

            </div>
        `;

    });

}



const truckButtons = document.querySelectorAll(".filter-btn");

truckButtons.forEach(button => {

    button.addEventListener("click", () => {

        truckButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const category = button.dataset.category;

        document.querySelectorAll("#truckGrid .vehicle-card").forEach(card => {

            if (category === "all" || card.dataset.category === category) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});
const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

//sakura


const petals = document.querySelectorAll(".petal");

const flowers = [
    "images/spring/sakura1.svg",
    "images/spring/sakura2.svg",
    "images/spring/sakura3.svg",
    "images/spring/sakura4.svg"
];

petals.forEach(petal => {

    // Random flower
    petal.style.backgroundImage =
        `url(${flowers[Math.floor(Math.random() * flowers.length)]})`;

    // Random position
    petal.style.left = (Math.random() * 100) + "%";

    // Random size
    const size = 14 + Math.random() * 26;
    petal.style.width = size + "px";
    petal.style.height = size + "px";

    // Random speed
    petal.style.animationDuration =
        (10 + Math.random() * 8) + "s";

    // Random delay
    petal.style.animationDelay =
        (Math.random() * 8) + "s";

    // Random opacity
    petal.style.opacity =
        0.5 + Math.random() * 0.5;

    // Random rotation start
    petal.style.rotate =
        Math.random() * 360 + "deg";

    // Random depth
    petal.style.zIndex =
        Math.floor(Math.random() * 5) + 1;

    // Random blur
    petal.style.filter =
        `blur(${Math.random()*1.5}px)`;

    petal.style.animationTimingFunction="ease-in-out";

});
setInterval(()=>{

    document.querySelectorAll(".petal").forEach(petal=>{

        const x=(Math.random()*80)-40;

        petal.animate([
            {
                transform:`translateX(0px)`
            },
            {
                transform:`translateX(${x}px)`
            },
            {
                transform:`translateX(0px)`
            }

        ],{

            duration:3000+Math.random()*2000,
            easing:"ease-in-out"

        });

    });

},8000);

/* ===========================
   HERO PARALLAX
=========================== */

const hero = document.getElementById("hero");

if (hero) {

    hero.addEventListener("mousemove", (e) => {

        const rect = hero.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;

        hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;

    });

    hero.addEventListener("mouseleave", () => {

        hero.style.backgroundPosition = "center";

    });

}
/* ===========================
   SUMMER PARTICLES
=========================== */

const summerParticles = document.querySelectorAll(".summer-particle");

summerParticles.forEach((particle) => {

    particle.style.left = Math.random() * 100 + "%";

    const size = Math.random() * 5 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.animationDuration =
        (Math.random() * 10 + 8) + "s";

    particle.style.animationDelay =
        (Math.random() * 8) + "s";

    particle.style.opacity =
    Math.random() * 0.25 + 0.15;

});
/* ===========================
   SUMMER ORBS
=========================== */

const summerOrbs = document.querySelectorAll(".summer-orb");

const orbImages = [
    "images/summer/sun1.svg",
    "images/summer/sun2.svg",
    "images/summer/sun3.svg",
    "images/summer/sun4.svg"
];

summerOrbs.forEach((orb) => {

    // Random SVG
    orb.style.backgroundImage =
        `url(${orbImages[Math.floor(Math.random() * orbImages.length)]})`;

    // Random horizontal position
    orb.style.left = Math.random() * 100 + "%";

    // Random size
    const size = Math.random() * 60 + 40;

    orb.style.width = size + "px";
    orb.style.height = size + "px";

    // Random animation speed
    orb.style.animationDuration =
        (Math.random() * 12 + 10) + "s";

    // Random delay
    orb.style.animationDelay =
        (Math.random() * 12) + "s";

    // Random opacity
    orb.style.opacity =
        Math.random() * 0.35 + 0.15;

});
/* ===========================
   SEASON MANAGER
=========================== */

const month = new Date().getMonth() + 1;

const sakuraContainer = document.querySelector(".sakura-container");
const summerContainer = document.querySelector(".summer-container");
const autumnContainer = document.querySelector(".autumn-container");
const winterContainer = document.querySelector(".winter-container");

if (sakuraContainer) sakuraContainer.style.display = "none";
if (summerContainer) summerContainer.style.display = "none";
if (autumnContainer) autumnContainer.style.display = "none";
if (winterContainer) winterContainer.style.display = "none";

// Spring
if (month >= 3 && month <= 5) {
    if (sakuraContainer) sakuraContainer.style.display = "block";
}

// Summer
else if (month >= 6 && month <= 8) {
    if (summerContainer) summerContainer.style.display = "block";
}

// Autumn
else if (month >= 9 && month <= 11) {
    if (autumnContainer) autumnContainer.style.display = "block";
}

// Winter
else {
    if (winterContainer) winterContainer.style.display = "block";
}

// Winter (December–February)
// later...

/* ===========================
   AUTUMN LEAVES
=========================== */

const autumnLeaves = document.querySelectorAll(".autumn-leaf");

const autumnImages = [
    "images/autumn/momiji1.svg",
    "images/autumn/momiji2.svg",
    "images/autumn/momiji3.svg",
    "images/autumn/momiji4.svg"
];

autumnLeaves.forEach((leaf) => {

    // Random SVG
    leaf.style.backgroundImage =
        `url(${autumnImages[Math.floor(Math.random() * autumnImages.length)]})`;

    // Random position
    leaf.style.left = Math.random() * 100 + "%";

    // Random size
    const size = Math.random() * 24 + 28;

    leaf.style.width = size + "px";
    leaf.style.height = size + "px";

    // Animation duration
    leaf.style.animationDuration =
        (Math.random() * 8 + 10) + "s";

    // Animation delay
    leaf.style.animationDelay =
        (Math.random() * 10) + "s";

    // Random opacity
    leaf.style.opacity =
        Math.random() * 0.3 + 0.6;

});
/* ===========================
   AUTUMN WIND
=========================== */

setInterval(() => {

    document.querySelectorAll(".autumn-leaf").forEach(leaf => {

        const x = (Math.random() * 120) - 60;

        leaf.animate(
            [
                { transform: "translateX(0px)" },
                { transform: `translateX(${x}px)` },
                { transform: "translateX(0px)" }
            ],
            {
                duration: 3500 + Math.random() * 2500,
                easing: "ease-in-out"
            }
        );

    });

}, 7000);

/* ===========================
   WINTER SNOW
=========================== */

const snowflakes = document.querySelectorAll(".snowflake");

const snowImages = [
    "images/winter/snow1.svg",
    "images/winter/snow2.svg",
    "images/winter/snow3.svg",
    "images/winter/snow4.svg"
];

snowflakes.forEach((flake) => {

    // Random snowflake image
    flake.style.backgroundImage =
        `url(${snowImages[Math.floor(Math.random() * snowImages.length)]})`;

    // Random position
    flake.style.left = Math.random() * 100 + "%";

    // Random size
    const size = Math.random() * 18 + 12;

    flake.style.width = size + "px";
    flake.style.height = size + "px";

    // Random animation speed
    flake.style.animationDuration =
        (Math.random() * 8 + 8) + "s";

    // Random delay
    flake.style.animationDelay =
        (Math.random() * 10) + "s";

    // Random opacity
    flake.style.opacity =
        Math.random() * 0.5 + 0.4;

});


/* ===========================
   CONTACT FORM
=========================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        e.preventDefault();

        const submitBtn =
            this.querySelector('button[type="submit"]');

        const isEnglish =
            window.location.pathname.includes("-en");

        submitBtn.textContent =
            isEnglish ? "Sending..." : "送信中...";

        submitBtn.disabled = true;


        /* ===========================
           SEND MAIN CONTACT EMAIL
        =========================== */

        const photoUrls = contactForm.photo_url.value
    .split("\n")
    .filter(url => url.trim() !== "");

const emailData = {
    user_name: contactForm.user_name.value,
    user_email: contactForm.user_email.value,
    user_phone: contactForm.user_phone.value,
    vehicle: contactForm.vehicle.value,
    message: contactForm.message.value,

    photo_1: photoUrls[0] || "",
    photo_2: photoUrls[1] || "",
    photo_3: photoUrls[2] || "",
    photo_4: photoUrls[3] || "",
    photo_5: photoUrls[4] || ""
};

emailjs.send(
    "service_7mqw5c9",
    "template_48k09zv",
    emailData
)

        .then(() => {

            /* ===========================
               SEND SIMPLE NOTIFICATION
            =========================== */

            return emailjs.send(
                "service_7mqw5c9",
                "template_x2cab0l",
                {
                    user_name: contactForm.user_name.value,
                    user_email: contactForm.user_email.value
                }
            );

        })

        .then(() => {

            /* ===========================
               RESET FORM
            =========================== */

            contactForm.reset();


            /* Clear photo preview */

            const photoPreview =
                document.getElementById("photoPreview");

            if (photoPreview) {
                photoPreview.innerHTML = "";
            }


            /* Clear photo URL */

            const photoUrl =
                document.getElementById("photoUrl");

            if (photoUrl) {
                photoUrl.value = "";
            }


            /* Clear upload status */

            const uploadStatus =
                document.getElementById("uploadStatus");

            if (uploadStatus) {
                uploadStatus.textContent = "";
            }


            /* Show success message */

            const successMessage =
                document.getElementById("success-message");

            if (successMessage) {
                successMessage.style.display = "block";
            }


            /* Reset button */

            submitBtn.disabled = false;

            submitBtn.textContent =
                isEnglish ? "Send" : "送信する";

        })

        .catch((error) => {

            console.error(
                "EmailJS Error:",
                error
            );

            submitBtn.disabled = false;

            submitBtn.textContent =
                isEnglish ? "Send" : "送信する";

            alert(
                isEnglish
                    ? "Failed to send. Please try again."
                    : "送信に失敗しました。もう一度お試しください。"
            );

        });

    });

}