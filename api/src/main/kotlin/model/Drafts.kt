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
    val date: String,
    val teams: List<String>,
    val sport: String
)

class DraftTournamentResult(
    val team1: String,
    val team2: String,
    val goals1: Int,
    val goals2: Int
    )
