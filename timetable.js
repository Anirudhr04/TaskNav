// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHxGnXtuZX1vdflfmfXh2yFqdqcsJsGc8",
    authDomain: "signupform-7ed80.firebaseapp.com",
    databaseURL: "https://signupform-7ed80-default-rtdb.firebaseio.com",
    projectId: "signupform-7ed80",
    storageBucket: "signupform-7ed80.appspot.com",
    messagingSenderId: "438196109597",
    appId: "1:438196109597:web:549cf7f71300053a6b61f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const selectedDayButton = document.getElementById('selected-day');
    const saveButton = document.getElementById('save-timetable');

    const days = {
        'Monday': createTimeSlots(),
        'Tuesday': createTimeSlots(),
        'Wednesday': createTimeSlots(),
        'Thursday': createTimeSlots(),
        'Friday': createTimeSlots(),
        'Saturday': createTimeSlots(),
        'Sunday': createTimeSlots(),
    };

    // Dropdown day selection logic
    const dropdownItems = document.querySelectorAll('.dropdown-content a');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedDay = e.target.getAttribute('data-day');
            
            // Update the dropdown button text to reflect the selected day
            selectedDayButton.innerText = selectedDay;
            
            // Load the corresponding time slots
            loadTimeSlots(selectedDay);
        });
    });

    // Function to create time slots for the whole day (00:00 - 23:00)
    function createTimeSlots() {
        const slots = [];
        for (let i = 0; i < 24; i++) {
            const startHour = i < 10 ? `0${i}:00` : `${i}:00`;
            const endHour = i + 1 < 10 ? `0${i + 1}:00` : `${i + 1}:00`;
            slots.push(`${startHour} - ${endHour}`);
        }
        return slots;
    }

    // Function to load time slots for the selected day
    function loadTimeSlots(day) {
        const slots = days[day];
        timeSlotsContainer.innerHTML = '';  // Clear previous slots

        slots.forEach(slot => {
            const timeSlotDiv = document.createElement('div');
            timeSlotDiv.classList.add('time-slot');
            timeSlotDiv.innerHTML = `
                <label>${slot}</label>
                <input type="checkbox" name="${day}-${slot}" />
            `;
            timeSlotsContainer.appendChild(timeSlotDiv);
        });
    }

    // Default to Monday on load
    loadTimeSlots('Monday');

    // Save timetable to Firebase
    saveButton.addEventListener('click', () => {
        const selectedDay = selectedDayButton.innerText;
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectedSlots = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedSlots.push(checkbox.name);
            }
        });

        // Store the selected day and time slots in Firebase
        set(ref(database, `timetables/${selectedDay}`), {
            day: selectedDay,
            timeSlots: selectedSlots
        })
        .then(() => {
            alert('Timetable saved successfully!');
        })
        .catch((error) => {
            alert('Failed to save timetable: ' + error);
        });
    });
});
