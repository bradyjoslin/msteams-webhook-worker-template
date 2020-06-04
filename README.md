# MS Teams Outgoing Webhook Bot Workers Template

A template for kick starting an [MS Teams outgoing webhook bot](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-outgoing-webhook) using [Cloudflare Workers](https://workers.dev).

Outgoing webhook bots are triggered when @mentioned in Teams and provide a threaded reply. In the background a POST request is sent to a the Worker who has 5 seconds to reply with a JSON payload such as:

```json
{
  "type": "message",
  "text": "This is a reply!"
}
```

The webhook verifies the webhook's HMAC token using a shared secret that is provided by MS Teams when [creating the outgoing webhook](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-outgoing-webhook#create-an-outgoing-webhook). That secret is stored as a Worker secret variable `SECRET` which can be configured using Wrangler:

```bash
wrangler secret put SECRET
```

## Wrangler

To kickstart a project using this template with [wrangler](https://github.com/cloudflare/wrangler):

```bash
wrangler generate projectname https://github.com/bradyjoslin/msteams-webhook-worker-template
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

## Similar Projects

- [Cloudflare Worker Signed Requests](https://github.com/cloudflare/template-registry/blob/master/templates/javascript/signed_request.js)
- [Microsoft Teams outgoing webhook sample](https://github.com/OfficeDev/msteams-samples-outgoing-webhook-nodejs)
