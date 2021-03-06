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
      /*
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
     }); */
     

    
    

    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search=${$("#search").val()}&limit=10`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        function generateHTML(title, snippet, url) {
          let wikiHTML = `<a class="wiki-entry" target="_blank" href=${url}><h3>${title}</h3><hr><p>${snippet}</p></a>`;
          $(".loading-spinner").hide();
          $("#results").append(wikiHTML); 
        }
          /*
                    '<a class="wiki-entry" target="_blank" href="' + url + '">' +
                     
                          '<h3>' + title + '</h3><hr>' + 
                    '<p>'+ snippet +
                     '</p>' +
                       '</a>';*/
            
   
        if (data[1].length === 0) {
          $("#results").html('<h1 class="not-found">No entries found, try searching for something else!</h1>');
          $(".loading-spinner").hide();
        } else {

          for (let i = 0; i < data[1].length; i++) {
            var title = data[1][i];
            var snippet = data[2][i];
            var url = data[3][i];
            generateHTML(title, snippet, url);

          }
        }
      })
      .catch(() => {
        $(".loading-spinner").hide();
        $("#results").html('<h1 class="error-msg">Could not load data from Wikipedia</h1>');
        console.log('error!');
      });
      
  }
 });
  
  //random wikipedia article
  
  $("#random").click(function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random","_blank")
  });
  
  
  
});