import * as common from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Context } from "@nestjs/graphql";
import { Request } from "express";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { AuthService } from "./auth.service";
import { GqlDefaultAuthGuard } from "./gqlDefaultAuth.guard";
import { UserData } from "./userData.decorator";
import { LoginArgs } from "./LoginArgs";
import { UserInfo } from "./UserInfo";
import { User } from "../user/base/User";

@Resolver(UserInfo)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(() => User)
    async me(@Context("req") request: Request): Promise<User> {
        return this.authService.me(request.headers.authorization);
    }

    @Mutation(() => UserInfo)
    async login(@Args() args: LoginArgs): Promise<UserInfo> {
        return this.authService.login(args.credentials);
    }

    @Mutation(() => UserInfo)
    async signup(@Args() args: LoginArgs): Promise<UserInfo> {
        return this.authService.signup(args.credentials);
    }

    @Query(() => UserInfo)
    @common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
    async userInfo(@UserData() userInfo: UserInfo): Promise<UserInfo> {
        return userInfo;
    }
}
