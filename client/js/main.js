$( document ).ready(function() {
  $('#cart')
    .popup({
      popup : $('.custom.popup.cart'),
      inline     : true,
      hoverable  : true,
      position   : 'bottom center',
      onShow: function(){
            resizePopup();
        },
      on    : 'click'
    })
  ;
  $('#login')
    .popup({
      popup : $('.custom.popup.login'),
      inline     : true,
      hoverable  : true,
      position   : 'bottom center',
      on    : 'click',
    })
  ;

  $('.special.cards .image').dimmer({
  on: 'hover'
  });

  $('.ui.dropdown')
    .dropdown();


});
