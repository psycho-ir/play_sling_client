/**
 * Created by soroosh on 4/16/15.
 */

function like(what, id,callback) {
    $.ajax({
            method: "GET",
            url: "http://localhost:9000/api/" + what + "/" + id + "/like",
            headers: {
                "X-Auth-Token": userToken
            },
            success: function (e, t) {
                callback();
            },
            error: function (e) {
                console.log(e);
            }
        }
    );
}
function likeIdea(ideaId) {
    function callback(){
        var likeContainer = $('#idea-' + ideaId + ' #likeCount');
        likeContainer.text(parseInt(likeContainer.text())+1);
    }
    like('idea',ideaId,callback);
}
function likeComment(cmId) {
    like('comment',cmId);
}

$(document).ready(function(){

    $(document).on("click", ".like", function () {
        likeIdea($(this).data('ideaid'));
    });
});