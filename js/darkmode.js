
window.onload = () => {
    applyDefaultTheme();

    const darkmodeToggler = document.querySelectorAll(".darkmode-toggler");
    darkmodeToggler.forEach(el => el.addEventListener('click', () => {
        toggleMode();
    }));

    function applyDefaultTheme(){
        const darkmode = localStorage.getItem("dk");
        console.log(darkmode);
        if (darkmode) {
            applyDarkMode();
        } else {
            applyLightMode();
        }
    }
    
    function applyDarkMode(){
        document.body.classList.add("darkmode");
    }
    
    function applyLightMode(){
        document.body.classList.remove("darkmode");
    }
    
    function toggleMode(){
        const darkmode = localStorage.getItem("dk");
        console.log(darkmode);
        if (darkmode) {
            localStorage.removeItem("dk");
            applyLightMode();
        } else {
            localStorage.setItem("dk", true);
            applyDarkMode();
        }
    }
}