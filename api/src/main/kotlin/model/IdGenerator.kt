package model

class IdGenerator(private val dataManager: DataManager) {
    var tournamentId: Int = 0
    var userId: Int = 0

    init {
        dataManager.loadMetadata(this)
    }

    fun getTournamentId(): String {
        val id = tournamentId++
        dataManager.saveMetadata(this)
        return "t_$id"
    }

    fun getUserId(): String {
        val id = userId++
        dataManager.saveMetadata(this)
        return "u_$id"
    }
}