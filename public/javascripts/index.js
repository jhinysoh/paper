window.addEventListener('DOMContentLoaded',function(){

    // 
    const goSignUp = document.querySelectorAll('.goSignUp');
    for(i=0; i<goSignUp.length; i++){
        goSignUp[i].addEventListener('click',function(){
            document.querySelector('.main').classList.toggle('hide');
            document.querySelector('.signUp').classList.toggle('hide')
        })
    }

    // 회원가입, 병원등록 페이지 토글
    let signUpNav = document.querySelectorAll('.signUpNav');
    for(let i=0; i<signUpNav.length; i++){
        signUpNav[i].addEventListener('click',function(){
            let signUpNav = document.querySelectorAll('.signUpNav');
            let signUpForm = document.querySelector('.signUp').querySelectorAll('form');
            for(let i=0; i<signUpNav.length; i++){ signUpNav[i].classList.toggle('signUpNav1') }
            for(let i=0; i<signUpForm.length; i++){ signUpForm[i].classList.toggle('hide') }
        })
    }


});




