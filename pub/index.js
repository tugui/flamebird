$(document).ready(function(){
    console.log('document.ready!');
    alert('heheda');
    $('#haha').click(function(e){
        $.ajax({
            url: 'deal',
            type:'POST',
            dataType: 'json',
            data: {
                data:$('#hehe').val()
            },
            success:function(Res){
                alert('success');
                $('#hehe').val() = Res;
            },

            error:function(){
                alert('error');
            }
        });
    });
 });
