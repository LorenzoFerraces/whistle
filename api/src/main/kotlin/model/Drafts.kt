package model

class DraftUser(
    var username: String,
    var email: String,
    var password: String
)

class DraftLogin(
    var email: String,
    var password: String
)

class DraftTournament(
    val name: String,
    val description: String
)