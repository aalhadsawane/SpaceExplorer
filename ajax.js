
var button = document.getElementById('search');
var List = document.getElementById('viewList');
var form = document.getElementById('movieForm');
var maxRes =  document.getElementById('maxres');


form.addEventListener('submit', loadmovies);

function loadmovies(e){

    var limit;
    try {
        limit = parseInt(maxRes.value, 10);
        if(limit > 50){
            limit = 50;
        }
        if(limit < 1){
            limit = 50;
        }
    } catch (error) {
        limit = 50;
    }
    
    e.preventDefault();
    //See the moviename from the textbox
    var moviename = document.getElementById('movieTitle').value;
    List.innerHTML = '<img src="images/loading.gif"></img>'
    
    axios.get(('https://images-api.nasa.gov/search?page=1&media_type=image,video&q=' + moviename))
    .then(res => {
        
        len = res.data.collection.items.length;
        if(len > limit){
            len = limit;
        }
        var output = '';
        for(let i = 0; i < len; i++){
            try {
                output += '<div class="searchResult card">';
                if(res.data.collection.items[i].data[0].media_type == "image"){
                    output += '<img class="card-img-top" src="';
                    output += res.data.collection.items[i].links[0].href;
                    output += '"></img>';
                }
                if(res.data.collection.items[i].data[0].media_type == "video"){
                    output += '<video controls>';
                    output += '<source src="';
                    //output += res.data.collection.items[i].links[0].href;
                    output += res.data.collection.items[i].links[0].href.replace("thumb.jpg", "orig.mp4")
                    output += '">';
                    output += '</video>';
                    
                }
               



                output += '<div class="card-body">'
                output += '<h3 class="title card-title">';
                output += res.data.collection.items[i].data[0].title;
                output += '</h3>';
                output += '<p class="description card-text">';
                output += res.data.collection.items[i].data[0].description;
                output += '</p>';
                output += '</div>'
                output += '</div>'
            } catch (error) {
                output += "";
                
            }
            
            
            
            //console.log(res.data.collection.items[i].data[0].title);
            //console.log(res.data.collection.items[i].data[0].description);
            
        }
        if(output == ""){
            
            output = '<div class="validSearch">Nothing Found. Try using other keywords or shortening your search to lesser words.</div>';
            output += '<img src="images/nothing_here.jpg" id="nothing_here"></img>'
        }
        List.innerHTML = output;
        
        
    }).catch(err => console.error(err));
}