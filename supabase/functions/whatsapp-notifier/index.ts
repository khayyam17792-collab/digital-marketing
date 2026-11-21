import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info, x-zentro-worker-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

type Configuration = {
  enabled: boolean
  missingConfig: string[]
  supabaseUrl: string
  anonKey: string
  serviceRoleKey: string
  phoneNumberId: string
  accessToken: string
  recipient: string
  templateName: string
  templateLanguage: string
  graphApiVersion: string
  workerSecret: string
  webhookVerifyToken: string
  metaAppSecret: string
}

type ClaimedNotification = {
  notification_id: string
  inquiry_id: string
  attempt_count: number
}

type Inquiry = {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string | null
  company_name: string | null
  service_required: string
  project_budget: string | null
  project_details: string
}

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status, headers: corsHeaders })
}

function configuration(): Configuration {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? ""
  const anonKey =
    Deno.env.get("SUPABASE_ANON_KEY") ??
    Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ??
    ""
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  const phoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") ?? ""
  const accessToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN") ?? ""
  const recipient = Deno.env.get("WHATSAPP_RECIPIENT") ?? ""
  const templateName = Deno.env.get("WHATSAPP_TEMPLATE_NAME") ?? ""
  const templateLanguage = Deno.env.get("WHATSAPP_TEMPLATE_LANGUAGE") ?? ""
  const graphApiVersion = Deno.env.get("WHATSAPP_GRAPH_API_VERSION") ?? ""
  const workerSecret = Deno.env.get("ZENTRO_WHATSAPP_WORKER_SECRET") ?? ""
  const webhookVerifyToken = Deno.env.get("WHATSAPP_WEBHOOK_VERIFY_TOKEN") ?? ""
  const metaAppSecret = Deno.env.get("META_APP_SECRET") ?? ""
  const hasRecipientOptIn =
    Deno.env.get("WHATSAPP_RECIPIENT_OPT_IN")?.toLowerCase() === "true"

  const missingConfig: string[] = []
  if (!supabaseUrl) missingConfig.push("SUPABASE_URL")
  if (!anonKey) missingConfig.push("SUPABASE_ANON_KEY")
  if (!serviceRoleKey) missingConfig.push("SUPABASE_SERVICE_ROLE_KEY")
  if (!phoneNumberId || !/^\d+$/.test(phoneNumberId)) {
    missingConfig.push("WHATSAPP_PHONE_NUMBER_ID")
  }
  if (!accessToken) missingConfig.push("WHATSAPP_ACCESS_TOKEN")
  if (!/^\+?\d{8,15}$/.test(recipient)) {
    missingConfig.push("WHATSAPP_RECIPIENT")
  }
  if (!/^[a-z0-9_]{1,512}$/.test(templateName)) {
    missingConfig.push("WHATSAPP_TEMPLATE_NAME")
  }
  if (!/^[a-z]{2,3}(?:_[A-Z]{2})?$/.test(templateLanguage)) {
    missingConfig.push("WHATSAPP_TEMPLATE_LANGUAGE")
  }
  if (!/^v\d+\.\d+$/.test(graphApiVersion)) {
    missingConfig.push("WHATSAPP_GRAPH_API_VERSION")
  }
  if (!workerSecret) missingConfig.push("ZENTRO_WHATSAPP_WORKER_SECRET")
  if (!webhookVerifyToken) missingConfig.push("WHATSAPP_WEBHOOK_VERIFY_TOKEN")
  if (!metaAppSecret) missingConfig.push("META_APP_SECRET")
  if (!hasRecipientOptIn) missingConfig.push("WHATSAPP_RECIPIENT_OPT_IN")

  return {
    enabled: missingConfig.length === 0,
    missingConfig,
    supabaseUrl,
    anonKey,
    serviceRoleKey,
    phoneNumberId,
    accessToken,
    recipient: recipient.replace(/^\+/, ""),
    templateName,
    templateLanguage,
    graphApiVersion,
    workerSecret,
    webhookVerifyToken,
    metaAppSecret,
  }
}

function serviceClient(config: Configuration) {
  return createClient(config.supabaseUrl, config.serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

function normalizeText(value: string | null | undefined, maxLength: number) {
  const normalized = (value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
  return normalized || "Not provided"
}

function templateParameters(inquiry: Inquiry) {
  const receivedDate = new Date(inquiry.created_at)
  const received = Number.isNaN(receivedDate.valueOf())
    ? inquiry.created_at
    : receivedDate.toISOString()

  return [
    normalizeText(inquiry.full_name, 256),
    normalizeText(inquiry.email, 256),
    normalizeText(inquiry.phone, 256),
    normalizeText(inquiry.company_name, 256),
    normalizeText(inquiry.service_required, 256),
    normalizeText(inquiry.project_budget, 256),
    normalizeText(inquiry.project_details, 900),
    normalizeText(received, 256),
  ].map((text) => ({ type: "text", text }))
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isDeliveryStatus(
  value: unknown,
): value is "sent" | "delivered" | "read" | "failed" {
  return value === "sent" || value === "delivered" || value === "read" || value === "failed"
}

function webhookErrorDetails(event: Record<string, unknown>) {
  const errors = Array.isArray(event.errors) ? event.errors : []
  const firstError = errors.find(isRecord)
  if (!firstError) return null

  const errorData = isRecord(firstError.error_data) ? firstError.error_data : {}
  const parts = [firstError.title, errorData.details].filter(
    (part): part is string => typeof part === "string" && part.length > 0,
  )
  return parts.join(": ").slice(0, 1000) || null
}

async function handleWhatsAppWebhook(request: Request, config: Configuration) {
  const signature = request.headers.get("x-hub-signature-256") ?? ""
  const signatureMatch = /^sha256=([0-9a-f]{64})$/i.exec(signature)
  if (!config.metaAppSecret || !signatureMatch) {
    return jsonResponse({ error: "Webhook signature is invalid." }, 401)
  }

  const rawBody = await request.text()
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(config.metaAppSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const digest = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody)),
  )
  const expectedSignature = Array.from(digest, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("")
  if (!secretsMatch(signatureMatch[1].toLowerCase(), expectedSignature)) {
    return jsonResponse({ error: "Webhook signature is invalid." }, 401)
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return jsonResponse({ error: "Webhook payload is invalid." }, 400)
  }
  if (!isRecord(payload) || !Array.isArray(payload.entry)) {
    return jsonResponse({ received: true })
  }

  const client = serviceClient(config)
  for (const entry of payload.entry) {
    if (!isRecord(entry) || !Array.isArray(entry.changes)) continue
    for (const change of entry.changes) {
      if (!isRecord(change) || !isRecord(change.value)) continue
      const statuses = Array.isArray(change.value.statuses) ? change.value.statuses : []
      for (const event of statuses) {
        if (
          !isRecord(event) ||
          typeof event.id !== "string" ||
          !isDeliveryStatus(event.status)
        ) {
          continue
        }

        const timestamp = Number(event.timestamp)
        const occurredAt = Number.isFinite(timestamp) && timestamp > 0
          ? new Date(timestamp * 1000).toISOString()
          : new Date().toISOString()
        const errorDetails = webhookErrorDetails(event)
        const { error: insertError } = await client
          .from("whatsapp_delivery_events")
          .upsert(
            {
              provider_message_id: event.id,
              delivery_status: event.status,
              occurred_at: occurredAt,
              error_details: errorDetails,
            },
            {
              onConflict: "provider_message_id,delivery_status,occurred_at",
              ignoreDuplicates: true,
            },
          )
        if (insertError) {
          console.error("Could not store WhatsApp delivery event.", insertError)
          return jsonResponse({ error: "Could not store delivery status." }, 500)
        }

        const { error: applyError } = await client.rpc(
          "apply_zentro_whatsapp_delivery_event",
          {
            p_provider_message_id: event.id,
            p_delivery_status: event.status,
            p_event_at: occurredAt,
            p_error_details: errorDetails,
          },
        )
        if (applyError) {
          console.error("Could not apply WhatsApp delivery event.", applyError)
          return jsonResponse({ error: "Could not apply delivery status." }, 500)
        }
      }
    }
  }

  return jsonResponse({ received: true })
}

async function applyStoredDeliveryEvents(
  client: ReturnType<typeof serviceClient>,
  providerMessageId: string,
) {
  const { data: events, error } = await client
    .from("whatsapp_delivery_events")
    .select("delivery_status,occurred_at,error_details")
    .eq("provider_message_id", providerMessageId)
    .order("occurred_at", { ascending: true })
  if (error) throw error

  const priority = { sent: 0, delivered: 1, read: 2, failed: 3 }
  const orderedEvents = (events ?? []).sort(
    (left, right) =>
      new Date(left.occurred_at).valueOf() - new Date(right.occurred_at).valueOf() ||
      priority[left.delivery_status] - priority[right.delivery_status],
  )

  for (const event of orderedEvents) {
    const { error: applyError } = await client.rpc(
      "apply_zentro_whatsapp_delivery_event",
      {
        p_provider_message_id: providerMessageId,
        p_delivery_status: event.delivery_status,
        p_event_at: event.occurred_at,
        p_error_details: event.error_details,
      },
    )
    if (applyError) throw applyError
  }
}

async function sendWhatsApp(config: Configuration, inquiry: Inquiry) {
  const response = await fetch(
    `https://graph.facebook.com/${config.graphApiVersion}/${config.phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: config.recipient,
        type: "template",
        template: {
          name: config.templateName,
          language: { code: config.templateLanguage },
          components: [
            {
              type: "body",
              parameters: templateParameters(inquiry),
            },
          ],
        },
      }),
    },
  )

  const result = await response.json().catch(() => null)
  if (!response.ok) {
    const apiMessage =
      typeof result?.error?.message === "string"
        ? result.error.message.slice(0, 1000)
        : `WhatsApp API returned HTTP ${response.status}.`
    throw new Error(apiMessage)
  }

  const messageId = result?.messages?.[0]?.id
  if (typeof messageId !== "string" || !messageId) {
    throw new Error("WhatsApp API accepted no message ID in its response.")
  }
  return messageId
}

async function processQueue(config: Configuration, batchSize = 10) {
  const client = serviceClient(config)
  const { data: claimed, error: claimError } = await client.rpc(
    "claim_zentro_whatsapp_notifications",
    { batch_size: batchSize },
  )
  if (claimError) throw claimError

  const notifications = (claimed ?? []) as ClaimedNotification[]
  if (notifications.length === 0) {
    return { processed: 0, sent: 0, failed: 0 }
  }

  const inquiryIds = notifications.map((item) => item.inquiry_id)
  const { data: inquiries, error: inquiryError } = await client
    .from("inquiries")
    .select(
      "id,created_at,full_name,email,phone,company_name,service_required,project_budget,project_details",
    )
    .in("id", inquiryIds)

  const inquiryById = new Map(
    ((inquiries ?? []) as Inquiry[]).map((inquiry) => [inquiry.id, inquiry]),
  )
  let sent = 0
  let failed = 0

  for (const notification of notifications) {
    let inquiry: Inquiry | undefined
    try {
      if (inquiryError) throw inquiryError
      inquiry = inquiryById.get(notification.inquiry_id)
      if (!inquiry) throw new Error("The associated inquiry could not be loaded.")
    } catch (error) {
      const deliveryError =
        error instanceof Error ? error.message.slice(0, 1000) : "Unknown delivery error."
      const { error: updateError } = await client
        .from("whatsapp_notifications")
        .update({
          status: "failed",
          delivery_status: "failed",
          last_error: deliveryError,
          processing_started_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", notification.notification_id)
      if (updateError) console.error("Could not persist WhatsApp failure.", updateError)
      failed += 1
      continue
    }

    let providerMessageId: string
    try {
      providerMessageId = await sendWhatsApp(config, inquiry)
    } catch (error) {
      const deliveryError =
        error instanceof Error ? error.message.slice(0, 1000) : "Unknown delivery error."
      const { error: updateError } = await client
        .from("whatsapp_notifications")
        .update({
          status: "failed",
          delivery_status: "failed",
          last_error: deliveryError,
          processing_started_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", notification.notification_id)
      if (updateError) console.error("Could not persist WhatsApp failure.", updateError)
      failed += 1
      continue
    }

    const { error: updateError } = await client
      .from("whatsapp_notifications")
      .update({
        status: "sent",
        delivery_status: "accepted",
        provider_message_id: providerMessageId,
        delivery_status_updated_at: null,
        last_error: null,
        processing_started_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", notification.notification_id)

    if (updateError) {
      console.error("Could not persist accepted WhatsApp delivery.", updateError)
      failed += 1
      continue
    }

    try {
      await applyStoredDeliveryEvents(client, providerMessageId)
    } catch (error) {
      console.error("Could not reconcile early WhatsApp delivery events.", error)
    }
    sent += 1
  }

  return { processed: notifications.length, sent, failed }
}

function secretsMatch(candidate: string, expected: string) {
  if (candidate.length !== expected.length) return false
  let difference = 0
  for (let index = 0; index < candidate.length; index += 1) {
    difference |= candidate.charCodeAt(index) ^ expected.charCodeAt(index)
  }
  return difference === 0
}

async function verifyAdministrator(request: Request, config: Configuration) {
  const authorization = request.headers.get("authorization")
  if (!authorization?.startsWith("Bearer ")) return "unauthenticated"

  const client = createClient(config.supabaseUrl, config.anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { data: userData, error: userError } = await client.auth.getUser()
  if (userError || !userData.user) return "unauthenticated"

  const { data: isAdmin, error: adminError } = await client.rpc("is_zentro_admin")
  if (adminError) {
    console.error("Could not verify ZENTRO administrator access.", adminError)
    return "verification-error"
  }
  return isAdmin === true ? "authorized" : "forbidden"
}

Deno.serve(async (request) => {
  const config = configuration()

  if (request.method === "GET") {
    const url = new URL(request.url)
    const mode = url.searchParams.get("hub.mode") ?? ""
    const token = url.searchParams.get("hub.verify_token") ?? ""
    const challenge = url.searchParams.get("hub.challenge")
    if (
      mode === "subscribe" &&
      config.webhookVerifyToken &&
      secretsMatch(token, config.webhookVerifyToken) &&
      challenge
    ) {
      return new Response(challenge, { headers: corsHeaders })
    }
    return jsonResponse({ error: "Webhook verification failed." }, 403)
  }
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405)

  if (request.headers.has("x-hub-signature-256")) {
    return await handleWhatsAppWebhook(request, config)
  }
  let parsedBody: unknown
  try {
    parsedBody = await request.json()
  } catch {
    return jsonResponse({ error: "A valid JSON request body is required." }, 400)
  }
  if (
    typeof parsedBody !== "object" ||
    parsedBody === null ||
    Array.isArray(parsedBody)
  ) {
    return jsonResponse({ error: "A JSON object is required." }, 400)
  }
  const action =
    "action" in parsedBody && typeof parsedBody.action === "string"
      ? parsedBody.action
      : ""
  const notificationId =
    "notificationId" in parsedBody && typeof parsedBody.notificationId === "string"
      ? parsedBody.notificationId
      : ""

  if (action === "process") {
    const workerSecret = request.headers.get("x-zentro-worker-secret") ?? ""
    if (
      !config.workerSecret ||
      !secretsMatch(workerSecret, config.workerSecret)
    ) {
      return jsonResponse({ error: "Unauthorized worker request." }, 401)
    }
    if (!config.enabled) {
      return jsonResponse(
        { error: "WhatsApp notifications are not configured.", missingConfig: config.missingConfig },
        503,
      )
    }

    try {
      return jsonResponse(await processQueue(config))
    } catch (error) {
      console.error("Could not process the WhatsApp notification queue.", error)
      return jsonResponse({ error: "Could not process the notification queue." }, 500)
    }
  }

  const adminAccess = await verifyAdministrator(request, config)
  if (adminAccess === "unauthenticated") {
    return jsonResponse({ error: "Authentication required." }, 401)
  }
  if (adminAccess === "forbidden") {
    return jsonResponse({ error: "Administrator access required." }, 403)
  }
  if (adminAccess === "verification-error") {
    return jsonResponse({ error: "Administrator access could not be verified." }, 500)
  }

  if (action === "status") {
    return jsonResponse({
      enabled: config.enabled,
      missingConfig: config.missingConfig,
    })
  }

  if (action === "retry" && notificationId) {
    if (!config.enabled) {
      return jsonResponse({
        retried: false,
        error: "WhatsApp notifications are not configured.",
        missingConfig: config.missingConfig,
      })
    }

    const client = serviceClient(config)
    const { data: notification, error: fetchError } = await client
      .from("whatsapp_notifications")
      .select("id,status")
      .eq("id", notificationId)
      .maybeSingle()
    if (fetchError) {
      console.error("Could not load WhatsApp notification for retry.", fetchError)
      return jsonResponse({ error: "Could not load this notification." }, 500)
    }
    if (!notification) return jsonResponse({ error: "Notification not found." }, 404)
    if (notification.status !== "failed") {
      return jsonResponse(
        { error: "Only failed notifications can be retried.", status: notification.status },
        409,
      )
    }

    const { data: reset, error: resetError } = await client
      .from("whatsapp_notifications")
      .update({
        status: "pending",
        delivery_status: "pending",
        provider_message_id: null,
        delivery_status_updated_at: null,
        delivered_at: null,
        last_error: null,
        processing_started_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", notification.id)
      .eq("status", "failed")
      .select("id")
      .maybeSingle()
    if (resetError) {
      console.error("Could not queue WhatsApp notification retry.", resetError)
      return jsonResponse({ error: "Could not queue this retry." }, 500)
    }
    if (!reset) {
      return jsonResponse({ error: "This notification changed before it could be retried." }, 409)
    }

    return jsonResponse({ retried: true, status: "pending" })
  }

  return jsonResponse({ error: "Unsupported action." }, 400)
})
