function progressBarAnimate(){
    let percentage = 10
    setInterval(() => {
        percentage = (percentage + 1) % 100
        if(percentage === 0) percentage = 10
        const progBar = document.querySelector('#prog-bar')
        progBar.style.width = `${percentage}%`
        progBar.textContent = `${percentage}%`
    }, 1000)
}

function toHome(){
    window.scrollTo(0, 0)
}


window.onload = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    const toastLiveExample = document.getElementById('liveToast')

    progressBarAnimate()

    setTimeout(() => {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    }, 5000)
}