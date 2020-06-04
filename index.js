const crypto = require('crypto')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function verifySignature(body, signature) {
  let bufSecret = Buffer.from(SECRET, 'base64')
  let msgBuf = Buffer.from(body, 'utf8')

  let msgHash =
    'HMAC ' +
    crypto
      .createHmac('sha256', bufSecret)
      .update(msgBuf)
      .digest('base64')

  // console.log(`auth: ${auth}`)
  // console.log(`sig: ${msgHash}`)

  return msgHash === signature
}

async function handleRequest(request) {
  let body = await request.text()
  let signature = request.headers.get('authorization')
  let isSignatureValid = false

  try {
    isSignatureValid = verifySignature(body, signature)
  } catch (e) {
    // console.log(e.stack)
    return new Response('Error', { status: 500 })
  }
  if (!isSignatureValid) {
    return new Response('invalid token', { status: 401 })
  } else {
    let json = JSON.parse(body)
    let name = json.from.name

    return new Response(
      `{"type": "message","text": "Hey ${name}, this is a reply from a Cloudflare Worker!"}`,
      {
        headers: { 'content-type': 'application/json' },
      },
    )
  }
}
