from django import forms
from .models import Book

class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = [
            'book_name',
            'author_name',
            'category',
            'description',
            'pages',
            'Stock',
            'image',
        ]
        widgets = {
            'description': forms.Textarea(attrs={
                'class': 'input_text',
                'rows': 3
            }),
            'pages': forms.NumberInput(attrs={
                'class': 'input_text'
            }),
            'Stock': forms.NumberInput(attrs={
                'class': 'input_text'
            }),
            'image': forms.FileInput(attrs={
                'class': 'upload-button'
            }),
        }
        labels = {
            'book_name': 'Book Name',
            'author_name': 'Author',
            'Stock': 'Stock',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Add common class to text inputs
        for field in ['book_name', 'author_name', 'category']:
            self.fields[field].widget.attrs.update({'class': 'input_text'})