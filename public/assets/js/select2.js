// $(function() {
//   'use strict'

  
//   // if ($(".select2").length) {
//   //   $(".select2").select2({
//   //     minimumResultsForSearch: -1
//   //   });
//   // }
//   // if ($(".js-example-basic-multiple").length) {
//   //   $(".js-example-basic-multiple").select2();
//   // }
// });
const addOption=(array,id)=>{
  array.forEach(element => {
      let str=''
      for (let i = 0; i < element.subcount; i++) {
          str+='---'
      }
      $("#"+id)
      .append($("<option></option>")
      .attr("selected", element.selected )
      .attr("value", element.id )
      .text(str+element.name ));
  });
}
const getSelectData=(name,id,search={},)=>{
  const url=`/api/${name}/select2`
  const page=1
  const limit=10
  $.ajax({
      url      : url,
      type     : 'post',
      data     : {
          search,
          page,
          limit
      },
      dataType : 'json',
      success  : function (res) {
          console.log(res);
          if (res.success) {
              addOption(res.data,id)
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: res.message,
                  })
          }
      },
      error    : function (error) {
          Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.message,
                  })
      }
  });
}