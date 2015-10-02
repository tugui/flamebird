$(document).ready(function(){
    console.log('document.ready!');
    alert('heheda');
    $('#haha').click(function(e){
        $.ajax({
            url: 'deal',
            type:'POST',
            dataType: 'text',
            data: {
                data:$('#hehe').val()
            },
            success:function(Res){
                alert('success');
                console.log(Res);
                var ResArr = Res.split("'") ;
                console.log(ResArr);
                Res = "";
                for(var i = 1; i < (ResArr.length-2); i++){
                    Res += ResArr[i] + "'";
                    console.log(Res);
                }
               Res += ResArr[ResArr.length-2];
                $('#hehe').val(Res) ;
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                 console.log(textStatus);
                  console.log(errorThrown);
            }
        });
    });
 });
