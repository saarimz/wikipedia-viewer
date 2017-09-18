$(document).ready(function(){
  
  $(".loading-spinner").hide();

  //clear button
  $("#clear").click(function(){
    if ($("#search").val() !== "") {
     $("#search").val("");
     $("#clear").css("visibility","hidden");
     $("#results").html("");
    }
  });
  
  //clear button hidden
  if ($("#search").val() == "") {
    $("#clear").css("visibility","hidden");
  }
  
  
 $("#search").keyup(function(){
   $("#results").html("");
   if ($("#search").val() == "") {
    $("#clear").css("visibility","hidden");
  }
   else {
    $("#clear").css("visibility","inherit");
  }
   
   $(".loading-spinner").show();
     if ($("#search").val().length > 0) {
      
     $.ajax(
       {
       url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+$("#search").val()+"&limit=8&callback=?",
       type: "GET",
       dataType: 'json',
       contentType: "application/json; charset=utf-8",
       error: function(){
       $("#results").html('<h1 class="error-msg">Could not load data from Wikipedia</h1>');
       }
     }).done(function(data){
       var wikiHTML = "";
       if (data[1].length === 0) {
        $("#results").html('<h1 class="not-found">No entries found, try searching for something else!</h1>');
        $(".loading-spinner").hide();
       }
       else {
          for (var i=0; i < data[1].length; i++) {
              var title = data[1][i];
              var snippet = data[2][i];
              var url = data[3][i];
              wikiHTML += 
                '<a class="wiki-entry" target="_blank" href="' + url + '">' +
                 
                      '<h3>' + title + '</h3><hr>' + 
                '<p>'+ snippet + '</p>' +
                   '</a>';
          }
          $(".loading-spinner").hide();
          $("#results").append(wikiHTML);
        }
     }); 
     /*

     let headers = new Headers({
    'Access-Control-Allow-Origin':'*'
    });

    fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${$("search").val()}&limit=8`, {
      method: 'get',
      mode: 'no-cors',
      header: headers 
    })
      .then((response) => response.json())
      .then((data) => {
        let wikiHTML = "";
        if (data[1].length === 0) {
          $("#results").html('<h1 class="not-found">No entries found, try searching for something else!</h1>');
          $(".loading-spinner").hide();
        } else {
          data[1].forEach(function(val,index, arr){
            let title = val;
            let snippet = arr[2][index];
            let url = arr[3][index];
            wikiHTML += 
                '<a class="wiki-entry" target="_blank" href="' + url + '">' +
                 
                      '<h3>' + title + '</h3><hr>' + 
                '<p>'+ snippet + '</p>' +
                   '</a>';
            $(".loading-spinner").hide();
            $("#results").append(wikiHTML);       
          });
        }
      })
      .catch(() => {
        $("#results").html('<h1 class="error-msg">Could not load data from Wikipedia</h1>');
        $(".loading-spinner").hide();
        console.log('error!');
      });
      */
  }
 });
  
  //random wikipedia article
  
  $("#random").click(function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random","_blank")
  });
  
  
  
});