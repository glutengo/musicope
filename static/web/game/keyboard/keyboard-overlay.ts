import * as $ from 'jquery'

let oldTimeOut: number

export function display(description: string, value: any) {
    let str
    if (typeof value == "number") {
        str = Math.round(1000 * value) / 1000
    } else {
        str = value
    }

    $('.canvasInfoDesc').text(description + ": ")
    $('.canvasInfoValue').text(str)
    showOverlay()
}

export function displayMessage(message: string) {
    $('.canvasInfoDesc').text(message)
    $('.canvasInfoValue').text('')
    showOverlay();
}

function showOverlay() {
    $('.canvasInfo').show()
    clearTimeout(oldTimeOut)
    oldTimeOut = setTimeout(() => {
        $('.canvasInfo').hide()
    }, 5000)
}