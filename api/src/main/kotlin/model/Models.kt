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

class Tournament (
    val id: String,
    var name: String,
    var description: String,
    val user: SimpleUser
)