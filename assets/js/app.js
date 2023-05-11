const welcome = document.querySelector('#welcomeMessage')
user = localStorage.getItem("username")
welcome.innerHTML = `Welcome, ${user}`
///////////////////////////////////////////
const counter = document.getElementById('timing')
const question = document.getElementById('question')
const answers = document.querySelectorAll('.answer')
const previous = document.getElementById('previous')
const submit = document.getElementById('submit')
const logout = document.getElementById('logout')
const next = document.getElementById('next')
const display = document.querySelector('.display')
const failed = document.querySelector('.failed')
const passed = document.querySelector('.passed')
const total = document.querySelector('.total')
const congrats = document.getElementById('congrats')


const questions = [
    {
        title: '1: What is the purpose of HTML?',
        questanswer: [
            { ans: "To style web pages", },
            { ans: "To add interactivity to web pages", },
            { ans: "To structure content on web pages", },
            { ans: "To animate elements on web pages", }
        ],
        correct: 'To structure content on web pages'

    },
    {
        title: '2: Which attribute is used to define the source of an image in HTML?',
        questanswer: [
            { ans: "href", },
            { ans: "src", },
            { ans: "alt", },
            { ans: "title", }
        ],
        correct: 'src'

    },
    {
        title: '3: What does CSS stand for?',
        questanswer: [
            { ans: "Cascading System Sheets", },
            { ans: "Creative Style Sheets", },
            { ans: "Cascading Style Sheets", },
            { ans: "Creative System Sheets", }
        ],
        correct: 'Cascading Style Sheets'

    },
    {
        title: '4: Which of the following is NOT a valid CSS selector?',
        questanswer: [
            { ans: "#example", },
            { ans: ".example", },
            { ans: "`example", },
            { ans: "p.example", }
        ],
        correct: '`example'
    },
    {
        title: '5: Which property is used to change the background color of an element in CSS?',
        questanswer: [
            { ans: "color", },
            { ans: "font-size", },
            { ans: "background-color", },
            { ans: "border-color", }
        ],
        correct: 'background-color'

    },
    {
        title: "6: What is the purpose of the script tag in HTML?",
        questanswer: [
            { ans: "To create links to external stylesheets", },
            { ans: "To add JavaScript code to a web page", },
            { ans: "To create tables on a web page", },
            { ans: "To add images to a web page", }
        ],
        correct: 'To add JavaScript code to a web page'

    },
    {
        title: '7: What is the purpose of the console.log() method in JavaScript?',
        questanswer: [
            { ans: "To display a message on the web page", },
            { ans: " To create a pop-up window", },
            { ans: " To send data to the server", },
            { ans: "To display a message in the browser console", }
        ],
        correct: 'To display a message in the browser console'

    },
];

localStorage.setItem('question_length',questions.length)
let count = '';
function loop() {
    count = localStorage.getItem('count')
    displayQuestion(count)
}
loop()


function displayQuestion(count) {
    if (count < questions.length) {
        // console.log(questions[count]);
        question.innerHTML = `${questions[count].title}`
        for (i = 0; i < questions[count].questanswer.length && i < answers.length; i++) {
            // console.log(questions[count].questanswer[i]);
            answers[i].innerHTML = questions[count].questanswer[i].ans
        }
        answers.forEach(elm => {
            elm.onclick = () => {
                // console.log(elm);
                questions[count].useranswer = elm.innerHTML
                // console.log(questions[count]);
                // elm.classList.add('selected')
            }
        })

        // effect(questions[count], 'useranswer')
    }
}


function effect(thequestion, useranswer) {
    let user_answer = useranswer
    if (thequestion[user_answer]) {
        // console.log(thequestion[user_answer]);
        answers.forEach(el => {
            if (el.innerHTML == thequestion[user_answer]) {
                // el.classList.add('selected')
            }
        })
    } else {
        answers.forEach(el => {
            // el.classList.remove('selected')
        })
    }
}
next.onclick = () => {
    if (count < questions.length - 1) {
        count++
        localStorage.setItem('count', count)
        loop()
    } else {
        question.innerHTML = question.innerHTML = 'You have completed your quiz, Click on the submit!!';
        question.style.color = "#2e51ed"
        // previous.style.display = 'none';
        answers.forEach(e => {
            e.style.display = 'none'
        })
    }
}
previous.onclick = () => {
    answers.forEach(e => {
        e.style.display = 'flex'
    })
    if (count > 0) {
        count--
        localStorage.setItem('count', count)
        loop()
    } else {
        count = 0;
        localStorage.setItem('count', count)
        loop()
    }
}
score = 0
fail = 0
pass = 0
submit.onclick = () => {
    display.style.display = "flex"
    clearInterval(countdown);
    for (i = 0; i < questions.length; i++) {
        // console.log();
        if (questions[i].correct == questions[i].useranswer) {
            score++
            pass++
            passed.innerHTML = `Passed: ${pass}`
            submit.style.display = "none";
            question.innerHTML = 'SUBMITTED!!';
            // console.log(score);
        } else {
            fail++
            failed.innerHTML = `Failed: ${fail}`
            passed.innerHTML = "Passed: 0"
            question.innerHTML = 'YOU HAVE SUCCESSFULY SUBMITTED!!';
            question.style.color = "green"
            // submit.setAttribute("disabled", true)
            // submit.style.backgroundColor = "darkgrey"
            submit.style.display = "none";
            next.style.display = "none"
            previous.style.display = "none"
            answers.forEach(el => {
                el.style.display = "none"
                counter.innerHTML = "Submitted"
                clearInterval(countdown);
            })
        }
        total.innerHTML = `Total: ${pass} / ${questions.length}`
    }
}

logout.onclick = () => {
    window.open('./index.html', '_self')
    console.log("out!!");
}

//Countdown fucntion
timer = 60 * 2;
const countdown = setInterval(() => {
    if (timer <= 0 && questions.length > 0) {
        clearInterval(countdown);
        counter.innerHTML = "Time is Up!!"
        counter.style.color = "red"
        question.innerHTML = "Time Up" + " " + "You didnt finish the question, Click Submit";
        answers.forEach(function (answer) {
            answer.remove();
        });
    } else if (timer > 0 && questions.length <= 0) {
        clearInterval(countdown);
        counter.innerHTML = "Submit"
        counter.style.color = "green"
        question.innerHTML = "You finished on time, click submit button";
        answers.forEach(function (answer) {
            answer.remove();
        });

    } else if (timer <= 0 && question.length <= 0) {
        clearInterval(countdown);
        counter.innerHTML = "Done!!"
        counter.style.color = "green"
        question.innerHTML = "You have answered all the questions!" + " " + "Click the Submit Button";
        answers.forEach(function (answer) {
            answer.remove();
        });
    } else {
        timer--;
        counter.innerHTML = timer;
    }
}, 1000 * 1);