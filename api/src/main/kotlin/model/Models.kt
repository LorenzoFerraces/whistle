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
    val wins: Int = 0,
    val losses: Int = 0,
    val draws: Int = 0,
    val goalsFavour: Int = 0,
    val goalsAgainst: Int = 0
)

class Result (
    val id: String,
    val firstTeam: String,
    val secondTeam: String,
    val goalsFirst: Int,
    val goalsSecond: Int
)