window.addEventListener('DOMContentLoaded',function(){

    // 회원가입페이지 보이기, 숨기기
    const goSignUp = document.querySelectorAll('.goSignUp');
    goSignUp.forEach( (goSignUp, i) => {
      goSignUp.addEventListener('click',function(){
        document.querySelectorAll('.main').forEach( (main) => {
          main.classList.toggle('hide');
          main.querySelectorAll('input[type=email],input[type=password]')
            .forEach( (input) => { input.value = '' });
          main.querySelector('input').focus()
        })
      })
    });

    // 회원가입, 병원등록 토글
    const signUpNav = document.querySelectorAll('.signUpNav');
    const signUpForm = document.querySelectorAll('.signUpForm');
    signUpNav.forEach( (item, i) => {
      item.addEventListener('click',function(){
        signUpNav.forEach( (nav) => { nav.classList.toggle('signUpNavDark') });
        signUpForm.forEach( (nav) => { nav.classList.toggle('hide') });
        signUpForm[i].querySelectorAll('input[type=email],input[type=text],input[type=password],input[type=number]' )
          .forEach( (input) => { input.value = '' });
        signUpForm[i].querySelector('input').focus()
      });
    });

    // 비밀번호 확인
    const reg = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[,./<>?!@#$%^&*()_+-=]).{8,}$/;
    const password = document.querySelectorAll('.password');
    password[0].addEventListener('blur',function(){
      if( reg.test(password[0].value) === false ){ alert('비밀번호는 영소문자, 숫자, 특수문자를 포함하여 8자 이상이어야합니다.') }
    });
    password[1].addEventListener('blur',function(){
      if( password[0].value !== password[1].value ){ alert('비밀번호가 일치하지 않습니다') }
    });


});
