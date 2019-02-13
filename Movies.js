$(document).ready(() =>{
$('#SearchForm').on('submit' ,(e) =>{
	e.preventDefault();
	let searchedMovie = $('#Search').val();
	getMovies(searchedMovie);

});
});

function getMovies(searchedMovie){
	axios.get('http://www.omdbapi.com/?apikey=8fead50e&s='+searchedMovie).
	then((response)=>{
		console.log(response);
		let movies = response.data.Search;
		let output = '';
		$.each(movies,function(i,movie){
			output+=`
			 <div class="col-md-3">
			 	<div class="well text-center">
			 	<img src="${movie.Poster}"/>
			 	<h5>${movie.Title}</h5>
			 	<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
			 	</div>
			 	</div>
			`;
		});
		$('#Movies').html(output)
	})
	.catch((err)=>{
		console.log(err)
	})
}
function movieSelected(id){
	sessionStorage.setItem('movieID', id);
	window.location = 'Movie.html';
	return false
}

function getMovie(){
	let movieID = sessionStorage.getItem('movieID');

	axios.get('http://www.omdbapi.com?apikey=8fead50e&i='+movieID).
	then((response)=>{
		console.log(response);
		let movie = response.data;
		let output = `
		<div class="row">
		 <div class="col-md-4">
		  <img src="${movie.Poster}" class="thumbnail">
		  </div>
		  <div class="col-md-8">
		  <h2>${movie.Title}</h2>
		  <ul class="list-group">
		  <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre} </li>
		  <li class="list-group-item"><strong>Released:</strong> ${movie.Released} </li>
		  <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated} </li>
		  <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating} </li>
		  <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors} </li>
		  <li class="list-group-item"><strong>Director:</strong> ${movie.Director} </li>
		  <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer} </li>
		  </ul>
		  </div>
		  </div>
		  <div class="row">
		  <div class="well">
		  	<h3>Plot</h3>
		  	${movie.Plot}
		  	<hr>
		  	<a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
		  	<a href="index.html" class="btn btn-default">Go Back</a>
		  	</div>
		  	</div>
		`;
		$('#Movie').html(output);
	})
}