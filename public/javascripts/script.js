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

function signup_cancel() {
	if(confirm("회원가입을 중단하시겠습니까?")==true){
		location.href='/';
	} else { return false }
}

document.getElementById('nickname').appendChild(${nickname});
