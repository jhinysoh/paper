window.onload = function(){

	//- 위지윅에디터(CKeditor)
	InlineEditor
		.create( document.querySelector( '#subjective' ),{
			toolbar: [ 'highlight', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ]
		} )
		.catch( error => {
			consol.error( error );
        } );

}
