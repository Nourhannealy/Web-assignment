from django.shortcuts import render, get_object_or_404
from .models import Book

# books/views.py

from django.shortcuts import render, redirect
from .forms import BookForm

def admin_add_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin_books_list')  # redirect to some book list or success page
    else:
        form = BookForm()

    return render(request, 'admin_add_book.html', {'form': form})
