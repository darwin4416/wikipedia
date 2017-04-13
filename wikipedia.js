$(function(){
    var sbtn=$('.search-btn');
    var stxt=$('#search-text');
    var close=$('.close');
    var search=$('.search');
    var scon=$('.search-content');
    //´ò¿ªËÑË÷¿ò
    sbtn.on('click',function(){
        $(this).add('.help-block').hide();
        stxt.removeClass('hide').animate({width:250},600,function(){
            close.removeClass('hide');
        });
    });
    //¹Ø±ÕËÑË÷¿ò
    close.on('click',function(){
        if(!stxt.hasClass('hide')){
            scon.empty();
            search.css('margin-top','20%');
            close.addClass('hide');
            stxt.val('');
            stxt.animate({width:34},600,function(){
                $(this).addClass('hide');
                sbtn.add('.help-block').show();
            })
        }
    });
    //get the data
    stxt.on('keydown',function(e){
        e=e||window.event;
        if(e.which===13&&stxt.val()!==''){
            search.css('margin-top','50px');
            scon.empty();
            var txt=$(this).val();
            var api='https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&plimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrlimit=10&callback=?&gsrsearch='+encodeURIComponent(txt);
            $.getJSON(api,{"dataType":"jsonp"},showOut);
            return false;
        }
    });
    //show the data
    function showOut(data){
        var pages=data['query']['pages'];
        var pagesArr=Object.keys(pages);
        var html='';
        var curid='https://en.wikipedia.org/?curid=';
        for(var i=0;i<pagesArr.length;i++){
            html='<li class="item"><a target="_blank"><h3>'+pages[pagesArr[i]].title+'</h3><p>'+pages[pagesArr[i]].extract+'</p></a></li>';
            $(html).appendTo(scon).find('a').attr('href',curid+pagesArr[i]);
        }
    }
});