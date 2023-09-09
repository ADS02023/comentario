// Arreglo para almacenar los comentarios.
const comments = [];

// Crea un contenedor para el campo de entrada de comentarios.
const inputContainer = document.createElement("div");
const input = document.createElement("input");
input.classList.add("input");

// Obtiene el contenedor de comentarios en el DOM.
const commentsContainer = document.querySelector("#comments-container");

// Agrega el campo de entrada al contenedor.
commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

// Agrega un evento de teclado al campo de entrada para manejar la tecla "Enter".
input.addEventListener("keydown", (e) => {
  handleEnter(e, null);
});

// Función para manejar la acción de presionar "Enter" en el campo de entrada.
function handleEnter(e, current) {
  if (e.key === "Enter" && e.target.value != "") {
    // Crea un nuevo comentario.
    const newComment = {
      text: e.target.value,
      likes: 0,
      responses: [],
    };

    if (current === null) {
      // Si el comentario actual es nulo, agrega el comentario principal al inicio del arreglo.
      comments.unshift(newComment);
    } else {
      // Si el comentario actual no es nulo, agrega una respuesta al comentario actual.
      current.responses.unshift(newComment);
    }

    // Limpia el campo de entrada.
    e.target.value = "";

    // Borra y vuelve a renderizar todos los comentarios.
    commentsContainer.innerHTML = "";
    commentsContainer.appendChild(inputContainer);
    renderComments(comments, commentsContainer);
  }
}

// Función para renderizar los comentarios y respuestas en el DOM.
function renderComments(arr, parent) {
  arr.forEach((element) => {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");

    // Crea un contenedor para las respuestas.
    const responsesContainer = document.createElement("div");
    responsesContainer.classList.add("responses-container");

    // Crea botones para responder y dar "Me gusta" al comentario.
    const replyButton = document.createElement("button");
    const likeButton = document.createElement("button");

    replyButton.textContent = "Reply";
    likeButton.textContent = "Like";

    // Agrega un evento de clic al botón "Reply" para responder al comentario.
    replyButton.addEventListener("click", (e) => {
      const newInput = inputContainer.cloneNode(true);
      newInput.value = "";
      newInput.focus();
      newInput.addEventListener("keydown", (e) => {
        handleEnter(e, element);
      });
      commentContainer.insertBefore(newInput, responsesContainer);
    });

    // Agrega un evento de clic al botón "Like" para dar "Me gusta" al comentario.
    likeButton.addEventListener("click", (e) => {
      element.likes++;
      likeButton.textContent = `${
        element.likes > 0 ? element.likes : ""
      } Likes`;
    });

    // Crea un contenedor para el contenido del comentario.
    const divContent = document.createElement("div");
    divContent.textContent = element.text;

    // Crea un contenedor para las acciones (botones) del comentario.
    const divActions = document.createElement("div");

    // Agrega el contenido del comentario y los botones al contenedor del comentario.
    commentContainer.appendChild(divContent);
    commentContainer.appendChild(divActions);
    divActions.appendChild(replyButton);
    divActions.appendChild(likeButton);

    // Agrega el contenedor de respuestas al comentario si existen respuestas.
    commentContainer.appendChild(responsesContainer);

    // Si el comentario actual tiene respuestas, llama recursivamente a la función para mostrarlas.
    if (element.responses.length > 0) {
      renderComments(element.responses, responsesContainer);
    }

    // Agrega el comentario al contenedor principal de comentarios.
    parent.appendChild(commentContainer);
  });
}
