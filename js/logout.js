
const logout = () => {
    if(localStorage.getItem("tk")){
        localStorage.removeItem("tk");

        localStorage.removeItem("aun");
        localStorage.removeItem("aid");
        localStorage.removeItem("aem");

        location.href="/"
    }
}