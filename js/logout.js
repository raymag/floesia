
const logout = () => {
    if(localStorage.getItem("tk")){
        localStorage.removeItem("tk");
        location.href="/"
    }
}