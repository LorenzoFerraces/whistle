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
    var location: Locations,
    var imageURL: String,
    var teams: List<Team>,
    var nextGameID: Int,
    var games: MutableList<Game>,
    var status: Boolean,
    val user: SimpleUser,
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

enum class Locations {
    BuenosAires, CapitalFederal,
    Catamarca, Chaco,
    Chubut, Córdoba,
    Corrientes, EntreRíos,
    Formosa, Jujuy,
    LaPampa, LaRioja,
    Mendoza, Misiones,
    Neuquen, RíoNegro,
    Salta, SanJuan,
    SanLuís, SantaCruz,
    SantaFe, SantiagoDelEstero,
    TierraDelFuego, Tucumán
}

enum class Sports {
    Football, Volleyball, Handball
}

