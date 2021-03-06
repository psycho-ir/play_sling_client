var colors = {'open': 'open-state', 'close': '#990011'};
function showIdeas(token) {
    $.ajax({
            method: "GET",
            url: "http://localhost:9000/api/ideas",
            headers: {
                "X-Auth-Token": token
            },
            success: function (e, t) {
                var ideas = e;
                if (e.length == 0) {
                    $('#empty').fadeIn();
                    return;
                }
                var template = $('#idea-template').html();
                $('#empty').hide();
                $('#ideas').fadeIn();
                $('#ideas .row').empty();
                for (var i in ideas) {

                    $('#ideas .row').append(template.replace('$name', ideas[i].name)
                            .replace('$description', ideas[i].description)
                            .replace('$state', ideas[i].state)
                            .replace('$css', colors[ideas[i].state])
                            .replace('$likeCount', ideas[i].likeCount)
                            .replace('$ideaId', ideas[i].id)
                            .replace('$ideaId', ideas[i].id)
                            .replace('$ideaId', ideas[i].id)
                            .replace('$ideaId', ideas[i].id)
                            .replace('$ideaId', ideas[i].id)
                            .replace('$ideaId', ideas[i].id)
                    );
                }

            },
            error: function (e) {
                console.log(e);
            }
        }
    );
}


$(document).ready(function () {
    $(document).on('click', '#idea-save', function () {
        $.ajax({
            method: "POST",
            url: "http://localhost:9000/api/ideas",
            headers: {
                "X-Auth-Token": userToken
            },
            //data: $('#idea-form').serialize(),
            data: JSON.stringify({
                "name": $("#idea-form #title").val(),
                "description": $("#idea-form #description").val(),
                "state": "open"
            }),
            success: function (e, t) {
                console.log(e);
                console.log(t);
                showIdeas(userToken);

            },
            error: function (e) {
                console.log(e);
            },
            type: "application/json",
            contentType: "application/json"

        });
    });

    $(document).on("click", ".idea-comment", function () {
        var ideaId = $(this).data("ideaid");
        showComments(userToken, ideaId);
    });

    $(document).on("click",".idea-show-attach",function(){
        var ideaId = $(this).data("ideaid");
        showAttachedFiles(userToken,ideaId);
    })

    $(document).on("click", ".cm-close", function () {
        $(this).parent().fadeOut();
    });
})
