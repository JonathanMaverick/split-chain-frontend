# Split Chain

![Split Chain](https://cdn.discordapp.com/attachments/874212623070162965/1402598522099994644/Split_Chain_upscaled.png?ex=68947f2a&is=68932daa&hm=3c39d29d5158296a135d24f1ddde843dc07a42768baa3f22330ff381b9cf4ebd& 'Split Chain')

## Problem

Splitting bills with friends after meals or group purchases is still unnecessarily tedious:

- Manual calculations from paper receipts are too slow and error prone.
- Tracking who owes what and who has paid is a constant hassle.
- Existing bill-splitting apps don’t integrate seamlessly with decentralized payments.

## Solution

`Split Chain` is a web-based DeFi app that simplifies group payments using `HBAR`, the native token of the Hedera network. It transforms any physical receipt into a collaborative, crypto-native transaction — allowing users to scan, split, and settle bills with friends seamlessly. Designed for speed, transparency, and fairness, Split Chain brings real-world expenses into the world of `Decentralized Finance (DeFi)`.

## How It Works

- Login with HashPack Wallet<br />
  Users connect their HashPack wallet to sign in. Their HBAR balance is instantly available.
- Receipt Scanning (OCR)<br />
  Upload a photo of your receipt. The system extracts the item names, prices, and other additional fees automatically.
- Editable Line Items<br />
  Users can review and correct item details.
- Real-Time Currency Conversion<br />
  Prices in the original currency are converted live to HBAR using current exchange rates, while still showing the original values for transparency.<br />
- Tag Friends by Wallet Address<br />
  Assign each item to one or more friends. Friends must be added first via a dedicated “Manage Friends” interface using their wallet addresses.
- Real-Time Notifications<br />
  Tagged friends receive instant alerts when a bill involves them. All users will also receive notifications about friend requests.
- Bill Overview<br />
  Users can track all bills they’ve created or are involved in — including payment statuses per participant.
- One-Click HBAR Payments<br />
  Tagged participants can pay their share directly using HBAR with just one click after wallet connection.

## Business Model

To promote ease of use, Split Chain `charges a small administrative fee` that is evenly divided among participants (excluding the bill creator). This ensures a free experience for the initiator and fair cost distribution.

## Unique Selling Proposition

Split Chain bridges the gap between real-world expenses and decentralized finance by combining smart receipt scanning, live currency conversion, and instant crypto payments — all in a single, seamless user flow. Unlike traditional split bill apps or general-purpose crypto wallets, Split Chain is tailored for collaborative, item-level splitting and HBAR-native payments with real-time notifications and transparency.


![Split Chain Preview](https://rcxelnfhvbqszzccltry.supabase.co/storage/v1/object/sign/logo/SplitChain.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MDYxNWEyMi0yMDRlLTQzYzMtYjgwNy1lYTllZGI1YjgzMTMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL1NwbGl0Q2hhaW4uZ2lmIiwiaWF0IjoxNzU0NDgwMTY4LCJleHAiOjE4NDkwODgxNjh9.UB4tRnH6QRBSE4RKgGaeq6GXEfwwiYKAx7Qq3M6IBL0)

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Lucide React, Client WebSocket
- Backend: Go — Gin Web Framework & Gorilla WebSocket
- OCR Engine: Google Gemini Flash API
- Crypto Exchange Rate: Binance API
- Database: MySQL
- Blockchain Platform: Hedera Hashgraph
- Wallet Integration: HashPack Wallet

## Future Roadmap

- Group Split<br />
  Pre-define friend groups for quick bill creation (e.g., "Lunch Squad", "Dorm Group").
- Payment Reminders & Expiry<br />
  Add deadlines for payment, with friendly reminders sent to participants who haven’t completed their payment.
- Mobile App Version<br />
  Native mobile version for easier scanning, notifications, and wallet connection on the go.
