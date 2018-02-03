
'use strict';

// function setId(ctx) {
//
//
//
// // console.log(ctx.params.id);
// // ctx.params.id
//
// }





// page('/:id?', fetchOne);


$(function() {
//  page();

 $('button').on('click', function(){
   const path = $(this).data();
   page.show(`/${path}`);


 })
})
