document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    const detailsContainer = document.getElementById('details');

    // Clear previous results
    detailsContainer.innerHTML = '';

    if (!searchInput) {
        detailsContainer.innerHTML = '<p>Please enter a book title!</p>';
        return;
    }

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            data.items.forEach((bookItem) => {
                const book = bookItem.volumeInfo;

                const bookTitle = book.title || 'Title not available';
                const bookImage = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/128x193?text=No+Image';
                const bookDescription = book.description || 'Description not available';
                const bookLink = book.previewLink || '#';
                const bookRating = book.averageRating ? `Rating: ${book.averageRating}` : 'No rating';
                const bookCategories = book.categories ? `Categories: ${book.categories.join(', ')}` : 'No categories available';

                // Create and append the book details
                const bookCard = document.createElement('div');
                bookCard.classList.add('book-card');

                bookCard.innerHTML = `
                    <img src="${bookImage}" alt="${bookTitle}" class="book-image">
                    <h3>${bookTitle}</h3>
                    <p><strong>Description:</strong> ${bookDescription}</p>
                    <p><strong>Rating:</strong> ${bookRating}</p>
                    <p><strong>Categories:</strong> ${bookCategories}</p>
                    <a href="${bookLink}" target="_blank">View More</a>
                `;

                detailsContainer.appendChild(bookCard);
            });
        } else {
            detailsContainer.innerHTML = '<p>No books found!</p>';
        }
    } catch (error) {
        console.error('Error fetching book details:', error);
        detailsContainer.innerHTML = '<p>An error occurred while fetching book details.</p>';
    }
});
