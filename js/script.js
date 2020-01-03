window.addEventListener('DOMContentLoaded', function(){
    let tab = document.getElementsByClassName('info-header-tab'),
        tabContent = document.getElementsByClassName('info-tabcontent'),
        info = document.getElementsByClassName('info-header')[0];

        function hideTabContent(a) {
            for (let i = a; i < tabContent.length;i++){
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }

        hideTabContent(1)

        function showTabContent(b) {
            if( tabContent[b].classList.contains('hide')){
                hideTabContent(0);
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }

        info.addEventListener('click', function(event) {
            let target = event.target;
            if (target.className == 'info-header-tab') {
                for(let i = 0 ; i < tab.length; i++){
                    if(target == tab[i]) {
                        showTabContent(i);
                        break;
                    }
                }
            };
        });

        //timer

        let deadline = "2020-01-04";

        function getTimeRemaining(endTime) {
            let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000 * 60 * 60)) );

            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        };

        function setClock(id, endTime){
            let timer = document.getElementById(id),
                hours = timer.querySelector(".hours"),
                minutes = timer.querySelector(".minutes"),
                seconds = timer.querySelector(".seconds");

            function updateClock(){
                let t = getTimeRemaining(endTime);
                hours.innerHTML = t.hours;
                minutes.innerHTML = t.minutes;
                seconds.innerHTML = t.seconds;

                if (t.total <=0) {
                    clearInterval(timeInterval);
                }
            };

            updateClock();
            let timeInterval = setInterval(updateClock, 1000);
            
        };

            setClock('timer', deadline);


        //Modal

        let more = document.querySelector(".more"),
            descriptionBtn = document.querySelector(".info-tabcontent"),
            overlay = document.querySelector(".overlay"),
            close = document.querySelector(".popup-close");

        more.addEventListener('click', function(){
            this.classList.add('.more-splash');
            overlay.style.display = "block"; 
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click',function(){
            overlay.style.display = "none";
            more.classList.remove(".more-splash");
            document.body.style.overflow = '';
        });


        //Form
        let message = new Object();
        message.loading = "Загрузка...";
        message.seccess = "Спасибо.Скоро мы с Вами свяжемся...";
        message.failure = "Что-то пошло не так...";

        let form = document.getElementsByClassName("main-form")[0],
            input = form.getElementsByTagName("input"),
            statusMessage = document.createElement("div");
            statusMessage.classList.add("status");

            form.addEventListener("submit", function(event) {
                event.preventDefault();
                form.appendChild(statusMessage);

                //AJAX
                let request = new XMLHttpRequest();
                request.open("POST",'server.php');

                request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

                let formData = new FormData(form);

                request.send(formData);

                request.onreadystatechange = function() {
                    if (request.readyState < 4) {
                        statusMessage.innerHTML = message.loading;
                    } else if (request.readyState === 4) {
                        if(request.status == 200 && request.status < 300){
                            statusMessage.innerHTML = message.seccess;
                            //Добавляем контент на страницу
                        }
                        else {
                            statusMessage.innerHTML = message.failure;
                        }
                    }
                }
                for(let i = 0 ; i < input.length;i++){
                    input[i].value = "";
                    //Очищаем поля ввода
                }
            });

        });