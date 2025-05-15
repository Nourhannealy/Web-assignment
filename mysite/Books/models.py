from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError


class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    book_name = models.CharField(max_length=200)
    author_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)  # No choices
    description = models.TextField()
    image = models.ImageField(
        upload_to='book_images/',
        null=True,
        blank=True,
        help_text="Cover image of the book"
    )
    pages = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5000)
        ],null=True
    )
    publication_date = models.DateField(auto_now_add=True)
    Stock = models.IntegerField()

    class Meta:
        ordering = ['book_name']
        verbose_name = "Book"
        verbose_name_plural = "Books"

    def __str__(self):
        return f"{self.book_name} by {self.author_name}"


    def clean(self):
        """Additional validation"""
        if self.publication_date and self.publication_date.year < 1800:
            raise ValidationError("Publication year must be after 1800")   
