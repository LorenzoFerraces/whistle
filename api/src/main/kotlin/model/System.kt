package model

import model.gen.tournamentsGEN
import model.gen.usersGEN

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
        return users.find { it.email == email && it.password == password } ?: throw UserNotFoundException()
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

        val normalizedTeams = draft.teams.map { it.lowercase() }
        if (normalizedTeams.distinct().count() != normalizedTeams.count()) {
            throw DuplicatedTeamException()
        }

        val user = this.getUser(userId)

        var teams = mutableListOf<Team>()
        draft.teams.forEach{
                teamName -> teams.add(Team(teamName))
        }

        val tournament = Tournament(
            idGenerator.getTournamentId(),
            draft.name,
            draft.description,
            draft.sport,
            draft.date,
            teams,
            true,
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

    //Dev
    fun createData() {
        this.addUsers()
        this.addTournaments()
    }

    private fun addUsers() {
        for (draftUser in usersGEN){
            this.addUser(draftUser)
        }
    }

    private fun addTournaments() {
        val availableTournaments = tournamentsGEN.toMutableList()
        for (user in this.users){
            val numTournamentsToAdd = (2..6).random()
            availableTournaments.shuffle()
            for (i in 0 until numTournamentsToAdd) {
                if (availableTournaments.isNotEmpty()) {
                    val draftTournament = availableTournaments.removeAt(0)
                    addTournament(user.id, draftTournament)
                    }
                }
            }
        }
}
