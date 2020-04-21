const TOKEN_KEY = "corecovidauth";

const token = document.cookie.includes(TOKEN_KEY);
if(token === null){
    window.location.replace("/login");
}