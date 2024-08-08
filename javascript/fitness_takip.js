document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('workoutForm');
    const workoutList = document.getElementById('workoutList');
    let workouts = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const date = document.getElementById('date').value;
        const exercise = document.getElementById('exercise').value;
        const duration = document.getElementById('duration').value;

        if (date && exercise && duration) {
            const workout = {
                id: Date.now(),
                date,
                exercise,
                duration    
            };
            workouts.push(workout);
            renderWorkouts();
            form.reset();
        }
    });

    function renderWorkouts() {
        workoutList.innerHTML = '';
        workouts.forEach(workout => {
            const workoutItem = document.createElement('li');
            workoutItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            workoutItem.innerHTML = `
                ${workout.date} - ${workout.exercise} - ${workout.duration} dakika
                <div>
                    <button class="btn btn-custom-edit btn-sm" onclick="editWorkout(${workout.id})">Düzenle</button>
                    <button class="btn btn-custom-print btn-sm" onclick="printWorkout(${workout.id})">Yazdır</button>
                    <button class="btn btn-custom-location btn-sm" onclick="locationWorkout(${workout.id})">Konum</button>
                </div>
            `;
            workoutList.appendChild(workoutItem);
        });
    }

    window.editWorkout = (id) => {
        const workout = workouts.find(w => w.id === id);
        if (workout) {
            document.getElementById('date').value = workout.date;
            document.getElementById('exercise').value = workout.exercise;
            document.getElementById('duration').value = workout.duration;
            deleteWorkout(id);
        }
    };

    window.printWorkout = (id) => {
        const workout = workouts.find(w => w.id === id);
        if (workout) {
            alert(`Yazdırılacak: ${workout.date} - ${workout.exercise} - ${workout.duration} dakika`);
        }
    };

    window.locationWorkout = (id) => {
        const workout = workouts.find(w => w.id === id);
        if (workout) {
            alert(`Konum bilgisi: ${workout.date} - ${workout.exercise}`);
        }
    };

    window.deleteWorkout = (id) => {
        workouts = workouts.filter(w => w.id !== id);
        renderWorkouts();
    };
});

