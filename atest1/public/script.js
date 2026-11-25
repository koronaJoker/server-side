async function deleteMovie(event, id) {

    event.stopPropagation();

    const confirmed = confirm("Удалить этот фильм?");

    if (!confirmed) {
        return;
    }

    const response = await fetch(
        `/api/movies/${id}`,
        {
            method: "DELETE"
        }
    );

    if (response.ok) {
        window.location.href = "/movies";
    } else {
        alert("Ошибка при удалении");
    }
}