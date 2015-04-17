function uploadAttachment(what,id,on){

}

$(document).ready(function(){
    $(document).on('click','.idea-attach',function(){
        var ideaId = $(this).data('ideaid');
        var parent = $('#attach').parent();
        parent.empty();
        parent.append('<div data-ideaid="'+ideaId+'" id="attach"></div>');

    })

    $(document).on('click','#generate-uploader',function(){
        var ideaId = $('#attach').data('ideaid');
        var parent = $('#attach').parent();
        parent.empty();
        parent.append('<div id="attach"></div>');
        $('#attach').uploadFile({
            url:"http://localhost:9000/api/ideas/"+ideaId+"/files",
            formData: {
                'name':$('#file-name').val(),
                'description':$('#description').val(),
                'X-Auth-Token': userToken
            }
        })

    })
})