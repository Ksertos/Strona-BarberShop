document.addEventListener('DOMContentLoaded', () => {
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentsList = document.getElementById('appointmentsList');
  const ratingForm = document.getElementById('ratingForm');
  let appointments = [];

  appointmentForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      const newAppointment = {
          id: Date.now(),
          name,
          date,
          time
      };

      if (!isTimeSlotAvailable(newAppointment)) {
          alert('Ten termin jest już zajęty. Wybierz inny termin.');
          return;
      }

      appointments.push(newAppointment);
      renderAppointments();
      appointmentForm.reset();
  });

  ratingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const rating = parseInt(document.getElementById('rating').value);
      alert(`Dziękujemy za ocenę: ${rating}`);
      ratingForm.reset();
  });

  function isTimeSlotAvailable(newAppointment) {
      return !appointments.some(appointment => 
          appointment.date === newAppointment.date && appointment.time === newAppointment.time
      );
  }

  function renderAppointments() {
      appointmentsList.innerHTML = '';

      if (appointments.length === 0) {
          const noAppointmentsMessage = document.createElement('li');
          noAppointmentsMessage.textContent = 'Brak rezerwacji';
          noAppointmentsMessage.classList.add('no-appointments');
          appointmentsList.appendChild(noAppointmentsMessage);
      } else {
          appointments.forEach(appointment => {
              const li = document.createElement('li');
              li.textContent = `${appointment.name} - ${appointment.date} - ${appointment.time}`;

              const cancelButton = document.createElement('button');
              cancelButton.textContent = 'Odwołaj';
              cancelButton.addEventListener('click', () => {
                  appointments = appointments.filter(a => a.id !== appointment.id);
                  renderAppointments();
              });

              li.appendChild(cancelButton);
              appointmentsList.appendChild(li);
          });
      }
  }

  // Initial render
  renderAppointments();
});
