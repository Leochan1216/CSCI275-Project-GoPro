const userList = document.querySelector('#userList');
const chatHeader = document.querySelector('#chatHeader h2');
const chatMessages = document.querySelector('#chatMessages');

// Example message templates for each user
const messages = {
  'Coach #1': [
    { type: 'left', text: 'Hello! How can I assist you?' },
    { type: 'right', text: 'I need help with my gameplay strategy.' },
  ],
  'Coach #2': [
    { type: 'left', text: 'Hi there! Need any assistance?' },
    { type: 'right', text: 'Yes, please help with my game setup.' },
  ],
  'Coach #3': [
    { type: 'left', text: 'Hello! Do you have any questions?' },
    { type: 'right', text: 'Can you help me improve my shooting skills?' },
  ],
};

userList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const username = e.target.getAttribute('data-username');

    // Update chat header
    chatHeader.textContent = username;

    // Update chat messages
    chatMessages.innerHTML = messages[username]
      .map(
        (msg) =>
          `<div class="flex items-start space-x-4 ${
            msg.type === 'right' ? 'justify-end' : ''
          }">
            ${
              msg.type === 'left'
                ? '<div class="w-8 h-8 bg-gray-300 rounded-full"></div>'
                : ''
            }
            <div class="${
              msg.type === 'right'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            } p-4 rounded-lg shadow">
              <p>${msg.text}</p>
            </div>
            ${
              msg.type === 'right'
                ? '<div class="w-8 h-8 bg-gray-300 rounded-full"></div>'
                : ''
            }
          </div>`
      )
      .join('');
  }
});