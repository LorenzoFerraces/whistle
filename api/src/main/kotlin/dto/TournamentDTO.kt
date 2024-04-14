package dto

import model.DuplicatedTeamException
import model.SimpleUser
import model.Team
import model.Tournament
import java.text.SimpleDateFormat
import java.util.*

class TournamentDTO() {
    lateinit var id: String
    lateinit var name: String
    lateinit var description: String
    lateinit var sport: String
    lateinit var date: String
    lateinit var status: String
    lateinit var teams: List<Team>
    lateinit var user: SimpleUser

    constructor(tournament: Tournament): this() {
        this.id = tournament.id
        this.name = tournament.name
        this.description = tournament.description
        val formatter = SimpleDateFormat("dd,MM,yyyy")
        this.date = formatter.format(tournament.date).toString()
        this.status = tournament.status.toString()
        val normalizedTeams = tournament.teams.map {it -> it.lowercase() }
        if (normalizedTeams.distinct().count() != normalizedTeams.count()) {
            throw DuplicatedTeamException()
        }
        this.teams = tournament.teams.map { it -> Team(it) }
        this.user = tournament.user
    }
}