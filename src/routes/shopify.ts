import { Response, Request, Router } from "express";
import crypto from "crypto";
import axios from "axios";
import querystring from "querystring";
import cookie from "cookie";
import { config } from "../config";
const nonce = require('nonce') as () => () => string;

// Create router instance to get requests
const router = Router();

const FORWARDING_ADDRESS: string | undefined = config.web.address;
const APIKEY: string | undefined = config.shopify.apiKey;
const APISECRET: string | undefined = config.shopify.apiSecret;
const SCOPES: string = config.shopify.appScopes;
const TOKENPATH: string = "../models/authToken.json";


if (!APIKEY || !APISECRET) {
    throw new Error("Missing Shopify API Key or Secret inenvironment variables");
}

const isValidShopDomain = (shopName: string): boolean => {
    return shopName.endsWith(".myshopify.com");
}



router.get("/", (req: Request, res: Response): void => {
    const shopName: string | undefined = req.query.shop as string;

    if (!shopName || !isValidShopDomain(shopName)) {
        // Check if shopName is invalid or null
        res.status(400).send('Invalid "Shop Name" parameter');
        return;
    } else {
        // Generate a random string for the state parameter
        const shopState = nonce()();
        // Shopify callback redirect
        const redirectURL = `${FORWARDING_ADDRESS}/shopify/callback`;
        // Install URL for app installation
        const installUrl = `https://${shopName}/admin/oauth/authorize?client_id=${APIKEY}&scope=${SCOPES}&state=${shopState}&redirect_uri=${redirectURL}`;

        // Store the state in cookies to validate later
        // In a production app, you should encrypt this cookie
        res.cookie("state", shopState);

        // Redirect user to the Shopify install URL
        res.redirect(installUrl);
    }
});


router.get("/callback", async (req: Request, res: Response): Promise<void> => {
    console.debug("Callback hit with query params: ", req.query);
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie || '').state;

    // Check if the state matches the cookie
    if (state !== stateCookie) {
        res.status(403).send('Request origin cannot be verified');
        return;
    }

    // Perform HMAC validation (security check)
    if (shop && hmac && code) {
        const queryMap: { [key: string]: any } = { ...req.query };
        delete queryMap["signature"];
        delete queryMap["hmac"];

        const message = querystring.stringify(queryMap);
        const providedHmac = Buffer.from(hmac as string, "utf-8");
        const generatedHash = Buffer.from(
            crypto.createHmac("sha256", APISECRET || "").update(message).digest("hex"),
            "utf-8"
        );

        let hashEquals = false;
        try {
            hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
        } catch (e) {
            hashEquals = false;
        }

        if (!hashEquals) {
            res.status(400).send("HMAC validation failed");
            return;
        }

        // Now we can exchange the code for an access token
        const accessTokenRequestUrl = `https://${shop}/admin/oauth/access_token`;
        const accessTokenPayload = {
            client_id: APIKEY,
            client_secret: APISECRET,
            code,
        };

        try {
            // Perform the POST request to exchange the code for the access token using axios
            const accessTokenResponse = await axios.post(accessTokenRequestUrl, accessTokenPayload);

            const accessToken = accessTokenResponse.data.access_token;
            console.debug("ACCESS TOKEN: " + accessToken);

            // Save the access token and perform other necessary actions
            res.status(200).send("App successfully installed");
        } catch (error) {
            console.error(error);
            // Handle any errors during the request
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).send(error.response?.data?.error_description || "Unknown error");
            } else {
                res.status(500).send("An unexpected error occurred");
                return;
            }
        }
    } else {
        res.status(400).send("Required parameters missing");
        return;
    }
});

export default router;