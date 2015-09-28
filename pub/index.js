$(document).ready(function(){
    alert('heheda');
    $('.haha').click(function(e){
        $.ajax({
            url: 'deal',
            type:'POST',
            dataType: 'json',
            data: {
                data:$('.hehe').value
            },
            success:function(Res){
                alert('success');
                $('#hehe').value = Res.data;
            },
            error:function(){
                alert('error');
            }
        });
    });
 });
