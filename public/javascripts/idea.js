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
                $('#ideas').fadeIn();
                $('#ideas .row').empty();
                for (var i in ideas) {

                    +ideas[i].name +
                    $('#ideas .row').append(template.replace('$name', ideas[i].name)
                        .replace('$description', ideas[i].description)
                        .replace('$state', ideas[i].state)
                        .replace('$css', colors[ideas[i].state])
                        .replace('$likeCount', ideas[i].likeCount)
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

function showComments(token, ideaId) {
    $.ajax({
            method: "GET",
            url: "http://localhost:9000/api/ideas/" + ideaId + "/comments",
            headers: {
                "X-Auth-Token": token
            },
            success: function (e, t) {
                var comments = e;
                var cmContainer = $('#idea-' + ideaId + ' .comments');
                cmContainer.fadeIn();
                var itemsContainer = cmContainer.find('.comments-items');
                itemsContainer.empty();
                if (comments.length == 0) {
                    itemsContainer.append('<div>No comments exist</div>');
                    return;
                }
                for (var i in comments) {
                    itemsContainer.append('<div>' + comments[i].comment + '</div>')
                }


            },
            error: function (e) {
                console.log(e);
            }
        }
    );
}

$(document).ready(function () {
    $('#idea-save').click(function () {
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

    $(document).on("click", ".cm-close", function () {
        console.log("d")
        $(this).parent().fadeOut();
    });
})
