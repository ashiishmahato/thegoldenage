document.addEventListener('DOMContentLoaded', function() {
    const eventList = document.getElementById('event-list');
  
    
    const events = [
      { title: 'Senior Yoga Class', date: 'April 10, 2024', time: '10:00 AM - 11:00 AM', location: 'Community Center' },
      { title: 'Art Workshop for Seniors', date: 'April 15, 2024', time: '2:00 PM - 4:00 PM', location: 'Art Studio' },
      { title: 'Health Seminar: Aging Well', date: 'April 20, 2024', time: '3:00 PM - 5:00 PM', location: 'Library Auditorium' }
    ];
  
    
    events.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.classList.add('event');
  
      const titleElement = document.createElement('h2');
      titleElement.classList.add('event-title');
      titleElement.textContent = event.title;
  
      const detailsElement = document.createElement('div');
      detailsElement.classList.add('event-details');
      detailsElement.innerHTML = `
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
      `;
  
      eventElement.appendChild(titleElement);
      eventElement.appendChild(detailsElement);
      eventList.appendChild(eventElement);
    });
  });
  