//アコーディオンをクリックした時の動作
var findElm2 = $('.expHead').next(".expMain");//直後のアコーディオンを行うエリアを取得し
$(findElm2).slideUp();//アコーディオンの上下動作
$('.expHead').on('click', function() {//タイトル要素をクリックしたら
    var findElm = $(this).next(".expMain");//直後のアコーディオンを行うエリアを取得し
    $(findElm).slideToggle();//アコーディオンの上下動作
    if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
      $(this).removeClass('close');//クラス名を除去し
    }else{//それ以外は
      $(this).addClass('close');//クラス名closeを付与
    }
});