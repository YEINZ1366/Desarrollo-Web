document.addEventListener("DOMContentLoaded", function() {
  let countdown = 30;
  let countdownInterval;

  function startCountdown() {
    countdownInterval = setInterval(function() {
      countdown--;
      document.getElementById("countdown").textContent = "Tiempo restante: " + countdown + " segundos";

      if (countdown <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").textContent = "Tiempo terminado";
        document.getElementById("submitButton").disabled = true;
        document.getElementById("retryButton").style.display = "block";
        disableForm();
      }
    }, 1000);
  }

  document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("countdown").style.display = "block";
    document.getElementById("quizForm").style.display = "block";
    document.getElementById("startButton").style.display = "none";
    startCountdown();
  });

  document.getElementById("quizForm").addEventListener("input", checkFormValidity);

  function checkFormValidity() {
    const form = document.getElementById("quizForm");
    const submitButton = document.getElementById("submitButton");
    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;
    const q3 = document.getElementById("q3").value;
    const q4 = document.getElementById("q4").value;
    const q5 = document.getElementById("q5").value;

    if (q1 !== "" && q2 !== "" && q3 !== "" && q4 !== "" && q5 !== "") {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const respuestasCorrectas = ["4", "ronaldo", "ingenieria", "guatemala", "canberra"];

    const respuestasEnviadas = [
      document.getElementById("q1").value,
      document.getElementById("q2").value,
      document.getElementById("q3").value,
      document.getElementById("q4").value,
      document.getElementById("q5").value
    ];

    let todasCorrectas = true;
    let respuestasCorrectasEnviadas = [];
    for (let i = 0; i < respuestasCorrectas.length; i++) {
      if (respuestasCorrectas[i] !== respuestasEnviadas[i]) {
        todasCorrectas = false;
        break;
      } else {
        respuestasCorrectasEnviadas.push(respuestasCorrectas[i]);
      }
    }

    if (todasCorrectas) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").textContent = "Examen enviado";
      document.getElementById("countdown").classList.add("exam-enviado");
      document.getElementById("submitButton").disabled = true;
      document.getElementById("retryButton").style.display = "block";
      disableForm();
      // Se muestra una alerta cuando el examen se envía correctamente
      alert("¡Examen enviado!\nTodas las respuestas son correctas.\nRespuestas enviadas: " + respuestasCorrectasEnviadas.join(", "));
      document.getElementById("countdown").style.display = "none"; // Oculta el tiempo
    } else {
      alert("Algunas respuestas son incorrectas. Por favor, revisa tus respuestas.");
    }
  });

  document.getElementById("retryButton").addEventListener("click", function() {
    countdown = 30;
    document.getElementById("countdown").textContent = "Tiempo restante: " + countdown + " segundos";
    document.getElementById("countdown").classList.remove("exam-enviado");
    startCountdown();
    enableForm();
    document.getElementById("retryButton").style.display = "none";
    document.getElementById("countdown").style.display = "block"; // Mostrar el contador al reiniciar
  });

  function disableForm() {
    const form = document.getElementById("quizForm");
    const inputs = form.querySelectorAll("select");
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;

    inputs.forEach(input => {
      input.disabled = true;
    });
  }

  function enableForm() {
    const form = document.getElementById("quizForm");
    const inputs = form.querySelectorAll("select");
    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = false;

    inputs.forEach(input => {
      input.disabled = false;
    });

    form.reset();
  }

  startCountdown();
});

