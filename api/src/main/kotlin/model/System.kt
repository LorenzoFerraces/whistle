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

    //Users
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
            1,
            mutableListOf<Game>(),
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

    //Games
    fun addGame(tournamentID: String, gameDraft: DraftGame): Tournament {
        var tournament = getTournament(tournamentID)
        val game = Game(tournament.nextGameID, gameDraft.team1, gameDraft.score1, gameDraft.team2, gameDraft.score2)
        this.updateTeamStats(tournament, game)
        tournament.games += game
        tournament.nextGameID += 1
        dataManager.saveData(this)
        return tournament
    }

    fun updateGame(tournamentID: String, gameID: Int, gameDraft: DraftGame): Tournament {
        var tournament = getTournament(tournamentID)
        var oldGame = tournament.games.find { it.id == gameID } ?: throw NotGameFoundException()

        // Crear un nuevo juego con los datos actualizados
        val newGame = Game(oldGame.id, gameDraft.team1, gameDraft.score1, gameDraft.team2, gameDraft.score2)

        // Actualizar el juego en la lista de juegos del torneo
        val index = tournament.games.indexOf(oldGame)
        tournament.games[index] = newGame

        // Llamar a la función para actualizar las estadísticas del equipo
        this.updateStats(tournament, oldGame, newGame)

        // Guardar los cambios y devolver el torneo actualizado
        dataManager.saveData(this)
        return tournament
    }

    private fun updateTeamStats(tournament: Tournament, game: Game) {
        val team1 = tournament.teams.find { it.name == game.team1 } ?: throw NotTeamFoundException()
        val team2 = tournament.teams.find { it.name == game.team2 } ?: throw NotTeamFoundException()

        when {
            game.score1 > game.score2 -> {
                team1?.wins = (team1?.wins ?: 0) + 1
                team2?.losses = (team2?.losses ?: 0) + 1
            }
            game.score1 < game.score2 -> {
                team1?.losses = (team1?.losses ?: 0) + 1
                team2?.wins = (team2?.wins ?: 0) + 1
            }
            else -> {
                team1?.draws = (team1?.draws ?: 0) + 1
                team2?.draws = (team2?.draws ?: 0) + 1
            }
        }

        team1?.favour = (team1?.favour ?: 0) + game.score1
        team1?.against = (team1?.against ?: 0) + game.score2
        team2?.favour = (team2?.favour ?: 0) + game.score2
        team2?.against = (team2?.against ?: 0) + game.score1
    }

    private fun updateStats(tournament: Tournament, oldGame: Game, newGame: Game) {
        val team1 = tournament.teams.find { it.name == oldGame.team1 } ?: throw NotTeamFoundException()
        val team2 = tournament.teams.find { it.name == oldGame.team2 } ?: throw NotTeamFoundException()

        // Restar los resultados antiguos del partido
        when {
            oldGame.score1 > oldGame.score2 -> {
                team1.wins -= 1
                team2.losses -= 1
            }
            oldGame.score1 < oldGame.score2 -> {
                team1.losses -= 1
                team2.wins -= 1
            }
            else -> {
                team1.draws -= 1
                team2.draws -= 1
            }
        }

        team1.favour -= oldGame.score1
        team1.against -= oldGame.score2
        team2.favour -= oldGame.score2
        team2.against -= oldGame.score1

        // Agregar los nuevos resultados del partido
        when {
            newGame.score1 > newGame.score2 -> {
                team1.wins += 1
                team2.losses += 1
            }
            newGame.score1 < newGame.score2 -> {
                team1.losses += 1
                team2.wins += 1
            }
            else -> {
                team1.draws += 1
                team2.draws += 1
            }
        }

        team1.favour += newGame.score1
        team1.against += newGame.score2
        team2.favour += newGame.score2
        team2.against += newGame.score1
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
