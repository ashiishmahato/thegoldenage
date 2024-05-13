document.addEventListener('DOMContentLoaded', function() {
    const appointmentInput = document.getElementById('appointmentInput');
    const dateTimeInput = document.getElementById('dateTimeInput');
    const scheduleBtn = document.getElementById('scheduleBtn');
    const appointmentList = document.getElementById('appointmentList');
    const notification = document.getElementById('notification');
  
    scheduleBtn.addEventListener('click', function() {
      const appointmentText = appointmentInput.value.trim();
      const dateTimeText = dateTimeInput.value.trim();
  
      if (appointmentText !== '' && dateTimeText !== '') {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span>${appointmentText}</span>
          <span>${formatDateTime(dateTimeText)}</span>
          <button class="delete-btn">Cancel</button>
        `;
        appointmentList.appendChild(listItem);
        appointmentInput.value = '';
        dateTimeInput.value = '';
  
        
        saveAppointment(appointmentText, dateTimeText);
  
        
        listItem.querySelector('.delete-btn').addEventListener('click', function() {
          listItem.remove();
         
          removeAppointment(appointmentText, dateTimeText);
          checkAppointments();
        });
  
        checkAppointments();
        showNotification('Appointment scheduled successfully.');
      } else {
        showNotification('Please enter appointment details.', 'error');
      }
    });
  
    function formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
      return date.toLocaleString('en-US', options);
    }
  
    function checkAppointments() {
      if (appointmentList.children.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No appointments scheduled';
        listItem.classList.add('no-appointments');
        appointmentList.appendChild(listItem);
      } else {
        const noAppointments = document.querySelector('.no-appointments');
        if (noAppointments) {
          noAppointments.remove();
        }
      }
    }
  
    function saveAppointment(appointmentText, dateTimeText) {
      let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      appointments.push({ text: appointmentText, dateTime: dateTimeText });
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  
    function removeAppointment(appointmentText, dateTimeText) {
      let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
      appointments = appointments.filter(appointment => !(appointment.text === appointmentText && appointment
        .dateTime === dateTimeText));
        localStorage.setItem('appointments', JSON.stringify(appointments));
      }
    
      function showNotification(message, type = 'success') {
        const notificationDiv = document.createElement('div');
        notificationDiv.classList.add('notification');
        if (type === 'success') {
          notificationDiv.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
          notificationDiv.style.backgroundColor = '#dc3545';
        }
        notificationDiv.textContent = message;
        notification.appendChild(notificationDiv);
        
        setTimeout(() => {
          notification.removeChild(notificationDiv);
        }, 3000);
      }
    
      function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.forEach(appointment => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <span>${appointment.text}</span>
            <span>${formatDateTime(appointment.dateTime)}</span>
            <button class="delete-btn">Cancel</button>
          `;
          appointmentList.appendChild(listItem);
    
          
          listItem.querySelector('.delete-btn').addEventListener('click', function() {
            listItem.remove();
            removeAppointment(appointment.text, appointment.dateTime);
            checkAppointments();
          });
        });
        checkAppointments();
      }
    
     
      loadAppointments();
    });
    