package controller

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.*
import io.javalin.security.RouteRole
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import model.System
import model.User
import kotlin.reflect.full.memberProperties

const val HEADER_NAME = "Authorization"

class UserGenerator : JWTGenerator<User> {
    override fun generate(user: User, alg: Algorithm?): String {
        val token: JWTCreator.Builder = JWT.create()
            .withClaim("id", user.id)
        return token.sign(alg)
    }
}

class TokenController(private val service: System) {
    private val algorithm = Algorithm.HMAC256("hi_im_a_secret")
    private val generator = UserGenerator()
    private val verifier = JWT.require(algorithm).build()
    private val provider = JWTProvider(algorithm, generator, verifier)
    val header = "Authorization"

    fun userToToken(user: User): String {
        return provider.generateToken(user)
    }

    fun tokenToUserId(context: Context): String {
        val validateToken = provider.validateToken(context.header("Authorization")?:throw UnauthorizedResponse("Invalid token"))
        return  validateToken.get().getClaim("id").asString()

    }

    fun validate(handler: Handler, ctx: Context, permittedRoles: Set<RouteRole>) {
        val header = ctx.header(header)
        when {
            permittedRoles.contains(Roles.ANYONE) -> handler.handle(ctx)
            header == null -> {
                UnauthorizedResponse()
            }
            else -> {
                val token = provider.validateToken(header)
                if (token.isPresent) {
                    val userId = token.get().getClaim("id").asString()
                    val user = service.getUser(userId)
                    if (permittedRoles.contains(Roles.USER)) {
                        ctx.attribute("user", user)
                        handler.handle(ctx)
                    } else {
                        UnauthorizedResponse()
                    }
                } else {
                    UnauthorizedResponse()
                }
            }
        }
    }

    inline fun <reified T : Any> validateAndProcessBody(context: Context, process: (T) -> Unit) {
        try {
            val body = context.bodyValidator(T::class.java).getOrThrow { throw BadRequestResponse() }
            validateFields(body)
            process(body)
        }catch (e: BadRequestResponse) {
            errorResponse(context, HttpStatus.BAD_REQUEST, "Bad Request")
        }
    }

    fun <T : Any> validateFields(obj: T) {
        val properties = obj::class.memberProperties
        for (property in properties) {
            val value = property.getter.call(obj)
            if (value == null || (value is String && value.isBlank())) {
                throw BadRequestResponse()
            }
        }
    }

    fun errorResponse(context: Context, status: HttpStatus, text: String) {
        context.status(status)
        context.json(mapOf("error" to text))
    }
}