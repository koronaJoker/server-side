const notificationList = document.querySelector("#notification-list")

if (notificationList && typeof io === "function") {
    const socket = io()

    socket.on("courseCreated", (data) => {
        const emptyState = notificationList.querySelector("p")
        if (emptyState) emptyState.remove()

        const notification = document.createElement("div")
        notification.className = "notification flex justify-between items-start bg-white shadow-xl rounded-xl p-5 mb-4 border border-gray-100"

        const content = document.createElement("div")
        content.className = "flex flex-col gap-2"

        const title = document.createElement("h4")
        title.className = "font-bold text-gray-800 text-lg"
        title.textContent = `Добавлен новый курс: ${data.courseName}`

        const teacher = document.createElement("p")
        teacher.className = "text-gray-600 text-sm"
        teacher.textContent = `Преподаватель: ${data.teacherName}`

        const date = document.createElement("small")
        date.className = "text-gray-400"
        date.textContent = data.createdAt

        const closeButton = document.createElement("button")
        closeButton.className = "text-gray-400 hover:text-red-500 text-2xl font-bold ml-4 transition"
        closeButton.textContent = "×"
        closeButton.addEventListener("click", () => {
            notification.remove()
            if (!notificationList.querySelector(".notification")) {
                const emptyMessage = document.createElement("p")
                emptyMessage.className = "text-center text-gray-400"
                emptyMessage.textContent = "Уведомлений пока нет"
                notificationList.append(emptyMessage)
            }
        })

        content.append(title, teacher, date)
        notification.append(content, closeButton)
        notificationList.prepend(notification)
    })
}
