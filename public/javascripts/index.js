window.addEventListener('DOMContentLoaded', ()=>{

  const ws= new WebSocket('ws://localhost:8080');				            				   	//- 웹소켓 연결
  const regEmail= /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;			     	  	//- 이메일 정규식
  const regPw= /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;					        	//- 비밀번호 정규식
  const regCell= /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/;              //- 휴대전화 정규식

  //- 웹소켓 메세지 수신
  ws.onmessage= (evt)=>{
    let msg= JSON.parse(evt.data);
    if(msg.userEmail===false){                                                  //- 로그인: 가입되지않은 메일
      let item= document.querySelector('.main:not(.hide) .login input');
      item.value= '';
      item.style.backgroundColor= '#FADBD8';
      item.placeholder= '가입되지않은 이메일입니다';
      item.focus()
    }
    document.querySelectorAll('.main:not(.hide) .signUpForm input').forEach((item,i)=>{
      switch(i){
        case 0:                                                                 //- 회원가입: 가입된 메일여부 확인
          if(msg.userEmail===true){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '가입된 이메일입니다';
            item.focus()
          }
          break
        case 1:                                                                 //- 회원가입: 등록된 전화여부 확인
          if(msg.userTel===true){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '등록된 번호입니다';
            item.focus()
          }
          break
        case 5:                                                                 //- 회원가입: 닉네임 중복 확인
          if(msg.userNick===true){
            item.value='';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '사용중인 닉네임입니다';
            item.focus()
          }
          break
        case 6:                                                                 //- 회원가입: 면허번호 확인
          if(msg.userLicense===true){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '등록된 번호입니다';
            item.focus()
          }
          break
      }
    });
  }

  //- 로그인 이메일 확인
  const loginEmail= document.querySelector('.login input');
  loginEmail.addEventListener('blur',()=>{
    if(regEmail.test(loginEmail.value)===false && loginEmail.value!==''){
      loginEmail.value= '';
      loginEmail.style.backgroundColor= '#FADBD8';
      loginEmail.placeholder= '이메일을 입력해주세요';
      loginEmail.focus()
    }else{
      if(loginEmail.value!=='') ws.send(JSON.stringify( {userEmail:loginEmail.value} ))
      loginEmail.style.backgroundColor= '';
      loginEmail.placeholder= '이메일'
    }
  })

  //- 회원가입페이지 보이기, 숨기기
  document.querySelectorAll('.goSignUp').forEach(item=>{
    item.addEventListener('click',()=>{
      document.querySelectorAll('input:not([type=submit]):not([type=button])').forEach(item=> item.value= '' );
      document.querySelectorAll('.main').forEach(item=>{
        item.classList.toggle('hide');
        if(item.classList!=='hide') item.querySelector('form:not(.hide) input').focus();
      })
    })
  });

  //- 회원가입, 병원등록 토글
  const signUpNav = document.querySelectorAll('.signUpNav');
  const signUpForm = document.querySelectorAll('.signUpForm');
  signUpNav.forEach((item,i)=>{
    item.addEventListener('click',()=>{
      signUpNav.forEach(item=> item.classList.toggle('signUpNavDark') );
      signUpForm.forEach(item=> item.classList.toggle('hide') );
      signUpForm[i].querySelectorAll('input:not([type=submit]):not([type=button])').forEach(item=>{
        item.value = '';
        item.style.backgroundColor = ''
      });
      signUpForm[i].querySelector('input').focus()
    });
  });

  //- 회원가입: 데이터 유효성 검증
  document.querySelectorAll('.signUpForm')[0].querySelectorAll('input').forEach((item,i)=>{
    item.addEventListener('blur',()=>{
      switch(i){
        case 0:                                                                 //- 유저: 이메일
          if(regEmail.test(item.value)===false && item.value!==''){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '이메일을 입력해주세요';
            item.focus()
          }else{
            if(item.value!=='') ws.send(JSON.stringify( {userEmail:item.value} ))
            item.style.backgroundColor= '';
            item.placeholder= '이메일'
          }
          break
        case 1:                                                                 //- 유저: 휴대전화
          let tel= item.value.replace(/[^0-9]/g,'');
          if(regCell.test(tel)===false && item.value!==''){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '휴대전화번호를 입력해주세요';
            focus()
          }else{
            if(tel!=='') ws.send(JSON.stringify( {userTel:tel} ))
            item.value= tel;
            item.style.backgroundColor= '';
            item.placeholder= '휴대전화'
          }
          break
        case 2:                                                                 //- 유저: 비밀번호
          if(regPw.test(item.value)===false && item.value!==''){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder='영문자/숫자/특수문자 포함 8자이상';
            item.focus()
          }else{
            item.style.backgroundColor= '';
            item.placeholder= '비밀번호'
          }
          break
        case 3:                                                                 //- 유저: 비밀번호 확인
          let pw= document.querySelector('.signUpForm input[type=password]').value;
          if(item.value!==pw && item.value!==''){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder='비밀번호가 일치하지않습니다';
            item.focus()
          }else{
            item.style.backgroundColor= '';
            item.placeholder= '비밀번호확인'
          }
          break
        case 5:                                                                 //- 유저: 닉네임
          if(item.value!=='') ws.send(JSON.stringify( {userNick:item.value} ))
          item.style.backgroundColor= '';
          item.placeholder= '닉네임'
          break
        case 6:                                                                 //- 유저: 면허번호
          if(item.value!=='') ws.send(JSON.stringify( {userLicense:item.value} ))
          item.style.backgroundColor= '';
          item.placeholder= '면허번호'
          break
      }
    })
  });
  //- 동물병원: 데이터 유효성 검증

  document.querySelectorAll('.signUpForm')[1].querySelectorAll('input').forEach((item,i)=>{
    item.addEventListener('blur',()=>{
      switch(i){
        case 1:                                                                 //- 동물병원: 사업자/법인번호
          let num= item.value.replace(/[^0-9]/g,'');
          if(num.length!==10 && num.length!==13 && num.length!==0){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '사업자/법인번호 10/13자리를 입력해주세요';
            item.focus()
          }else{
            ws.send(JSON.stringify( {bizNumber:num} ));
            item.value= num;
            item.style.backgroundColor= '';
            item.placeholder= '사업자/법인번호';
          }
          break
        case 3:                                                                //- 동물병원: 전화번호
          let tel= item.value.replace(/[^0-9]/g,'');
          if((tel.length<7 || tel.length>11) && tel.length>0){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '병원전화번호를 입력해주세요';
            item.focus()
          }else{
            ws.send(JSON.stringify( {bizTel:tel} ));
            item.value= tel;
            item.style.backgroundColor= '';
            item.placeholder= '병원전화번호';
          }
          break
        case 4:                                                                //- 동물병원: 이메일
          if(regEmail.test(item.value)===false && item.value!==''){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '이메일을 입력해주세요';
            item.focus()
          }else{
            item.style.backgroundColor= '';
            item.placeholder= '이메일'
          }
          break
        case 6:                                                                //- 동물병원: 휴대전화
          let ctel= item.value.replace(/[^0-9]/g,'');
          if(regCell.test(ctel)===false && ctel.length>0){
            item.value= '';
            item.style.backgroundColor= '#FADBD8';
            item.placeholder= '휴대전화를 입력해주세요';
            item.focus()
          }else{
            item.value= ctel;
            item.style.backgroundColor= '';
            item.placeholder= '대표자휴대전화'
          }
          break
      }
    })
  });

  //- 회원가입: 동물병원 찾기
  document.querySelectorAll('.qualify2').forEach((item,i)=>{
    item.addEventListener('click',()=>{
      switch(i){
        case 0:
          document.querySelector('#clearWrap').classList.toggle('hide');
          document.querySelector('#findHospital').classList.toggle('hide');
          break
      }
    })
  });

  //- 병원찾기 팝업
  document.querySelectorAll('.closeWrap, #clearWrap').forEach((item,i)=>{       //- 닫기버튼 또는 배경 클릭
    item.addEventListener('click',()=>{
      document.querySelector('#clearWrap').classList.toggle('hide');
      document.querySelector('#findHospital').classList.toggle('hide')
    })
  });

  //- 파일업로드
  //- 업로드 기본스타일은 투명레이어로 만들어 '찾기'버튼 위에 둠
  document.querySelectorAll('.fileUp').forEach((item,i)=>{                      //- 찾기버튼 클릭
    let fileUp= item.querySelector('input[type=file]');
    fileUp.addEventListener('mouseover',()=> item.nextSibling.style= 'background-color:#5D6D7E; color:#F2F4F4' );
    fileUp.addEventListener('mouseout',()=> item.nextSibling.style= '' );
    fileUp.addEventListener('change',()=>{
      let fileName= fileUp.value.split('\\');
      fileUp.previousSibling.value= fileName[fileName.length-1]
    })
  });


});
