import DomBuilder from "./library/dombuilder.js"
document.addEventListener("DOMContentLoaded", () => {
    new DomBuilder().addComponent("drawer", document.body).then((drawer) => {
        setTimeout(() => {
            drawer.show()
            console.log("enabling drawer")
        }, 3000)
    })
})