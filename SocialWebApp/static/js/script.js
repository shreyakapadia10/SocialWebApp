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
        my_data.append("query", "search");
        my_data.append("csrfmiddlewaretoken", csrftoken);
        
        $.ajax({
            type: "POST",
            url: "/search/",
            dataType: "json",
            contentType: false,
            processData: false,
            data: my_data,

            success: function (data) {
                if(data.msg == 'success'){
                    $('#update_div').css('display', 'block');
                    $('#first_name').val(data.first_name);
                    $('#last_name').val(data.last_name);
                    $('#dob').val(data.dob);
                    $('#address').val(data.address);
                    $('#email').val(data.email);
                    $('#country').val(data.country);
                    $('#graduation').val(data.graduation);
                    $('#hobbies').val(data.hobbies);
                    $('#password').val(data.password);
                    
                    $('#update').css('display', 'inline-block');
                }
                else{
                    alert('No such user found!')
                }
            },

            failure: function (data) {
                // console.log(data);
            }
        });
    });


    $('#update').on('click', function(e){
        e.preventDefault();

        let my_data = new FormData();
        let id =  $('#ID').val();
        let first_name = $('#first_name').val();
        let last_name =  $('#last_name').val();
        let dob =  $('#dob').val();
        let address = $('#address').val();
        let country = $('#country').val();
        let hobbies = $('#hobbies').val();
        let graduation = $('#graduation').val();
        let email = $('#email').val();
        let password = $('#password').val();

        my_data.append("query", "update");
        my_data.append("ID", id);
        my_data.append("first_name", first_name);
        my_data.append("last_name", last_name);
        my_data.append("dob", dob);
        my_data.append("address", address);
        my_data.append("country", country);
        my_data.append("hobbies", hobbies);
        my_data.append("graduation", graduation);
        my_data.append("email", email);
        my_data.append("password", password);
        my_data.append("csrfmiddlewaretoken", csrftoken);

        $.ajax({
            type: "POST",
            url: "/search/",
            dataType: "json",
            contentType: false,
            processData: false,
            data: my_data,

            success: function (data) {
                if(data.msg == "success"){
                    alert('Updated Successfully!')
                }
                else{
                    alert('Can\'t Update information!')
                }
                location.reload();
            },

            failure: function (data) {
                // console.log(data);
            }
        });
    });
});