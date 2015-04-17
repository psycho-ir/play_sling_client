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
                        .replace('$date',moment(comments[i].createdAt).format('MMMM Do YYYY')))
                }


            },
            error: function (e) {
                console.log(e);
            }
        }
    );
}

function showAttachedFiles(token, ideaId) {
    $.ajax({
        method: "GET",
        url: "http://localhost:9000/api/ideas/" + ideaId + "/files",
        headers: {
            "X-Auth-Token": token
        },
        success: function (e, t) {
            var attachs = e;
            var attachmentContainer = $('#idea-' + ideaId + ' .attachs');
            attachmentContainer.fadeIn();
            var itemsContainer = attachmentContainer.find('.attach-items');
            itemsContainer.empty();

            if (attachs.length == 0) {
                itemsContainer.append('<div>No attachment file exist</div>');
                return;
            }
            for (var i in attachs) {
                itemsContainer.append('<a href="#"><span class="glyphicon glyphicon-file"></span> File ' + (parseInt(i)+1) + '</a><br />');
            }


        },
        error: function (e) {
            console.log(e);
        }
    });
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