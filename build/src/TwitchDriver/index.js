"use strict";
/*
|--------------------------------------------------------------------------
| Ally Oauth driver
|--------------------------------------------------------------------------
|
| This is a dummy implementation of the Oauth driver. Make sure you
|
| - Got through every line of code
| - Read every comment
|
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchDriver = void 0;
const standalone_1 = require("@adonisjs/ally/build/standalone");
/**
 * Driver implementation. It is mostly configuration driven except the user calls
 *
 * ------------------------------------------------
 * Change "TwitchDriver" to something more relevant
 * ------------------------------------------------
 */
class TwitchDriver extends standalone_1.Oauth2Driver {
    constructor(ctx, config) {
        super(ctx, config);
        this.config = config;
        /**
         * The URL for the redirect request. The user will be redirected on this page
         * to authorize the request.
         *
         * Do not define query strings in this URL.
         */
        this.authorizeUrl = 'https://id.twitch.tv/oauth2/authorize';
        /**
         * The URL to hit to exchange the authorization code for the access token
         *
         * Do not define query strings in this URL.
         */
        this.accessTokenUrl = 'https://id.twitch.tv/oauth2/token';
        /**
         * The URL to hit to get the user details
         *
         * Do not define query strings in this URL.
         */
        this.userInfoUrl = 'https://api.twitch.tv/helix/users';
        /**
         * The param name for the authorization code. Read the documentation of your oauth
         * provider and update the param name to match the query string field name in
         * which the oauth provider sends the authorization_code post redirect.
         */
        this.codeParamName = 'code';
        /**
         * The param name for the error. Read the documentation of your oauth provider and update
         * the param name to match the query string field name in which the oauth provider sends
         * the error post redirect
         */
        this.errorParamName = 'error';
        /**
         * Cookie name for storing the CSRF token. Make sure it is always unique. So a better
         * approach is to prefix the oauth provider name to `oauth_state` value. For example:
         * For example: "facebook_oauth_state"
         */
        this.stateCookieName = 'TwitchDriver_oauth_state';
        /**
         * Parameter name to be used for sending and receiving the state from.
         * Read the documentation of your oauth provider and update the param
         * name to match the query string used by the provider for exchanging
         * the state.
         */
        this.stateParamName = 'state';
        /**
         * Parameter name for sending the scopes to the oauth provider.
         */
        this.scopeParamName = 'scope';
        /**
         * The separator indentifier for defining multiple scopes
         */
        this.scopesSeparator = ' ';
        /**
         * Extremely important to call the following method to clear the
         * state set by the redirect request.
         *
         * DO NOT REMOVE THE FOLLOWING LINE
         */
        this.loadState();
    }
    /**
     * Optionally configure the authorization redirect request. The actual request
     * is made by the base implementation of "Oauth2" driver and this is a
     * hook to pre-configure the request.
     */
    //  protected configureRedirectRequest(request: RedirectRequest<TwitchDriverScopes>) {}
    configureRedirectRequest(request) {
        /**
         * Define user defined scopes or the default one's
         */
        request.scopes(this.config.scopes || ['user:read:email']);
        request.param('response_type', 'code');
        request.param('grant_type', 'authorization_code');
    }
    /**
     * Optionally configure the access token request. The actual request is made by
     * the base implementation of "Oauth2" driver and this is a hook to pre-configure
     * the request
     */
    // protected configureAccessTokenRequest(request: ApiRequest) {}
    /**
     * Update the implementation to tell if the error received during redirect
     * means "ACCESS DENIED".
     */
    accessDenied() {
        const error = this.getError();
        if (!error) {
            return false;
        }
        return error === 'access_denied';
    }
    getAuthenticatedRequest(url, token) {
        const request = this.httpClient(url);
        request.header('Authorization', `Bearer ${token}`);
        request.header('Client-id', this.config.clientId);
        request.header('Accept', 'application/json');
        request.parseAs('json');
        return request;
    }
    /**
     * See https://docs.adonisjs.com/guides/auth/social for more information
     * on the return type of user with social auth
     */
    async getUserInfo(token, callback) {
        const request = this.getAuthenticatedRequest(this.userInfoUrl, token);
        if (typeof callback === 'function') {
            callback(request);
        }
        const body = await request.get();
        const data = body.data[0];
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Twitch API returns snake_case
        const { id, login, display_name, email, profile_image_url } = data;
        return {
            id: id,
            nickName: login,
            name: display_name,
            email: email,
            emailVerificationState: 'unsupported',
            avatarUrl: profile_image_url,
            original: data,
        };
    }
    /**
     * Get the user details by query the provider API. This method must return
     * the access token and the user details both. Checkout the spotify
     * implementation for reference
     *
     * https://github.com/adonisjs/ally/blob/master/src/Drivers/Spotify/index.ts
     */
    async user(callback) {
        const token = await this.accessToken(callback);
        const user = await this.getUserInfo(token.token, callback);
        return {
            ...user,
            token: token,
        };
    }
    /**
     * Finds the user by the access token
     */
    async userFromToken(token, callback) {
        const user = await this.getUserInfo(token, callback);
        return {
            ...user,
            token: { token, type: 'bearer' },
        };
    }
}
exports.TwitchDriver = TwitchDriver;
