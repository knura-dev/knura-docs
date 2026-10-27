---
title: At home or a hosted account
description: The two ways to run Knura, and what each one needs.
---

Every tap has to be checked by a server that holds your tags' keys. You choose where that server runs: on a computer you own, or in a hosted account that runs it for you.

| | At home | Hosted account |
| --- | --- | --- |
| Who checks taps | knurd, on your computer | The hosted service |
| Where the keys live | `knurd.properties` on your computer | Encrypted in the hosted service, never shown to anyone |
| What you need | A computer that stays on, Java 21, a way for phones to reach it (such as Tailscale Funnel) | A sign-in. No computer needed |
| Set tags up with | A USB NFC reader and `knurctl`, or the Android app | The Android app |
| Actions | Webhooks, Home Assistant, Matter | Cloud webhooks, plus everything at home through the home link |
| Cost | Free and open source | Free plan, or a paid plan for more tags |

## Pick at home if

- You want everything on your own hardware, with nothing in between.
- You already run a home server, a Raspberry Pi or Home Assistant.
- You're happy to keep one program running and reachable from the internet.

Start with [Your first verified tap](/start-here/first-verified-tap).

## Pick a hosted account if

- You don't want to keep a computer on or open it to the internet.
- You want a dashboard for naming tags, choosing actions and seeing taps.
- You want webhooks to services like IFTTT or Zapier without running anything.

You can still run actions at home with a hosted account: the home link is a small program that connects out to your account and runs your Home Assistant, Matter and webhook rules locally, with no ports to open.

:::note
Hosted accounts aren't open to everyone yet. Running Knura at home works today.
:::

## Can I switch later?

Yes. Tags that use the tap.knura.io link can move between your own server and a hosted account without being rewritten. Tags whose link points straight at your own address need to be set up again after a move.
