document.addEventListener('DOMContentLoaded', function () {
    const themeLink = document.getElementById('theme-link');
    const toggleCheckbox = document.getElementById('toggle-checkbox');
    const modeText = document.getElementById('mode-text');

    // Load saved theme from localStorage if available
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Event listener for the toggle switch
    toggleCheckbox.addEventListener('change', function () {
        const newTheme = toggleCheckbox.checked ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Function to set the theme
    function setTheme(mode) {
        if (mode === 'dark') {
            themeLink.setAttribute('href', './css/dark.css');
            toggleCheckbox.checked = true;
            modeText.textContent = 'Dark Mode';
        } else {
            themeLink.setAttribute('href', './css/light.css');
            toggleCheckbox.checked = false;
            modeText.textContent = 'Light Mode';
        }
        localStorage.setItem('theme', mode); // Save the theme preference in localStorage
    }
});
