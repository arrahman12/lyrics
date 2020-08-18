document.getElementById("search_button").addEventListener("click",function () {


    const keyword = document.getElementById("keyword").value;


    fetch(`https://api.lyrics.ovh/suggest/${keyword}`)
        .then(res => res.json())
        .then(data =>{

            for (var i = 0; i<10; i++){

                const artist = data.data[i].artist.name;
                const title = data.data[i].title;
                const album = data.data[i].album.title;
                const result = document.getElementById("single-result");

                const child = `   <div id="single-result" class=" row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 id="name" class="lyrics-name">${title}</h3>
                         <h6 id="artist" class="lyrics-name">${artist}</h6>
                        <p class="author lead">Album by <span id="album">${album}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button id="btn" onclick="getLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div> `;




                result.innerHTML += child;
                document.getElementById("keyword").value = " ";

            }

        })


})



function getLyrics(artist,title) {

    fetch("https://api.lyrics.ovh/v1/"+artist+"/"+title+"")
        .then(res => res.json())
        .then(data =>{
          //  const title = title;

            let  lyrics = " ";
            lyrics = data.lyrics;

            if (lyrics === undefined){
                const childs = "   <button class=\"btn go-back\">&lsaquo;</button>\n" +
                    "                <h2 class=\"text-success mb-4\"></h2>\n" +
                    "                <pre class=\"lyric text-white\">\n" + "No lyrics found"
                    +
                    "                </pre> ";

                const result = document.getElementById("full_lyrics");
                result.innerHTML += childs;
            }
            else {
                const childs = "   <button class=\"btn go-back\">&lsaquo;</button>\n" +
                    "                <h1 class=\"text-success mb-4\">" +
                    title +
                    "</h1>\n" +
                    "                <pre class=\"lyric text-white\">\n" + lyrics
                    +
                    "                </pre> ";

                const result = document.getElementById("full_lyrics");
                result.innerHTML += childs;
            }


        })



}