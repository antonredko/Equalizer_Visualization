const bandsWrapEl = document.getElementById('bandsWrap')
const BANDS = 50
const ARR = new Uint8Array(BANDS * 2)
const startBtnEl = document.getElementById('startBtn')
const stopBtnEl = document.getElementById('stopBtn')
let context = null
let analyser = null

startBtnEl.addEventListener('click', function() {
    if(context) return

    bandsWrapEl.classList.remove('invisible')
    this.classList.add('invisible')
    stopBtnEl.classList.remove('invisible')

    for(i = 0; i < BANDS; i++){
        let bandItem = document.createElement('div')
        bandItem.classList.add('band_item')
        bandsWrapEl.insertAdjacentElement('afterBegin', bandItem)
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

    stopBtnEl.addEventListener('click', function() {
        bandsWrapEl.classList.add('invisible')
        this.classList.add('invisible')
        startBtnEl.classList.remove('invisible')
    })
})

function loop() {
    window.requestAnimationFrame(loop)
    analyser.getByteFrequencyData(ARR)

    let myElements = document.getElementsByClassName('band_item')

    for(i = 0; i < BANDS; i++){
        let height = ARR[i + BANDS]
        myElements[i].style.minHeight = height + 'px'
        myElements[i].style.opacity = 0.008 * height
    }
}