const csrftoken = getCookie('csrftoken');

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function () {
    $('#search').on('click', function(e){
        e.preventDefault();
        
        let id = $('#ID').val();
        
        let my_data = new FormData();
        my_data.append("ID", id);
        my_data.append("csrfmiddlewaretoken", csrftoken);

        $.ajax({
            type: "POST",
            url: "/search",
            dataType: "json",
            data: my_data,

            success: function (data) {
                console.log(data);
            },

            failure: function (data) {
                console.log(data);
            }
        });

    });
});