window.onload = function(){

	// S 위지윅에디터(CKeditor)
	InlineEditor
			.create( document.querySelector( '#subjective' ),{
				toolbar: [ 'highlight', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ]
			} )
			.catch( error => {
					console.error( error );
			} );

}

function signUpFormSwitch(){
	document.getElementById("userSignUp").classList.toggle("signup-nav1");
	document.getElementById("hospitalSignUp").classList.toggle("signup-nav1");
	document.getElementById("userSignUpForm").classList.toggle("formHide");
	document.getElementById("hospitalSignUpForm").classList.toggle("formHide")
}
