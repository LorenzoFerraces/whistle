package controller

import dto.TournamentDTO
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.HttpStatus
import model.*

class TournamentController(private var system: System, private var tokenController: TokenController) {
    fun getAllTournaments(context: Context) {
        var tournaments = system.getAllTournaments()
        var tournamentsDTO = mutableListOf<TournamentDTO>()
        for(tournament in tournaments){
            var tournamentDTO = TournamentDTO(tournament)
            tournamentsDTO.add(tournamentDTO)
        }
        context.json(tournamentsDTO)
    }

    fun postTournament(context: Context) {
        tokenController.validateAndProcessBody<DraftTournament>(context) { tournamentREQ ->
            try {
                var tournament = system.addTournament(tokenController.tokenToUserId(context), tournamentREQ)
                context.json(TournamentDTO(tournament))

            } catch (e: UserNotFoundException) {
                tokenController.errorResponse(context, HttpStatus.UNAUTHORIZED, "User unauthorized")
            } catch (e: DuplicatedTeamException) {
                tokenController.errorResponse(context, HttpStatus.UNPROCESSABLE_CONTENT, "Duplicated Team")
            }
        }
    }

    fun getTournament(context: Context) {
        try {
            val id = context.pathParam("id")
            val game = system.getTournament(id)
            context.json(TournamentDTO(game))
        } catch (e: NotTournamentFoundException){
            tokenController.errorResponse(context, HttpStatus.NOT_FOUND, "Tournament not found")
        }
    }

    fun deleteTournament(context: Context) {
        try{
            val id = context.pathParam("id")
            if (id.toIntOrNull() == null){
                throw BadRequestResponse()
            }
            var userID = tokenController.tokenToUserId(context)
            system.removeTournament(id, userID)
        }catch (e : NotTournamentFoundException) {
            tokenController.errorResponse(context, HttpStatus.NOT_FOUND, "Tournament not found")
        }catch (e : UserException) {
            tokenController.errorResponse(context, HttpStatus.NOT_FOUND, "Tournament not found")
        }
    }

    fun closeGame(context: Context) {
        try {
            val id = context.pathParam("id")
            var userID = tokenController.tokenToUserId(context)
            val tournament = system.closeGame(id, userID)
            context.json(TournamentDTO(tournament))
            return
        }catch (e : NotTournamentFoundException) {
            tokenController.errorResponse(context, HttpStatus.NOT_FOUND, "Tournament not found")
        }catch (e : UserException) {
            tokenController.errorResponse(context, HttpStatus.NOT_FOUND, "Tournament not found")
        }
    }

    fun postGame(context: Context){
        tokenController.validateAndProcessBody<DraftGame>(context) { draftGame ->
            try {
                val idTournament = context.pathParam("id")
                val tournament = system.addGame(idTournament, draftGame)
                context.json(TournamentDTO(tournament))

            } catch (e: NotTeamFoundException) {
                tokenController.errorResponse(context, HttpStatus.NOT_FOUND, "Team not found")
            } catch (e: DuplicatedTeamException) {
                tokenController.errorResponse(context, HttpStatus.UNPROCESSABLE_CONTENT, "Duplicated Team")
            }
        }
    }

    fun putGame(context: Context){
        tokenController.validateAndProcessBody<DraftGame>(context) { draftGame ->
            try {
                val tournamentID = context.pathParam("id")
                val gameID = context.pathParam("gameId")
                val tournament = system.updateGame(tournamentID, gameID.toInt(), draftGame)
                context.json(TournamentDTO(tournament))

            } catch (e: NotTeamFoundException) {
                tokenController.errorResponse(context, HttpStatus.NOT_FOUND, "Team not found")
            } catch (e: DuplicatedTeamException) {
                tokenController.errorResponse(context, HttpStatus.UNPROCESSABLE_CONTENT, "Duplicated Team")
            }
        }
    }


}