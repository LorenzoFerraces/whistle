package model

class UserNotFoundException(): Exception()
class NotTournamentFoundException(): Exception()
class UserException(msg: String): Exception(msg)
class UsernameException(): Exception()
class EmailException(): Exception()
class DuplicatedTeamException(): Exception()