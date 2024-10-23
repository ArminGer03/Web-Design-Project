console.log("hello");
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById("theme-switch");
console.log(themeSwitch);

function setDarkmoode() {
    console.log("dark");
    document.body.classList.remove("lightmode");
    localStorage.setItem('darkmode', 'active');
}

function setLightmode() {
    console.log("light");
    document.body.classList.add("lightmode");
    localStorage.setItem('darkmode', null);
}

if (darkmode === 'active') { setDarkmoode() };

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active' ? setDarkmoode() : setLightmode();
});