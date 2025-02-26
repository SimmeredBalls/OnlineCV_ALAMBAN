// script.js
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('my-courses');

let allCourses = []; // Store all courses

function displayResults(courses, searchTerm) {
    resultsDiv.innerHTML = ''; // Clear previous results

    const filteredCourses = courses.filter(course => {
        const searchString = `${course.year_level} ${course.sem} ${course.code} ${course.description}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
    });

    if (filteredCourses.length === 0 && searchTerm !== "") { // Check if search term is not empty
        resultsDiv.innerHTML = "<p>No courses found.</p>";
        return;
    }

    if (searchTerm === "" && allCourses.length > 0) { // Display all if search is empty
        courses = allCourses;
    } else {
        courses = filteredCourses;
    }

    courses.forEach(course => {  // Use the appropriate courses array
        const courseDiv = document.createElement('li'); // Changed to <li>
        courseDiv.classList.add('course-item');
        courseDiv.innerHTML = `
            <p><strong>${course.code}</strong> - ${course.description} |  Year: ${course.year_level}, Semester: ${course.sem}, Credits: ${course.credit}</p>
        `;
        resultsDiv.appendChild(courseDiv);
    });
}


searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    displayResults(allCourses, searchTerm); // Pass allCourses for filtering
});

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value;
        displayResults(allCourses, searchTerm); // Pass allCourses for filtering
    }
});

function fetchCourses() {
    const jsonURL = "https://raw.githubusercontent.com/SimmeredBalls/OnlineCV_ALAMBAN/refs/heads/main/script/courses.json";

    fetch(jsonURL)
        .then(response => response.json())
        .then(data => {
            if (data.courses && Array.isArray(data.courses)) {
                allCourses = data.courses; // Store all courses
                displayResults(allCourses, ""); // Display all courses initially
            } else {
                console.error("Expected 'courses' array but got:", data);
                resultsDiv.innerHTML = "<p>Error loading courses.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching JSON:", error);
            resultsDiv.innerHTML = "<p>Error loading courses.</p>";
        });
}

fetchCourses(); // Call fetchCourses on load to populate the list.