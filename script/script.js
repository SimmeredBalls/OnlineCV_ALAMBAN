const courses = "https://raw.githubusercontent.com/SimmeredBalls/OnlineCV_ALAMBAN/refs/heads/main/script/courses.json";
  
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const resultsDiv = document.getElementById('results');
  
  function displayResults(searchTerm) {
    resultsDiv.innerHTML = '';
  
    const filteredCourses = courses.courses.filter(course => {
      const searchString = `${course.year_level} ${course.sem} ${course.code} ${course.description}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
  
    if (filteredCourses.length === 0) {
      resultsDiv.innerHTML = "<p>No courses found.</p>";
      return;
    }
  
    filteredCourses.forEach(course => {
      const courseDiv = document.createElement('div');
      courseDiv.classList.add('course-item');
      courseDiv.innerHTML = `
        <p><strong>${course.code}</strong> - ${course.description}</p>
        <p>Year: ${course.year_level}, Semester: ${course.sem}, Credits: ${course.credit}</p>
      `;
      resultsDiv.appendChild(courseDiv);
    });
  }
  
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    displayResults(searchTerm);
  });
  
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const searchTerm = searchInput.value;
      displayResults(searchTerm);
    }
  });
  