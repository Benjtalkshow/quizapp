const input = document.querySelector('.entername')
const start = document.querySelector('.startbtn')

start.addEventListener('click', () => {
    var entername = input.value
    if (isNaN(entername)) {
        localStorage.setItem('count','0')
        localStorage.setItem("username", entername)
        window.open('./popup.html', '_self')
        loop()
    } else {
        alert("NAME MUST BE A TEXT")
    }

})


