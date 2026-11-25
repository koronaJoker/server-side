
export function logAdminAction(email, action, entity, id) {
    const time = new Date().toLocaleString("ru-RU", {
        timeZone: "Europe/Chisinau"
    })

    console.log(`ADMIN ACTION | ${time} | ${email} | ${action} | ${entity} ID: ${id}`)

}