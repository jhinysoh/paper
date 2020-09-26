window.onload = function(){
    InlineEditor.create( document.querySelector( '#subjective' ), {
		toolbar: [ 'Heading', 'bold', 'italic', 'BlockQuote',
		'bulletedList', 'numberedList', 'blockQuote', 'Indent' ]
    } )
    .catch( error => { console.log( error ); } );
}