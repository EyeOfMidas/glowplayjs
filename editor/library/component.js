export default class Component {
    constructor(type, html, css, js) {
        this.type = type
        let uuid = crypto.randomUUID()
        this.html = html

        this.html.id = `${type}-${uuid}`
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