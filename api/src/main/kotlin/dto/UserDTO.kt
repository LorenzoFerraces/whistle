package dto

import model.User

class UserDTO() {
    lateinit var id: String
    lateinit var username: String
    lateinit var password: String
    lateinit var location: String
    lateinit var phone: String
    lateinit var preferredSport: String
    var tournaments = mutableListOf<TournamentDTO>()

    constructor(user: User): this() {
        this.id = user.id
        this.username = user.username
        this.password = user.password
        this.location = user.location.toFriendlyString()
        this.phone = user.phone
        this.preferredSport = user.preferredSport.name
        for (tournament in user.tournaments) {
            var tournamentDTO = TournamentDTO(tournament)
            this.tournaments.add(tournamentDTO)
        }
    }
}