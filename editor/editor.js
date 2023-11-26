import DomBuilder from "./library/dombuilder.js"
document.addEventListener("DOMContentLoaded", () => {
    new DomBuilder().addComponent("drawer", document.body)
})