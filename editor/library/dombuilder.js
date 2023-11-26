export default class DomBuilder {
    constructor() {
        this.cacheBusting = `?t=${new Date().getTime()}`
        this.domParser = new DOMParser()
        this.path = ""
    }
    async loadText(targetFile) {
        let response = await fetch(`${this.path}/${targetFile}${this.cacheBusting}`)
        return response.text()
    }

    async addComponent(targetComponent, parentComponent) {
        let componentPath = `library/components/${targetComponent}/${targetComponent}.html`
        let component = await this.getHtml(componentPath)

        let componentCssPath = `library/components/${targetComponent}/${targetComponent}.css`
        let css = await this.getCss(componentCssPath)

        let componentJsPath = `library/components/${targetComponent}/${targetComponent}.js`
        let js = await this.getJs(componentJsPath)

        component.appendChild(css)

        parentComponent.appendChild(component)

        component.appendChild(js)
        return component
    }

    async getHtml(targetFile) {
        let text = await this.loadText(targetFile)
        return this.domParser.parseFromString(text, 'text/html').body.firstChild
    }

    async getCss(targetFile) {
        let text = await this.loadText(targetFile)
        let style = document.createElement("style")
        style.innerText = text
        return style
    }

    async getJs(targetFile) {
        let text = await this.loadText(targetFile)
        let script = document.createElement("script")
        script.type = "module"
        script.innerText = text
        return script
    }
}