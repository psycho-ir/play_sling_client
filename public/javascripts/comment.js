/**
 * Created by soroosh on 4/16/15.
 */

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
                var commentTemplate = $('#comment-template').html();
                for (var i in comments) {
                    itemsContainer.append(commentTemplate
                        .replace('$comment', comments[i].comment)
                        .replace('$date', new Date(comments[i].createdAt).toLocaleFormat('%d-%b-%Y')))
                }


            },
            error: function (e) {
                console.log(e);
            }
        }
    );
}

function comment(token, ideaId, comment) {

    $.ajax({
        method: "POST",
        url: "http://localhost:9000/api/ideas/" + ideaId + "/comments",
        headers: {
            "X-Auth-Token": userToken
        },
        //data: $('#idea-form').serialize(),
        data: JSON.stringify({
            "comment": comment
        }),
        success: function (e, t) {
            console.log(e);
            console.log(t);
            showComments(userToken, ideaId);

        },
        error: function (e) {
            console.log(e);
        },
        type: "application/json",
        contentType: "application/json"

    });
}

$(document).ready(function () {

    $(document).on("click", ".comment", function () {
        var ideaId = $(this).data('ideaid');
        var commentText = $('#idea-' + ideaId + ' #commentText').val();
        comment(userToken, ideaId, commentText);
    });
});