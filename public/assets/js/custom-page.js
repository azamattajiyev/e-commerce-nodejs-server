$( document ).ready(function() {
    getData({
            limit:10,
            page:1
        })
    // $("table").resizableColumns({
    //     store: window.store
    // });
    $("#tbl_limit").change(function(){
        let limit= $(this).val()
        getData({
            limit:limit,
            page:1
        })
    })

    onChange()
    var toastMixin = Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
});
let route=$('#route').val() 
let datta
const getData=(data={})=>{
    $.ajax({
        type: "POST",
        url: `/api/${route}`,
        data: data,
        dataType: "json",
        success: function (res)
        {
            if (res.success) {
                onSuccess(res.data)
                pagination(res.data)
                
            } else {
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message,
                })
            }
        },
        error  : function (error)
        {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'internal server error',
            })
            $('.submitter').prop('disabled', false);
        }
    });
}
const libtn=(content,page,status='')=>{
    return `<li class="page-item ${status}"><button data-page="${page}" class="page-link" >${content}</button></li>`
}

const pagination=(data)=>{
    $('.pagination').empty()
    let result=''
    let page=parseInt(data.page, 10)
    let total=data.total
    let prevBtn=`<svg xmlns="http://www.w3.org/2000/svg" width="24"
        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>`
    let nextBtn=`<svg xmlns="http://www.w3.org/2000/svg" width="24"
        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>`
    result+=libtn(prevBtn,page-1,page==1?'disabled':'')
    if (page!=1) {
        result+=libtn('1',1)
    }
    if (page-2>1) {
        result+=libtn(page-2,page-2)
    }
    if (page-1>1) {
        result+=libtn(page-1,page-1)
    }
    result+=libtn(page,page,'active')

    if (page+1<total) {
        result+=libtn(page+1,page+1)
    }

    if (page+2<total) {
        result+=libtn(page+2,page+2)
    }

    if (page!=total && total!=0) {
        result+=libtn(total,total)
    }
    result+=libtn(nextBtn,page+1,page==total?'disabled':'')
    $('.pagination').append(result)
    $('.page-link').click(function(){
        let page = $(this).attr('data-page')
        let limit = $("#tbl_limit").val()
        console.log(page);
        console.log(limit);
        getData({
            limit:limit,
            page:page
        })
    })
}
const onSuccess=(data)=>{
    let i=0
    $('tbody').empty()
    datta=data.tabledata

    for (const item of datta) {
        i++
        setDataTable(item,i)
    }
    showData($('#row_1'))

    $('tbody tr').on('click',function(){
        $('tbody tr').removeClass('active')
        $(this).addClass('active')
    })
}

const activeBtn=(b,id,i)=>{
    let clas=b?'btn-success':'btn-dark'
    return `<button type="button" class="btn ${clas}"
                id="on_change_${i}" data-id="${id}">
                ${b}
            </button>`
}

const statusUpdate=(btn)=>{
    let id =btn.attr('data-id')
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    $.ajax({
        type: "POST",
        url: `/api/${route}/active/${id}`,
        data:{},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res){
            if (res.success) {
                btn.html(''+res.data.active)
                btn.toggleClass('btn-success')
                btn.toggleClass('btn-dark')
                Toast.fire({
                    icon: 'success',
                    title: res.data.name+' updated successfully'
                })
            } else {
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message,
                })
            }
        },
        error  : function (error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'internal server error',
            })
            $('.submitter').prop('disabled', false);
        }
    });
}

const deleteData=(btn)=>{
    let id =btn.attr('data-del-id')
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            console.log('success');
            $.ajax({
                type: "POST",
                url: `/api/${route}/delete/${id}`,
                data: {},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (res){
                    if (res.success) {
                        Swal.fire(
                            'Deleted!',
                            res.message,
                            'success'
                        )
                        deleteRow(id)
                    } else {
                        Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.message,
                        })
                    }
                },
                error  : function (error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'internal server error:'+error.message,
                    })
                    $('.submitter').prop('disabled', false);
                }
            });
        }
    })
}
const deleteRow=(id)=>{
    $('.delete_'+id).remove();
}

// const setDataTable=(item,i)=>{
//     let url= '/assets/images/placeholder.jpg'
//     if (item.documents[0]) {
//         url='/uploads'+item.documents[0].path
//     }
//     $('tbody').append(`<tr id="row_${i}" class="delete_${item.id}" data-id="${item.id}">
//         <td >${i}</td>
//         <td  title="${item.name}">
//             <img src="${url}" class="align-self-center wd-100p wd-sm-150 mb-3 mb-sm-0 mr-3" alt="${item.name}">
//             ${item.name}
//         </td>
//         <td title="${item.description}"> ${item.description}</td>
//         <td title="${item.address}"> ${item.address}</td>
//         <td>
//             ${activeBtn(item.active,item.id,i)}
//         <td>
//             <a href="/admin/brands/edit/${item.id}">
//                 <button type="button" class="btn btn-primary btn-icon">
//                     <svg xmlns="http://www.w3.org/2000/svg"
//                     width="24" height="24" viewBox="0 0 24 24"
//                     fill="none" stroke="currentColor" stroke-width="2"
//                     stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
//                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
//                 </button>
//             </a>
//             <button type="button" class="btn btn-danger btn-icon"
//                 id="on_delete_${i}" data-del-id="${item.id}">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
//                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
//                 stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline>
//                 <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
//             </button>
//         </td>
//     </tr>`)
//     $('#row_'+i).on('click',function() {
//         showData($(this))
//     })
//     $('#on_delete_'+i).on('click',function() {
//         deleteData($(this))
//     })
//     $('#on_change_'+i).on('click',function() {
//         statusUpdate($(this))
//     })
// }

// const showData=(row)=>{
//     const found = datta.find(el => {
//         return el.id == row.attr('data-id');
//     });
//     $('#show').empty()
//     if (found) {
//         $('#show').append(`
//     <div class="card-body">
//         ${owlCarousel(found)}
//         <h5 class="card-title" >${found.name}</h5>
//         <p class="card-text">${found.description}</p>
//     </div>`)
//     $('.owl-animate-css').owlCarousel({
//             animateOut: 'slideOutDown',
//             animateIn: 'flipInX',
//             items:1,
//             margin:0,
//             stagePadding:0,
//             smartSpeed:450
//         });
//     }
// }

// const owlCarousel=(item)=>{
//     let result='<div class="owl-carousel owl-theme owl-animate-css owl-loaded owl-drag">'
//     if (item.documents.length > 0) {
//         item.documents.forEach((el, index, array) => {
//             result+=`<div class="item">
//                 <img src="/uploads${el.path}" alt="${index}-image">
//             </div>`
//             result+=`<div class="item">
//                 <img src="/uploads${el.path}" alt="${index}-image">
//             </div>`
//         });
//     }else{
//         result+=`<div class="item">
//                 <img src="/assets/images/placeholder.jpg" alt="item-image">
//         </div>`
//     }
//     result+='</div>'
//     return result
// }

// let searchForm={
//     name:'',
//     description:'',
//     address:'',
// }

// const onChange =()=>{
//     var timer;
//     Object.keys(searchForm).forEach(key => {
//         $(`#${key}`).keydown( function(){
//             searchForm[key]=$(this).val()
//             clearTimeout(timer);
//             var ms = 200; // milliseconds
//             timer = setTimeout(function() {
//                 getData({
//                 limit:10,
//                 page:1,
//                 search:searchForm
//             })
//             }, ms);
//         })
//     });
//     $(`#active`).change( function(){
//         searchForm['active']=$(this).val()
//         clearTimeout(timer);
//         var ms = 200; // milliseconds
//         timer = setTimeout(function() {
//             getData({
//             limit:10,
//             page:1,
//             search:searchForm
//         })
//         }, ms);
//     })
// }