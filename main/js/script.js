var arr_book_title=['Hit Refresh', 'Letters to My Ex', 'Stranger Series', 'Love a Little Stronger', 'A Clear Blue Sky'], arr_book_author_name=['Satya Nadella', 'Nikita Singh', 'Novoneel Chakraborty', 'Preeti Shenoy', 'N.R.Narayana Murthy'], arr_book_genre=[3, 2, 6, 9, 8], arr_book_description=['The Quest to Rediscover Microsoft\'s Soul and Imagine a Better Future for Everyone.', 'A Story of heartbreak and things Left unsaid.', 'One of the Best Series from the master of Love and Thriller.', 'Positive and Full of Life.', 'Stories and Poems on Conflict and Hope.'];
var available_book_genre=['Select Genre','Horror', 'Love', 'Tech', 'Thriller', 'Detective', 'Love & Thrill', 'Romantic', 'Poetry', 'Life', 'Self Help'];
var book_row = "";
			
var flag_book_title = 0, flag_author = 0, flag_genre = 0;
var flag_edit_book_title = 1, flag_edit_author = 1, flag_edit_genre = 1;
			
var editBookId = "";
var deleteBookId = "";
			
getBookShelf();
			
function emptyAddBookForm()
{
	document.getElementById('book_title').value="";
	document.getElementById('author_name').value="";
	document.getElementById('genre').selectedIndex = 0;
	document.getElementById('description').value="";
				
	$('#book_title, #author_name, #genre').removeClass('is-valid');
				
	$('#book_title_char_count').html(50);
	$('#book_author_name_char_count').html(30);
				
	flag_book_title = flag_author  = flag_genre = 0;
}
			
function cleanArray(array_name)
{
	var filteredArray = array_name.filter(el => { 
		return el != null && el != '';
	});
				
	return filteredArray;
}
			
function getBookShelf()
{
	var shelf_size = arr_book_title.length;
				
	if(shelf_size != 0)
	{
		book_row = "";
		for(var j=0; j < shelf_size; j++)
		{
			book_row += '<tr><td><strong>'+(j+1)+'.</strong></td><td>'+(arr_book_title[j])+'</td><td>'+arr_book_author_name[j]+'</td><td>'+available_book_genre[arr_book_genre[j]]+'</td><td>'+arr_book_description[j]+'</td><td> <div class="btn-group" role="group"> <button class="btn btn-outline-primary btn-sm editBookBtn" data-bs-toggle="modal" data-bs-target="#editBook" data-bookId="'+j+'"><i class="fa fa-pencil-alt fa-fw"></i></button><button class="btn btn-outline-danger btn-sm deleteBookConfirm" data-bs-toggle="modal" data-bs-target="#deleteBookConfirm" data-bookId="'+j+'"><i class="fa fa-trash fa-fw"></i></button> </div> </td></tr>';
		}
		$('#table_data').empty();
		$('#table_data').append(book_row);
	}
	else
	{
		$('#table_data').empty();
		$('#table_data').append('<tr><td colspan="6"><p class="alert alert-warning text-center">Empty Shelf!<br/>Use &nbsp;<button class="btn btn-success btn-sm">Add Book</button> &nbsp;to add a new book to your shelf.</p></td></tr>');
	}
}
			
function getBookGenre()
{
	var book_genre_length = available_book_genre.length;
	for(var i=0; i<book_genre_length; i++)
	{
		if(i == 0)
			$('#genre, #edit_genre').append('<option value="'+i+'" selected>'+available_book_genre[i]+'</option>');
		else
			$('#genre, #edit_genre').append('<option value="'+i+'">'+available_book_genre[i]+'</option>');
	}
}
			
$(document).ready(function(){
				
	getBookGenre();
					 
	$(document).on('mouseup', '#addBookWindow, .editBookBtn', function(){
		$('#notif_msg').empty();
		$('#edit_notif_msg').empty();
	});
					
	$('#book_title').keyup(function(){
						
		var flag1 = 0, flag2 = 0;
		var book_title = $('#book_title').val();
						
		$('#book_title_char_count').html(50 - book_title.length);
						
						
		if(book_title == "")
		{
			$('#book_title').addClass('is-invalid');
			$('#book_title_error').html('Empty Book Title!');
			flag1 = 0;
		}
		else
		{
			flag1 = 1;
			if((50 - book_title.length) <= 0)
			{
				$('#book_title').addClass('is-invalid');
				$('#book_title_error').html('Book Title Max 50 characters allowed!');
				flag2 = 0;
			}
			else
			{
				$('#book_title').removeClass('is-invalid');
				$('#book_title').addClass('is-valid');
				flag2 = 1;
			}
		}
						
		if(flag1 == 0 && flag2 == 0)
		{
			flag_book_title = 0;
		}
		else
		{
			flag_book_title = 1;
		}
	});
				
	$('#author_name').keyup(function(){
		
		var flaga1 = 0, flaga2 = 0;
		var book_author_name = $('#author_name').val();
		
		$('#book_author_name_char_count').html(30 - book_author_name.length);
		
		
		if(book_author_name == "")
		{
			$('#author_name').addClass('is-invalid');
			$('#author_name_error').html('Empty Author Name!');
			flaga1 = 0;
		}
		else
		{
			flaga1 = 1;
			if((30 - book_author_name.length) <= 0)
			{
				$('#author_name').addClass('is-invalid');
				$('#author_name_error').html('Max 30 characters!');
				flaga2 = 0;
			}
			else
			{
				$('#author_name').removeClass('is-invalid');
				$('#author_name').addClass('is-valid');
				flaga2 = 1;
			}
		}
		
		if(flaga1 == 0 && flaga2 == 0)
		{
			flag_author = 0;
		}
		else
		{
			flag_author = 1;
		}
	});
	
	$('#genre').change(function(){
	
		var book_genre = $('#genre').val();
		
		if(book_genre == 0)
		{
			$('#genre').addClass('is-invalid');
			$('#genre_error').html('Select a Genre');
			flag_genre = 0;
		}
		else
		{
			$('#genre').removeClass('is-invalid');
			$('#genre').addClass('is-valid');
			$('#genre_error').empty('Select a Genre');
			flag_genre = 1;
		}
	});
	
	$('#add_book').mouseup(function(){
	
		var book_title = $('#book_title').val();
		var book_author_name = $('#author_name').val();
		var book_genre = $('#genre').val();
		var book_description = $('#description').val();
		
		console.log(flag_book_title);
		console.log(flag_author);
		console.log(flag_genre);
		
		if(flag_book_title == 1 && flag_author == 1 && flag_genre == 1)
		{
			book_row = "";
			arr_book_title.push(book_title);
			arr_book_author_name.push(book_author_name);
			arr_book_genre.push(book_genre);
			
			if(book_description == "")
				arr_book_description.push("-");
			else
				arr_book_description.push(book_description);
			
			getBookShelf();
			
			emptyAddBookForm();
			
			$('#notif_msg').html('<div class="alert alert-success alert-dismissible fade show" role="alert">Book Added Successfully!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
		}
		else
		{
			$('#notif_msg').empty();
			$('#notif_msg').html('<div class="alert alert-danger alert-dismissible fade show" role="alert">There are errors in the form!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
		}
	});
	
	$(document).on('mouseup', '.editBookBtn', function(){
		editBookId = $(this).attr('data-bookId');
		
		$('#edit_book_title').val(arr_book_title[editBookId]);
		$('#edit_author_name').val(arr_book_author_name[editBookId]);
		$('#edit_genre option[value="'+arr_book_genre[editBookId]+'"]').attr("selected", "selected");
		$('#edit_description').val(arr_book_description[editBookId]);
		
	});
	
	$('#edit_book_title').keyup(function(){
		
		var flag1 = 0, flag2 = 0;
		var edit_book_title = $('#edit_book_title').val();
		
		$('#edit_book_title_char_count').html(50 - edit_book_title.length);
		
		
		if(edit_book_title == "")
		{
			$('#edit_book_title').addClass('is-invalid');
			$('#edit_book_title_error').html('Empty Book Title!');
			flag1 = 0;
		}
		else
		{
			flag1 = 1;
			if((50 - edit_book_title.length) <= 0)
			{
				$('#edit_book_title').addClass('is-invalid');
				$('#edit_book_title_error').html('Book Title Max 50 characters allowed!');
				flag2 = 0;
			}
			else
			{
				$('#edit_book_title').removeClass('is-invalid');
				$('#edit_book_title').addClass('is-valid');
				flag2 = 1;
			}
		}
		
		if(flag1 == 0 && flag2 == 0)
		{
			flag_edit_book_title = 0;
		}
		else
		{
			flag_edit_book_title = 1;
		}
	});
	
	$('#edit_author_name').keyup(function(){
		
		var flaga1 = 0, flaga2 = 0;
		var edit_book_author_name = $('#edit_author_name').val();
		
		$('#edit_book_author_name_char_count').html(30 - edit_book_author_name.length);
		
		
		if(edit_book_author_name == "")
		{
			$('#edit_author_name').addClass('is-invalid');
			$('#edit_author_name_error').html('Empty Author Name!');
			flaga1 = 0;
		}
		else
		{
			flaga1 = 1;
			if((30 - edit_book_author_name.length) <= 0)
			{
				$('#edit_author_name').addClass('is-invalid');
				$('#edit_author_name_error').html('Max 30 characters!');
				flaga2 = 0;
			}
			else
			{
				$('#edit_author_name').removeClass('is-invalid');
				$('#edit_author_name').addClass('is-valid');
				flaga2 = 1;
			}
		}
		
		if(flaga1 == 0 && flaga2 == 0)
		{
			flag_edit_author = 0;
		}
		else
		{
			flag_edit_author = 1;
		}
	});
	
	$('#edit_genre').change(function(){
	
		var edit_book_genre = $('#edit_genre').val();
		
		if(edit_book_genre == 0)
		{
			$('#edit_genre').addClass('is-invalid');
			$('#edit_genre_error').html('Select a Genre');
			flag_edit_genre = 0;
		}
		else
		{
			$('#edit_genre').removeClass('is-invalid');
			$('#edit_genre').addClass('is-valid');
			$('#edit_genre_error').empty('Select a Genre');
			flag_edit_genre = 1;
		}
	});
	
	$('#edit_save_book').mouseup(function(){
	
		var edit_book_title = $('#edit_book_title').val();
		var edit_book_author_name = $('#edit_author_name').val();
		var edit_book_genre = $('#edit_genre').val();
		var edit_book_description = $('#edit_description').val();
		
		if(flag_edit_book_title == 1 && flag_edit_author == 1 && flag_edit_genre == 1 && editBookId != "")
		{
			book_row = "";
			
			arr_book_title[editBookId] = edit_book_title;
			arr_book_author_name[editBookId] = edit_book_author_name;
			arr_book_genre[editBookId] = edit_book_genre;
			
			if(edit_book_description == "" || edit_book_description == "-")
				arr_book_description[editBookId] = "-";
			else
				arr_book_description[editBookId] = edit_book_description;
			
			getBookShelf();
			
			$('#edit_notif_msg').html('<div class="alert alert-success alert-dismissible fade show" role="alert">Book Details Updated!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
		}
		else
		{
			$('#edit_notif_msg').empty();
			$('#edit_notif_msg').html('<div class="alert alert-danger alert-dismissible fade show" role="alert">There are errors in the form!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
		}
	});
	
	$(document).on('mouseup', '.deleteBookConfirm', function(){
		deleteBookId = $(this).attr('data-bookId');
		
		$('#delete_book_title').html(arr_book_title[deleteBookId]);
		$('#delete_book_author').html(arr_book_author_name[deleteBookId]);
		
	});
	
	$(document).on('mouseup', '#deleteBookBtn', function(){
		
		delete arr_book_title[deleteBookId];
		delete arr_book_author_name[deleteBookId];
		delete arr_book_genre[deleteBookId];
		delete arr_book_description[deleteBookId];
		
		arr_book_title = cleanArray(arr_book_title);
		arr_book_author_name = cleanArray(arr_book_author_name);
		arr_book_genre = cleanArray(arr_book_genre);
		arr_book_description = cleanArray(arr_book_description);
		
		getBookShelf();
	});
});