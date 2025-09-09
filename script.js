const posts = document.querySelector(".posts");
const form = document.querySelector("form");
const baseUrl = "https://jsonplaceholder.typicode.com";
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const title = data.get("title");
  const desc = data.get("description");

  if (!title || !desc) {
    alert("Invalid data");
    return;
  }

  loader.style.display = "block";
  const resData = await savePost(title, desc);
  loader.style.display = "none";

  if (resData) {
    const newPost = `
    <div class="post">
        <h3>
          ${resData.title}
        </h3>
        <p>
         ${resData.body}
        </p>
      </div>
    `;
    const newHtml = newPost + posts.innerHTML;
    posts.innerHTML = newHtml;
  }
}

async function savePost(title, desc) {
  try {
    const res = await fetch(baseUrl + "/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title,
        body: desc,
        userId: 1,
      }),
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    console.log(title, desc);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
