let words;

$(document).ready(async function(){
    let lang=$('html').attr('lang')
    const res=await fetch(`/assets/lang/${lang}.json`)
    words = await res.json()
    
    $('.tr_lang').each(function( index ) {
        let key=$( this ).text();
        let tagname=$( this ).prop("tagName").toLowerCase();
        switch (tagname) {
            case 'span':
                $( this ).empty().append(word(key))
                break;
            case 'input':
                key=$( this ).attr('placeholder')
                $( this ).attr('placeholder',word(key))
                break;
            case 'textarea':
                key=$( this ).attr('placeholder')
                $( this ).attr('placeholder',word(key))
                break;
            default:
                break;
        }
        console.log(tagname);
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
const word=(key)=>{
    if (words[key]) {
        return words[key]
    }
    return key
}