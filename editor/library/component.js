export default class Component {
    constructor(html, css, js) {
        this.html = html
        this.css = css
        this.js = js
    }
    get style() {
        return this.html.style
    }

    show() {
        this.style.visibility = "visible"
        this.style.display = "block"
    }

    hide() {
        this.style.visibility = "hidden"
        this.style.display = "none"
    }
}