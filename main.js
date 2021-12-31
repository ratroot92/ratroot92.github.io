// Make sure services workers are supported 
if ('serviceWorker' in navigator) {
    console.log("Service Worker supported.")
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw_cached_site.js').then((reg) => {

            // navigator.serviceWorker.register('./sw_cached_pages.js').then((reg) => {
            console.log("Service Worker Registered Successfully");
            console.log(" ==> reg.active.scriptUrl", reg.active.scriptURL);
            console.log(" ==> reg.active.state", reg.active.state);
            console.log(" ==> reg.scope", reg.scope);


        }).catch(err => {
            console.log(`Error while registering ${err.message}`)
        })
    })
}