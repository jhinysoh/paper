window.onload = function(){

	// S 위지윅에디터(CKeditor)
	InlineEditor.create( document.querySelector( '#subjective' ), {
		toolbar: [ 'Heading', 'highlight', 'bold', 'italic', 'underline', 'strikethrough', 'BlockQuote', '|',
		'bulletedList', 'numberedList', 'Indent', 'outdent', 'insertTable', '|', 'undo', 'redo' ]
	} )
	.catch( error => { console.log( error ); } );


}
