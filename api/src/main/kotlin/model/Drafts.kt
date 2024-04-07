package model

class DraftUser(
    var email: String,
    var password: String,
    var username: String
)

class DraftLogin(
    var email: String,
    var password: String
)

class DraftTournament(
    val name: String,
    val description: String
)