import DomBuilder from "./library/dombuilder.js"
document.addEventListener("DOMContentLoaded", () => {
    new DomBuilder().addComponent("drawer", document.body).then((drawer) => {
        setTimeout(() => {
            drawer.style.display = "block"
            drawer.style.visibility = "visible"
            console.log("enabling drawer")
        }, 3000)
    })
})