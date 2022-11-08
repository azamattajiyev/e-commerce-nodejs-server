
$(document).ready(async function(){
    let words;
    let lang=$('html').attr('lang')
    const res=await fetch(`/assets/lang/${lang}.json`)
    words = await res.json()
    $('.tr_lang').each(function( index ) {
        let key=$( this ).text();
        $( this ).empty().append(words[key])
    });
    let pathname=''
    let array=window.location.pathname.split('/')
    for (let i = 2; i < array.length; i++) {
        pathname += '/' + array[i];
    }
    $('.gen_href').each(function( index ) {
        let toggle_lang=$( this ).attr('data-lang');
        $( this ).attr('href','/'+toggle_lang+pathname)
    });
})

