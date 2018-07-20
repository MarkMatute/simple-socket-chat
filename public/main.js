$(document).ready(() => {
  const socket = io.connect("http://localhost:4002");

  // Dom
  const output = $('#chat-output');
  const input = $('#chat-input');
  const btn = $('#chat-button-send');
  const feedback = $('#feedback');

  // Events
  btn.on('click', (e) => {
    e.preventDefault();
    socket.emit('chat-message', {
      message: input.val()
    });
    input.val('');
  });

  // Typing
  input.on('focus', () => {
    socket.emit('typing');
  });

  // Socket listen
  socket.on('new-chat', (data) => {
    feedback.html('');
    output.text(output.text() + '\n' + data.message);
  });

  socket.on('typing', (data) => {
    feedback.html(`<p>Someone is typing....</p>`);
  });

});