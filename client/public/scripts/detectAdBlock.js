// const orgFetch = window.fetch;
// const orgXhr = window.XMLHttpRequest;
//
// window.fetch = function (input, init) {
//     console.log(input, init)
//     return orgFetch(input, init);
// }
//
// // window.XMLHttpRequest =
//
// window.fetch.toString = function () {
//     return "function fetch() { [native code] }"
// }
//
// function detectAdBlock() {
//     fetch("https://www3.doubleclick.net/", {method: "HEAD", mode: "no-cors"}).then(() => {
//         console.log('ok')
//     }).catch(e => console.log(e.message));
//
//     console.log(fetch.toString())
//
// }
// detectAdBlock()