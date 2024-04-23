package model

class User(
    val id: String,
    val username: String,
    val email: String,
    val password: String,
    val tournaments: MutableList<Tournament>
)

class SimpleUser (
    val id: String,
    val username: String,
)

class Tournament(
    val id: String,
    var name: String,
    var description: String,
    var sport: String,
    val date: String,
    var teams: List<Team>,
    val status: Boolean,
    val user: SimpleUser,
)

class Team (
    val name: String,
    var wins: Int = 0,
    var losses: Int = 0,
    var draws: Int = 0,
    var goalsFavour: Int = 0,
    var goalsAgainst: Int = 0
)

class Result (
    val id: String,
    val firstTeam: String,
    val secondTeam: String,
    val goalsFirst: Int,
    val goalsSecond: Int
)