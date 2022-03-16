const BODY = document.body
const BANDS = 50
const ARR = new Uint8Array(BANDS * 2)
const startBtnEl = document.getElementById('startBtn')
let context = null
let analyser = null

startBtnEl.addEventListener('click', () => {
    if(context) return

    startBtnEl.remove()

    for(i = 0; i < BANDS; i++){
        let logo = document.createElement('div')
        logo.className = 'logo'
        BODY.insertAdjacentElement('afterBegin', logo)
    }
    
    context = new AudioContext()
    analyser = context.createAnalyser()

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        let src = context.createMediaStreamSource(stream)
        src.connect(analyser)
        loop()
    }).catch(error => {
        alert(error + '\r\n Отклонено. Страница будет обновлена!')
        location.reload()
    })
})

function loop() {
    window.requestAnimationFrame(loop)
    analyser.getByteFrequencyData(ARR)

    let myElements = document.getElementsByClassName('logo')

    for(i = 0; i < BANDS; i++){
        let height = ARR[i + BANDS]
        myElements[i].style.minHeight = height + 'px'
        myElements[i].style.opacity = 0.008 * height
    }
}
