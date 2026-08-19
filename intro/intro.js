document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("cdl-intro");

    if (!intro) return;


    // =========================
    // NEW YEAR PERIOD CHECK
    // December 25 - January 2
    // =========================

    const introDate = new Date();

    const introMonth = introDate.getMonth() + 1;
    const introDay = introDate.getDate();

    const isNewYearPeriod =
        (introMonth === 12 && introDay >= 25) ||
        (introMonth === 1 && introDay <= 2);


    // =========================
    // DISABLE INTRO DURING
    // NEW YEAR PERIOD
    // =========================

    if (isNewYearPeriod) {

        intro.remove();

        return;
    }


    // =========================
    // SHOW INTRO ONCE PER DAY
    // =========================

    const today =
        new Date().toISOString().split("T")[0];

    const introShownDate =
        localStorage.getItem("cdlIntroShownDate");


    // Already shown today
    if (introShownDate === today) {

        intro.remove();

        return;
    }


    // Mark as shown for today
    localStorage.setItem(
        "cdlIntroShownDate",
        today
    );


    // =========================
    // LANGUAGE DETECTION
    // =========================

    const isEnglish =
        document.documentElement.lang === "en" ||
        window.location.pathname.includes("index-en");


    const introTitle = isEnglish
        ? "CDL LLC"
        : "合同会社CDL";


    const introSubtitle = isEnglish
        ? "USED CAR & EXPORT"
        : "中古車・輸出";


    const enterText = isEnglish
        ? "ENTER CDL JAPAN"
        : "合同会社CDLへ進む";


    // =========================
    // INTRO HTML
    // =========================

    intro.innerHTML = `

        <div class="cdl-intro-screen">

            <div class="cdl-car-light"></div>


            <div class="cdl-intro-logo">

                <img
                    src="images/logo.jpg"
                    alt="CDL JAPAN"
                >

            </div>


            <div class="cdl-intro-text">

                <span>${introTitle}</span>

                <small>${introSubtitle}</small>

            </div>


            <button
                type="button"
                class="cdl-enter-btn"
            >

                ${enterText}

            </button>

        </div>

    `;


    // =========================
    // INTRO SOUND
    // =========================

    const introSound = new Audio(
        "./intro/assets/cdl_intro_cinematic_original.wav"
    );


    introSound.volume = 0.35;

    introSound.preload = "auto";


    // =========================
    // ENTER BUTTON
    // =========================

    const enterButton =
        intro.querySelector(".cdl-enter-btn");


    // =========================
    // NORMAL INTRO
    // =========================

    enterButton.addEventListener(
        "click",
        () => {


            // =========================
            // START SOUND
            // =========================

            introSound.currentTime = 0;

            introSound.play().catch(error => {

                console.log(
                    "Audio could not play:",
                    error
                );

            });


            // =========================
            // HIDE ENTER BUTTON
            // =========================

            enterButton.classList.add(
                "clicked"
            );


            // =========================
            // START ANIMATION
            // =========================

            intro.classList.add(
                "started"
            );


            // =========================
            // HIDE INTRO
            // =========================

            setTimeout(() => {

                intro.classList.add(
                    "hide"
                );

            }, 3200);


            // =========================
            // REMOVE INTRO
            // =========================

            setTimeout(() => {

                introSound.pause();

                introSound.currentTime = 0;

                intro.remove();

            }, 4500);

        }
    );

});