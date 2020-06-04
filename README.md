# MS Teams Outgoing Webhook Bot Workers Template

A template for kick starting an [MS Teams outgoing webhook bot](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-outgoing-webhook) using [Cloudflare Workers](https://workers.dev).

When a configured outgoing webhook bots is @mentioned in MS Teams a POST request is sent to the worker. The worker verifies the webhook message signature using an HMAC token provided by MS Teams when [creating the outgoing webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-outgoing-webhook#create-an-outgoing-webhook). The worker replies with a JSON response that gets rendered as a threaded reply to the conversation in MS Teams:

```json
{
  "type": "message",
  "text": "This is a reply!"
}
``` 

## Usage and Deployment

1. Create a new project using this template with [wrangler](https://github.com/cloudflare/wrangler):

    ```bash
    wrangler generate projectname https://github.com/bradyjoslin/msteams-webhook-worker-template
    ```

2. Configure and customize the worker as you see fit and publish using:

    ```bash
    wrangler publish
    ```

3. Create an outgoing webhook in MS Teams [(docs)](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-outgoing-webhook#create-an-outgoing-webhook), providing the URL for your worker.

4. Add a [worker secret variable](https://developers.cloudflare.com/workers/tooling/wrangler/secrets/) named `SECRET` equal to the HMAC security token provided by MS Teams when creating the ougoing webhook.   

    This can be configured using Wrangler:

    ```bash
    wrangler secret put SECRET
    ```
🎉

## Misc

Similar Projects

- [Cloudflare Worker Signed Requests](https://github.com/cloudflare/template-registry/blob/master/templates/javascript/signed_request.js)
- [Microsoft Teams outgoing webhook sample](https://github.com/OfficeDev/msteams-samples-outgoing-webhook-nodejs)
- [Cloudflare Worker Template](https://github.com/cloudflare/worker-template)

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).
