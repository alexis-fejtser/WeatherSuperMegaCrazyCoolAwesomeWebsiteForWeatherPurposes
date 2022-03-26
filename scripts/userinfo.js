class Userinfo{
    constructor(){
        this.timeOpened = new Date();
        this.timezone = (new Date()).getTimezoneOffset()/60;
    }
    async position(){
        const pos = await new Promise(function(resolve, reject){
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return {
            lon: pos.coords.longitude,
            lat: pos.coords.latitude
        };
    }
}