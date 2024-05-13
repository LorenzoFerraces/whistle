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
    var sport: Sports,
    val date: String,
    var teams: List<Team>,
    var nextGameID: Int,
    var games: MutableList<Game>,
    var status: Boolean,
    val user: SimpleUser,
    var imageURL: String,
)

class Team (
    val name: String,
    var wins: Int = 0,
    var losses: Int = 0,
    var draws: Int = 0,
    var favour: Int = 0,
    var against: Int = 0
) {
    fun puntos(): Int {
        return (wins * 2) + draws
    }

    fun diferenciaGoles(): Int {
        return this.favour - this.against
    }
}

class Game(
    val id: Int,
    var team1: String,
    var score1: Int,
    var team2: String,
    var score2: Int,
)

enum class Sports {
    Football, Volleyball, Handball
}

