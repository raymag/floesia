

applyDefaultTheme();
const darkmodeToggler = document.querySelectorAll(".darkmode-toggler");
darkmodeToggler.forEach(el => el.addEventListener('click', () => {
    toggleMode();
}));
function applyDefaultTheme(){
    const darkmode = localStorage.getItem("dk");
    if (darkmode) {
        applyDarkMode();
    } else {
        applyLightMode();
    }
}

function applyDarkMode(){
    document.body.classList.add("darkmode");
    $('#like').addClass('btn-dark');
}

function applyLightMode(){
    document.body.classList.remove("darkmode");
    $('#like').removeClass('btn-dark');
}

function toggleMode(){
    const darkmode = localStorage.getItem("dk");
    if (darkmode) {
        localStorage.removeItem("dk");
        applyLightMode();
    } else {
        localStorage.setItem("dk", true);
        applyDarkMode();
    }
}