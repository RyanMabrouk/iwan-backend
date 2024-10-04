export interface ITokenPayload {
    iss: string;
    sub: string;
    aud: number;
    exp: number;
    iat: number;
    email: string;
    phone: string;
    app_metadata: {
        provider: string;
        providers: [string];
    };
    user_metadata: Record<string, unknown>;
    role: string;
    aal: string;
    amr: [{
        method: string;
        timestamp: number;
    }];
    session_id: string;
    is_anonymous: boolean;
}
