window.addEventListener('DOMContentLoaded',function(){

    // 회원가입, 병원등록 페이지 토글
    let signUpNav = document.querySelectorAll('.signUpNav');
    for(let i=0; i<signUpNav.length; i++){ signUpNav[i].addEventListener('click',signUpFormSwitch) }

});

function signUpFormSwitch(){
    let signUpNav = document.querySelectorAll('.signUpNav');
    let signUpForm = document.querySelectorAll('form');
    for(let i=0; i<signUpNav.length; i++){ signUpNav[i].classList.toggle('signUpNav1') }
    for(let i=0; i<signUpForm.length; i++){ signUpForm[i].classList.toggle('formHide') }
}

