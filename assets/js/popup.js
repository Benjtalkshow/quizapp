//////////////////  popUp.js //////////
const submitBtn = document.querySelector('#submit')
const closeBtn = document.querySelector('#close')
const popUp = document.querySelector('.popupContainer')
const user = document.querySelector('.dearuser')
const instruction = document.querySelector('.instruction')

submitBtn.addEventListener('click',(e)=>{
        e.preventDefault();
popUp.classList.add('popupActive')
const setName = localStorage.getItem("username")
user.innerHTML = `Dear ${setName}, please read the instruction below`;
submitBtn.style.display = "none"
})
closeBtn.addEventListener('click',()=>{
        popUp.classList.remove('popupActive')
        window.open('./quiz.html', '_self')

})
const length = localStorage.getItem('question_length')
instruction.innerHTML = "This quiz in particular contains 7 questions";