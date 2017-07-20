/**
 * 需求：当点击对应标签时，显示对应页面。自动轮播。
 */


$('.gallery').on('click', '.menu li', function (e,keepScroll) {
    let $li = $(e.currentTarget);
    let index = $li.index();
    //阻止默认跳转动作
    e.preventDefault();
    //跳去指定页面
    go(index - 1);
    //收到任意监听，则停止计时器播放
    if(!keepScroll) clearInterval(itvl);
});

function go(index) {
    //添加对应标签为active，删除其他标签的active
    $('li.menuItem').eq(index).addClass('active')
        .siblings().removeClass('active');
    let width = $('.gallery>.slides>.slide').width();
    $('.gallery>.slides> div').css({
        transform: 'translateX(' + (-width * (index)) + 'px)'
    })
}

let current = 0;

// 定时器，自动轮播页面
let itvl =setInterval(function () {
    let nextIndex =current +1;
    if(nextIndex === 4){
        nextIndex =0;
    }
    go(nextIndex);
    current=nextIndex;
},3000);