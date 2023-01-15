import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import appConfig from 'src/config/app.config';
import { UserService } from './user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private service: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appConfig().appSecret,
            
        })
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.service.validateUser(payload)
        if(!user) {
            return done(
                new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
                false
            )
        }
        return done(null, user, payload)
    }
    }
   