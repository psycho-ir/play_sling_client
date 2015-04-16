function uploadAttachment(what,id,on){

}

$(document).ready(function(){
    $(document).on('click','.idea-attach',function(){
        console.log("eee");
        var ideaId = $(this).data('ideaid');
        var parent = $('#attach').parent();
        parent.empty();
        parent.append('<div id="attach"></div>');

    })

    $(document).on('click','#generate-uploader',function(){
        var ideaId = $(this).data('ideaid');
        var parent = $('#attach').parent();
        parent.empty();
        parent.append('<div id="attach"></div>');
        $('#attach').uploadFile({
            url:"http://localhost:9000/api/idea/"+ideaId+"files/upload",
            formData: {
                'name':$('#file-name').val(),
                'description':$('#description').val()
            }
        })

    })
})