$(document).ready(function(){
    console.log("fuck");
    $("h1").html("iyaa");
    $.get("http://localhost:8080/469small.html", function(file) {
        var html = $.parseHTML(file);
        var cont = $(html).contents().find("span");

        var html = $.parseHTML(file);
        var cont2 = $(html).find("p");
        // var cont2 = $(html).contents().find("sp");
        // console.log(cont2.innerHTML);

        console.log(cont2[5].innerHTML);

        var spans = [];
        for (var x = 0; x < cont.length; x++) {
            spans[x] = cont[x].innerHTML;
            
        }

        var spans2 = [];
        for (var x = 0; x < cont2.length; x++) {
            var data = cont2[x].innerHTML;
            if (data.replace(/\s/g, '').length) {
                spans2.push(data);
            }
        }

        console.log(spans,spans2)
        
    });
 
 });