import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { Credentials } from "./Credentials";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { UserRoles } from "./UserRoles";
import { UserInfo } from "./UserInfo";
import { User } from "../user/base/User";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly tokenService: TokenService
    ) {}

    async me(authorization: string = ""): Promise<User> {
        const bearer = authorization.replace(/^Bearer\s/, "");
        const username = this.tokenService.decodeToken(bearer);
        const result = await this.userService.findOne({
            where: { username },
            select: {
                createdAt: true,
                firstName: true,
                id: true,
                lastName: true,
                roles: true,
                updatedAt: true,
                username: true,
            },
        });
        if (!result) {
            throw new NotFoundException(
                `No resource was found for ${username}`
            );
        }

        return result;
    }

    async validateUser(
        username: string,
        password: string
    ): Promise<UserInfo | null> {
        const user = await this.userService.findOne({
            where: { username },
        });
        if (
            user &&
            (await this.passwordService.compare(password, user.password))
        ) {
            const { id, roles } = user;
            const roleList = roles as string[];
            return { id, username, roles: roleList };
        }
        return null;
    }
    async login(credentials: Credentials): Promise<UserInfo> {
        const { username, password } = credentials;
        const user = await this.validateUser(
            credentials.username,
            credentials.password
        );
        if (!user) {
            throw new UnauthorizedException(
                "The passed credentials are incorrect"
            );
        }
        const accessToken = await this.tokenService.createToken({
            id: user.id,
            username,
            password,
        });
        return {
            accessToken,
            ...user,
        };
    }
    async signup(credentials: Credentials): Promise<UserInfo> {
        // Extract the username and password from the body of the request
        const { username, password } = credentials;
        // Here we attempt to create a new user
        const user = await this.userService.create({
            data: {
                username,
                password,
                roles: ["todoUser"], // Here we assign every new user the `Todo User` role
            },
        });
        // If creating a new user fails throw an error
        if (!user) {
            throw new UnauthorizedException("Could not create user");
        }
        // Create an access token for the newly created user
        const accessToken = await this.tokenService.createToken({
            id: user.id,
            username,
            password,
        });
        // Return the access token as well as the some details about the user
        return {
            accessToken,
            username: user.username,
            id: user.id,
            roles: (user.roles as UserRoles).roles,
        };
    }
}
