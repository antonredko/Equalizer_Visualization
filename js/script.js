const bandsWrapEl = document.getElementById('bandsWrap')
const bandsCount = 50
const bandsArray = new Uint8Array(bandsCount * 2)
const startBtnEl = document.getElementById('startBtn')
const stopBtnEl = document.getElementById('stopBtn')
let context = null
let analyser = null

startBtnEl.addEventListener('click', function() {
    if(context) return

    bandsWrapEl.classList.remove('invisible')
    this.classList.add('invisible')
    stopBtnEl.classList.remove('invisible')

    for(i = 0; i < bandsCount; i++){
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
})

stopBtnEl.addEventListener('click', function() {
    location.reload()
})

function loop() {
    window.requestAnimationFrame(loop)
    analyser.getByteFrequencyData(bandsArray)

    let myElements = document.getElementsByClassName('band_item')

    for(i = 0; i < bandsCount; i++){
        let height = bandsArray[i + bandsCount]
        myElements[i].style.minHeight = height + 'px'
        myElements[i].style.opacity = 0.008 * height
    }
}