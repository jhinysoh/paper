window.addEventListener('DOMContentLoaded', ()=>{

  const ws = new WebSocket('ws://localhost:8080');									//- 웹소켓 연결
  const regEmail = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;					//- 이메일 정규식
  const regPw = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;						//- 비밀번호 정규식

  //- 웹소켓 메세지 수신
  ws.onmessage = (evt)=>{
    let msg = JSON.parse(evt.data);
    if(msg.findEmail===false){
      loginEmail.value = '';
      loginEmail.style.backgroundColor = '#FADBD8';
      loginEmail.placeholder = '가입되지않은 이메일입니다';
      loginEmail.focus()
    }
    if(msg.findEmail===true){
		querySelectorAll('.signUp input[type=email]').forEach( item=>{
            item.value ='';
            item.style.backgroundColor = '#FADBD8';
            item.placeholder = '이미 가입된 이메일입니다';
            item.focus()
        })
    }
  }

  //- 로그인 이메일 확인
  const loginEmail = document.querySelector('.login input[type=email]');
  loginEmail.addEventListener('blur', ()=>{
    if(regEmail.test(loginEmail.value)===true){
        ws.send(JSON.stringify( {findEmail:loginEmail.value} ));
        loginEmail.style.backgroundColor = '';
        loginEmail.placeholder = '이메일'
    }
    else if(loginEmail.value===''){
      loginEmail.style.backgroundColor = '';
      loginEmail.placeholder = '이메일'
    }
    else{
      loginEmail.value = '';
      loginEmail.style.backgroundColor = '#FADBD8';
      loginEmail.placeholder = '이메일형식을 입력해주세요'
    }
  });

  //- 회원가입페이지 보이기, 숨기기
  document.querySelectorAll('.goSignUp').forEach( (item, i)=>{
    item.addEventListener('click', ()=>{
      item.querySelectorAll('input:not([type=submit]):not([type=button])').forEach( item=> item.value = '' );
      document.querySelectorAll('.main').forEach( (item)=>{
        item.classList.toggle('hide');
        if(item.classList!=='hide') item.querySelector('form:not(.hide) input').focus();
      })
    })
  });

  //- 회원가입, 병원등록 토글
  const signUpNav = document.querySelectorAll('.signUpNav');
  const signUpForm = document.querySelectorAll('.signUpForm');
  signUpNav.forEach( (item, i)=>{
    item.addEventListener('click',()=>{
      signUpNav.forEach( (nav)=> nav.classList.toggle('signUpNavDark') );
      signUpForm.forEach( (nav)=> nav.classList.toggle('hide') );
      signUpForm[i].querySelectorAll('input:not([type=submit]):not([type=button])').forEach( (item)=>{
        item.value = '';
        item.style.backgroundColor = ''
      });
      signUpForm[i].querySelector('input').focus()
    });
  });

    // 회원가입 이메일 확인
	document.querySelectorAll('.signUp input[type=email]').forEach( item=>{
        
    })

//    const email = document.querySelectorAll('input[type=email]');
//      signUpForm.forEach( (item, i)=>{
/*
//      if(i!==0){                                                              //- [0]:로그인, [1]:회[22]
        item[i].querySelector('input[type=email').addEventListener('blur',()=>{
            if( regEmail.test(this.value)===false && this.value!=='' ){
                this.value = '';
                this.style.backgroundColor = '#FADBD8';
                this.placeholder ='이메일형식으로 입력해주세요';
                this.focus()
            } else if( regId.test(this.value)===true ){
                if(i===1){
                    ws.send(JSON.stringify({ event:'newEmail',message:this.value }));   //- 중복여부 확인
                    ws.onmessage = function(event){
                        let msg = JSON.parse(event.data);
                        if(msg.event==='newEmail' && msg.message==='existing'){
                            item.value = '';
                            item.style.backgroundColor = '#FADBD8';
                            item.placeholder = '이미 가입된 이메일입니다'
                        }
                    }
                }
            } else{ this.style.backgroundColor = ''; this.placeholder = '이메일' }
        })
    });
*/
    // 비밀번호 입력
    const password = document.querySelectorAll('.password');            // 정규식 일치확인
    password[0].addEventListener('blur',()=>{
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
      if( password[0].value!==this.value && this.value!='' ){           // 비밀번호 확인
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
