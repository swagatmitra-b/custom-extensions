let time = document.querySelector('input');
let div = document.querySelector('.text');
let button = document.querySelector('button');
let alarm = document.querySelector('audio');

let target; 

const timer = function () {
    button.addEventListener('click', () => {
        let today = new Date(); 
        target = time.value.split(":");
        if (target.length == 1) return; 
        
        let targetTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), target[0], target[1]);
        
        function count() {
            let now = new Date()
            let inSeconds = (targetTime - now) / 1000
            console.log(inSeconds.toFixed(0))
            
            if (inSeconds < 0) {
                clearInterval(go);
                alarm.play();
                div.innerHTML = `<button style="">Snooze</button>
                                 <button style="">Dismiss</button>`
                const buttons = div.querySelectorAll('button'); 
                const snooze = buttons[0];
                const dismiss = buttons[1];
                snooze.addEventListener('click', () => {
                    alarm.pause()
                    setTimeout(() => {
                        alarm.play()
                    }, 10000)
                })

                dismiss.addEventListener('click', () => {
                    alarm.pause()
                    alarm.currentTime = 0;
                    div.innerHTML = ''
                })
            }
        }
        
        const go = setInterval(count, 1000);

        const seconds = (targetTime - today) / 1000;
        const hoursLeft = Math.floor(seconds / 3600) % 24;
        const minutesLeft = Math.floor(seconds / 60) % 60;

        button.style.backgroundColor = 'lightgreen'; 
        button.style.borderRadius = '0.3rem';

        div.textContent = `Alarm set for ${hoursLeft} hour${hoursLeft > 1 ? 's': ''} and ${minutesLeft} minute${minutesLeft > 1 ? 's': ''} from now`

        setTimeout(() => {
            div.textContent = ''
        }, 5000)
        
    })
}

timer()
