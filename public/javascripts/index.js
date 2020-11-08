window.addEventListener('DOMContentLoaded',function(){

    // 회원가입, 병원등록 페이지 토글
    const signUpNav = document.getElementsByClassName('signup-nav');
    for(var i=0; i<signUpNav.length; i++){ signUpNav[i].addEventListener('click',signUpFormSwitch) }

});

    function signUpFormSwitch(){
        document.getElementsByClassName("signup-nav").classList.toggle("signup-nav1");
    	document.getElementsByClassName("signUpForm").classList.toggle("formHide")
    }
//const signUpNav = document.getElementsByClassName('signup-nav');
//function signUpFormSwitch(){
//    const signUpNav = document.getElementsByClassName('signup-nav');
//    for(var i=0; i<signUpNav.length; i++){ signUpNav[i].classList.toggle('signup-nav1') }

//	document.getElementById("userSignUp").classList.toggle("signup-nav1");
//	document.getElementById("hospitalSignUp").classList.toggle("signup-nav1");
//	document.getElementById("userSignUpForm").classList.toggle("formHide");
//	document.getElementById("hospitalSignUpForm").classList.toggle("formHide")
//}


/*
document.getElementById("hospitalSignUp").addEventListener("click",alert());



*/