window.addEventListener('DOMContentLoaded',function(){

    // 회원가입페이지 보이기, 숨기기
    const goSignUp = document.querySelectorAll('.goSignUp');
    goSignUp.forEach( (goSignUp, i) => {
      goSignUp.addEventListener('click',function(){
        document.querySelectorAll('.main').forEach( (main) => {
          main.classList.toggle('hide');
          main.querySelectorAll('input:not([type=submit]):not([type=button])')
            .forEach( (item) => { item.value='' });
          main.querySelector('form:not(.hide) input').focus()
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
        signUpForm[i].querySelectorAll('input:not([type=submit]):not([type=button])')
          .forEach( (input) => {
            input.value = '';
            input.style.backgroundColor = ''
          });
        signUpForm[i].querySelector('input').focus()
      });
    });

    // 이메일 확인
    const regId = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    const email = document.querySelectorAll('input[type=email]');
    email.forEach((item, i) => {
      item.addEventListener('blur',function(){
        if( regId.test(this.value)===false && this.value!=='' ){
          this.value = '';
          this.style.backgroundColor = '#FADBD8';
          this.placeholder = '이메일형식으로 입력해주세요'
        } else{
          this.style.backgroundColor = '';
          this.placeholder = '이메일'
        }
      })
    });

    // 비밀번호 확인
    const regPw = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/
    const password = document.querySelectorAll('.password');
    password[0].addEventListener('blur',function(){
      if( regPw.test(this.value)===false && this.value!=='' ){
        this.value = '';
        this.style.backgroundColor = '#FADBD8';
        this.placeholder ='영문자/숫자/특수문자 포함 8자이상';
        this.focus()
      } else{
        this.style.backgroundColor = '';
        this.placeholder = '비밀번호'
      }
    });
    password[1].addEventListener('blur',function(){
      if( password[0].value!==this.value && this.value!='' ){
        this.value = '';
        this.style.backgroundColor = '#FADBD8';
        this.placeholder ='비밀번호가 일치하지않습니다';
        this.focus()
        } else{
          this.style.backgroundColor = '';
          this.placeholder = '비밀번호확인'
        }
    });


});
