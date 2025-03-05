    /* Log Popup */
    
    function openAddLog(){
        document.getElementById("myPopup").style.display = "block";
    }
    
    function closeAddLog(){
        document.getElementById("myPopup").style.display = "none";
    }
    
    /* Roadmap Popup */
    
    function openRoadmap(){
        document.getElementById("roadmap-popup").style.display = "block";
    }
    
    function closeRoadmap(){
        document.getElementById("roadmap-popup").style.display = "none";
    }
    
    /* Challenge Popup */
    function openChallenges() {
        document.getElementById("challenge-popup").style.display = "block";
    }
    
    function closeChallenges() {
        document.getElementById("challenge-popup").style.display = "none";
    }
    
    /* Search functionality */
    document.addEventListener('DOMContentLoaded', () => {
        const challengeButton = document.getElementById("challenge-button");
        if (challengeButton) {
            challengeButton.addEventListener("click", openChallenges);
        }
    
        // Challenge Data (Replace with actual data later)
        const challengeList = document.getElementById("challenge-list");
        const challenges = [
            { name: "Read 5 Books", progress: 3, goal: 5 },
            { name: "Read Daily for 7 Days", progress: 5, goal: 7 }
        ];
    
        if (challengeList) {
            challenges.forEach(challenge => {
                let listItem = document.createElement("li");
                listItem.textContent = `${challenge.name} - ${challenge.progress}/${challenge.goal}`;
                challengeList.appendChild(listItem);
            });
        }    
         /* Search functionality */
        const searchBox = document.getElementById('search-input');
        const resultsDiv = document.getElementById('results');
        const popupForm = document.getElementById('popup-form');
        const detailsPopup = document.getElementById('detailsPopup');
        const selectedBookTitle = document.getElementById('selected-book-title');
        
        window.searchBooks = async () => {
            const query = searchBox.value.trim();
            // Construct the API URL with the encoded search query parameter to avoid special character issues
            const apiUrl = `http://127.0.0.1:5000/api/record?title=${encodeURIComponent(query)}`;
            
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                resultsDiv.innerHTML = '';
    
                // Displays results beneath search bar
                if(data.length > 0) {
                    data.forEach(record => {
                        const [title, image, author, pages, genre, band] = record;
                        const recordElement = document.createElement('div');
                        recordElement.className = 'search-result';
                        recordElement.innerHTML = `
                        <h3>${title}</h3>
                        <p>Author: ${author}</p>
                        <p>Pages: ${pages}</p>
                        <p>Genre: ${genre}</p>
                        <p>Band: ${band}</p>`;
                        recordElement.addEventListener('click', () => {
                            openDetailsPopup(title);
                        });
                        resultsDiv.appendChild(recordElement);
                    });
                } else {
                    resultsDiv.textContent = 'No results found';
                }
            } catch (error) {
                resultsDiv.textContent = 'Error fetching data.';
                console.error('Error fetching data:', error);
            }
        };
    
        // Function to open the book details popup
        function openDetailsPopup(bookTitle) {
            selectedBookTitle.textContent = bookTitle;
            detailsPopup.style.display = 'flex';
        }
    
        // Function to close the book details popup 
        window.closeDetailsPopup = function() {
            detailsPopup.style.display = 'none';
        }
    
        // Function to save book log details
        window.saveLog = function() {
            const pagesRead = document.getElementById('pages-read').value;
            const timeSpent = document.getElementById('time-spent').value;
            const bookTitle = selectedBookTitle.textContent;
    
            console.log(`Book: ${bookTitle}, Pages Read: ${pagesRead}, Time Spent: ${timeSpent}`);
    
            closeDetailsPopup();
            closeAddLog();
        }
    });
