$(document).ready(function () {
    $(".btn-success").on("click", function () {
        console.log(this.id)
        $.ajax(
            {
                url: `/api/` + this.id,
                method: "PUT",
                data: { saved: true }
            })
            .then(function (data) {
                alert(data)
                location.reload()
            })
    })

    $(".btn-danger").on("click", function () {
        console.log(this.id)
        $.ajax(
            {
                url: `/api/` + this.id,
                method: "PUT",
                data: { saved: false }
            })
            .then(function (data) {
                alert(data)
                location.reload()
            })
    })
    $(".btn-secondary").on("click", function(){
        $.ajax({
            url: "/api",
            method: "DELETE"
        }).then(function(data){
            location.reload()
        })
    })
    $(".btn-primary").on("click", function(){
        $.ajax({
            url: "/",
            method: "GET"
        }).then(function(data){
            location.reload()
        })
    })

})