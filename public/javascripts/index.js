window.addEventListener('DOMContentLoaded',function(){

    // 회원가입페이지 보이기, 숨기기
    const goSignUp = document.querySelectorAll('.goSignUp');
    for(i=0; i<goSignUp.length; i++){
        goSignUp[i].addEventListener('click',function(){
          const main = document.querySelectorAll('.main');
          for(i=0; i<main.length; i++){ main[i].classList.toggle('hide') }
        })
    }

    // 회원가입, 병원등록 토글
    let signUpNav = document.querySelectorAll('.signUpNav');
    for(i=0; i<signUpNav.length; i++){
        signUpNav[i].addEventListener('click',function(){
            let signUpNav = document.querySelectorAll('.signUpNav');
            let signUpForm = document.querySelector('.main1').querySelectorAll('form');
            for(let i=0; i<signUpNav.length; i++){ signUpNav[i].classList.toggle('signUpNav1') }
            for(let i=0; i<signUpForm.length; i++){ signUpForm[i].classList.toggle('hide') }
        })
    }

});
