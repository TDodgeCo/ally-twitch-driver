/// <reference types="@adonisjs/ally" />
/// <reference types="@adonisjs/http-server/build/adonis-typings" />
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Oauth2Driver, RedirectRequest } from '@adonisjs/ally/build/standalone';
import { ApiRequestContract } from '@ioc:Adonis/Addons/Ally';
/**
 * Define the access token object properties in this type. It
 * must have "token" and "type" and you are free to add
 * more properties.
 *
 * ------------------------------------------------
 * Change "TwitchDriver" to something more relevant
 * ------------------------------------------------
 */
export declare type TwitchDriverAccessToken = {
    token: string;
    type: 'bearer';
    refreshToken: string;
    expiresIn: number;
    expiresAt: any;
    scope: string[];
};
/**
 * Define a union of scopes your driver accepts. Here's an example of same
 * https://github.com/adonisjs/ally/blob/develop/adonis-typings/ally.ts#L236-L268
 *
 * ------------------------------------------------
 * Change "TwitchDriver" to something more relevant
 * ------------------------------------------------
 */
export declare type TwitchDriverScopes = 'chat:read' | 'user:read:subscriptions' | 'user:read:follows' | 'user:read:email' | 'user:read:broadcast' | 'moderator:read:shoutouts' | 'moderator:read:shield_mode' | 'moderator:read:guest_star' | 'moderator:read:followers' | 'moderator:read:chatters' | 'moderator:read:chat_settings' | 'moderator:read:blocked_terms' | 'moderation:read channel:read:vips' | 'channel:moderate' | 'channel:read:subscriptions' | 'channel:read:redemptions' | 'channel:read:predictions' | 'bits:read' | 'channel:read:charity' | 'channel:read:goals' | 'channel:read:guest_star' | 'channel:read:hype_train' | 'channel:read:polls';
export declare type LiteralStringUnion<LiteralType> = LiteralType | (string & {
    _?: never;
});
/**
 * Define the configuration options accepted by your driver. It must have the following
 * properties and you are free add more.
 *
 * ------------------------------------------------
 * Change "TwitchDriver" to something more relevant
 * ------------------------------------------------
 */
export declare type TwitchDriverConfig = {
    driver: 'twitch';
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
    authorizeUrl?: string;
    accessTokenUrl?: string;
    userInfoUrl?: string;
    scopes?: LiteralStringUnion<TwitchDriverScopes>[];
};
/**
 * Driver implementation. It is mostly configuration driven except the user calls
 *
 * ------------------------------------------------
 * Change "TwitchDriver" to something more relevant
 * ------------------------------------------------
 */
export declare class TwitchDriver extends Oauth2Driver<TwitchDriverAccessToken, TwitchDriverScopes> {
    config: TwitchDriverConfig;
    /**
     * The URL for the redirect request. The user will be redirected on this page
     * to authorize the request.
     *
     * Do not define query strings in this URL.
     */
    protected authorizeUrl: string;
    /**
     * The URL to hit to exchange the authorization code for the access token
     *
     * Do not define query strings in this URL.
     */
    protected accessTokenUrl: string;
    /**
     * The URL to hit to get the user details
     *
     * Do not define query strings in this URL.
     */
    protected userInfoUrl: string;
    /**
     * The param name for the authorization code. Read the documentation of your oauth
     * provider and update the param name to match the query string field name in
     * which the oauth provider sends the authorization_code post redirect.
     */
    protected codeParamName: string;
    /**
     * The param name for the error. Read the documentation of your oauth provider and update
     * the param name to match the query string field name in which the oauth provider sends
     * the error post redirect
     */
    protected errorParamName: string;
    /**
     * Cookie name for storing the CSRF token. Make sure it is always unique. So a better
     * approach is to prefix the oauth provider name to `oauth_state` value. For example:
     * For example: "facebook_oauth_state"
     */
    protected stateCookieName: string;
    /**
     * Parameter name to be used for sending and receiving the state from.
     * Read the documentation of your oauth provider and update the param
     * name to match the query string used by the provider for exchanging
     * the state.
     */
    protected stateParamName: string;
    /**
     * Parameter name for sending the scopes to the oauth provider.
     */
    protected scopeParamName: string;
    /**
     * The separator indentifier for defining multiple scopes
     */
    protected scopesSeparator: string;
    constructor(ctx: HttpContextContract, config: TwitchDriverConfig);
    /**
     * Optionally configure the authorization redirect request. The actual request
     * is made by the base implementation of "Oauth2" driver and this is a
     * hook to pre-configure the request.
     */
    protected configureRedirectRequest(request: RedirectRequest<TwitchDriverScopes>): void;
    /**
     * Optionally configure the access token request. The actual request is made by
     * the base implementation of "Oauth2" driver and this is a hook to pre-configure
     * the request
     */
    /**
     * Update the implementation to tell if the error received during redirect
     * means "ACCESS DENIED".
     */
    accessDenied(): boolean;
    protected getAuthenticatedRequest(url: string, token: string): import("@adonisjs/ally/build/standalone").ApiRequest;
    /**
     * See https://docs.adonisjs.com/guides/auth/social for more information
     * on the return type of user with social auth
     */
    protected getUserInfo(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        id: any;
        nickName: any;
        name: any;
        email: any;
        emailVerificationState: "unsupported";
        avatarUrl: any;
        original: any;
    }>;
    /**
     * Get the user details by query the provider API. This method must return
     * the access token and the user details both. Checkout the spotify
     * implementation for reference
     *
     * https://github.com/adonisjs/ally/blob/master/src/Drivers/Spotify/index.ts
     */
    user(callback?: (request: ApiRequestContract) => void): Promise<{
        token: TwitchDriverAccessToken;
        id: any;
        nickName: any;
        name: any;
        email: any;
        emailVerificationState: "unsupported";
        avatarUrl: any;
        original: any;
    }>;
    /**
     * Finds the user by the access token
     */
    userFromToken(token: string, callback?: (request: ApiRequestContract) => void): Promise<{
        token: {
            token: string;
            type: "bearer";
        };
        id: any;
        nickName: any;
        name: any;
        email: any;
        emailVerificationState: "unsupported";
        avatarUrl: any;
        original: any;
    }>;
}
