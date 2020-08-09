addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Converts base64 string to Uint8Array
 *
 * @param {string} base64 base64 string to convert
 * @returns {Uint8Array} Uint8Array representation of the provided base64 string
 * */
function base64ToUint8Array(base64) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
}

/**
 * Verifies HMAC signature provided by MS Teams
 *
 * @param {string} body incoming message text from MS Teams
 * @param {string} signature base64 string representation of HMAC signature from MS Teams
 * @returns {Promise<Boolean>} true/false depending on if the signature is valid
 * */
async function verifySignature(body, signature) {
  const secretBuf = base64ToUint8Array(SECRET) // SECRET is a Workers Secret

  // Removes 'HMAC ' prefix from the provided signature and then converts
  // the remaining base64 string to Uint8Array
  const sigBuf = base64ToUint8Array(signature ? signature.slice(5) : '')

  const msgBuf = new TextEncoder().encode(body)

  const key = await crypto.subtle.importKey(
    'raw',
    secretBuf,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  )

  return await crypto.subtle.verify('HMAC', key, sigBuf, msgBuf)
}

async function handleRequest(request) {
  let body = await request.text()
  let signature = request.headers.get('authorization')
  let isSignatureValid = false

  try {
    isSignatureValid = await verifySignature(body, signature)
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
