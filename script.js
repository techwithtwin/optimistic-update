const posts = document.querySelector(".posts");
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const title = data.get("title");
  const desc = data.get("description");

  if (!title || !desc) {
    alert("Invalid data");
    return;
  }
}
