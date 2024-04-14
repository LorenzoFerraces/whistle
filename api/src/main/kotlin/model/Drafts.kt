package model

import java.util.Date

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
    val description: String,
    val date: Date,
    val teams: List<String>,
    val sport: String
)