package model

class System(private val dataManager: DataManager) {
    var users = mutableListOf<User>()
    var tournaments = mutableListOf<Tournament>()
    private val idGenerator = IdGenerator(dataManager)

    //Load
    init {
        dataManager.loadData(this)
    }

    //Login
    fun login(email: String, password: String): User {
        return users.find { it.email == email && it.password == password } ?: throw UserException("Login Error")
    }

    fun addUser(draft: DraftUser): User {
        if (users.any { it.username == draft.username }) throw UsernameException()
        if (users.any { it.email == draft.email }) throw EmailException()
        val user = User(idGenerator.getUserId(), draft.username, draft.email, draft.password, mutableListOf())
        users.add(user)
        dataManager.saveData(this)
        return user
    }

    fun getAllUsers(): List<User> = users.toList()

    fun getUser(userId: String): User {
        return users.find { it.id == userId } ?: throw UserNotFoundException()
    }

    // Tournaments
    fun addTournament(userId: String, draft: DraftTournament): Tournament {
        val user = this.getUser(userId)
        val tournament = Tournament(
            idGenerator.getTournamentId(),
            draft.name,
            draft.description,
            SimpleUser(user.id, user.username)
        )
        tournaments.add(tournament)
        user.tournaments.add(tournament)
        dataManager.saveData(this)
        return tournament
    }

    fun getAllTournaments(): List<Tournament> = tournaments.toList()

    fun getTournament(tournamentId: String): Tournament {
        return tournaments.find { it.id == tournamentId } ?: throw NotTournamentFoundException()
    }

    fun removeTournament(tournamentId: String, userId: String) {
        val tournament = tournaments.find{ it.id == tournamentId } ?: throw NotTournamentFoundException()
        if (tournament.user.id != userId) throw UserException("You are not authorized to modify this tournament")
        val user = this.getUser(userId)
        tournaments.remove(tournament)
        user.tournaments.remove(tournament)
        dataManager.saveData(this)
    }
}
