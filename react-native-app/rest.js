async function addUserToDB(user, url) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    console.log("User added to database");
  }
}

export { addUserToDB };
