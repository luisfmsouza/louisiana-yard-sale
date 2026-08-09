---
name: announce-yard-sale-product
description: >-
  Identify new yard-sale products from photos, research exact brand/model and
  retail price, then add them to src/app/data.json with matching images in
  public/img. Use when the user drops product photos, asks to announce or add
  items to the garage sale, or update listings from product images.
---

# Announce yard-sale product

Add one or more products to Luis & Ana's garage sale from photos.

## When this runs

User sends product photo(s) (and optionally a custom asking price, condition notes, or pickup timing). Complete research + `data.json` update before asking for more input unless brand/model is ambiguous.

## Workflow checklist

Copy and track per product:

```
- [ ] 1. Identify product from image
- [ ] 2. Confirm exact brand + model online
- [ ] 3. Find retail link with visible price
- [ ] 4. Draft name, originalPrice, price (50% default), details
- [ ] 5. Place/rename image under public/img
- [ ] 6. Append entry to src/app/data.json
- [ ] 7. Verify image ↔ product match
```

### 1. Check the image

- Open/read each photo and describe what you see (category, distinctive marks, labels, color, set count).
- Prefer text on packaging/labels over guesses.
- If multiple photos likely refer to the same item, treat as one product; if different items, process separately.

### 2. Search for exact brand and model

- Web-search using visual clues + any readable text.
- Prefer Spanish retail results when the item was likely bought in Spain/EU (`amazon.es`, brand/official EU sites, Ikea ES, El Corte Inglés, Decathlon ES, etc.).
- Confirm **brand and model exactly** (not a similar SKU). Note size/color/variant when it changes the product page.

If uncertain between two models, stop and ask the user with the two candidates and why.

### 3. Retail link (price must be visible)

- Prefer: official brand/store page, then Amazon (`.es` when possible), then other major retailers.
- The link **must show a current retail price** on the page (used as `originalPrice`).
- Avoid marketplace listings with no clear price, expired deals, or wrong variant.

### 4. Fields to collect

| Field | Rule |
| --- | --- |
| `name` | Short display name; include brand/model. Style like existing entries (`"Ikea TROTTEN - Standing desk"`, `"Instant Pot Duo - Pressure Cooker"`). |
| `url` | Retail link from step 3. |
| `imageUrl` | `/img/<snake_case_filename>.jpeg` (or existing extension). |
| `originalPrice` | Numeric EUR from the retail page (no currency symbol). |
| `price` | Asking/sale price in EUR. **Default: 50% of `originalPrice`** (round to a sensible cent/euro, e.g. `199.99` → `100`). Only use a lower price when the user explicitly asks for a bigger discount. |
| `details` | **2–3** short bullets from product info / condition (size, key features, box, pickup). Keep terse like existing entries. |
| `state` | `"available"` unless user says otherwise. |
| `purchaser` | `"id"` for new listings. |

### 5. Image file

- Save user photos into `public/img/` with a descriptive `snake_case` name matching the product (`trotten_standing_desk.jpeg`, `wine_glasses_65cl.jpeg`).
- If the user already placed the file, reuse/rename so `imageUrl` matches the real path.
- One product → one primary image; do not point two products at the same unrelated photo.

### 6. Update `src/app/data.json`

- Append a new object matching the schema of existing entries.
- Keep valid JSON (trailing commas, quotes).
- Default: add new items at the **top** of the array (newest first), unless the user asks for a different order.
- Do not change unrelated products.

Example shape:

```json
{
  "name": "Ikea TROTTEN - Standing desk",
  "url": "https://www.ikea.com/es/es/p/trotten-escritorio-elevable-blanco-s99429578/",
  "imageUrl": "/img/trotten_standing_desk.jpeg",
  "originalPrice": 189,
  "price": 95,
  "details": ["120 x 70 cm", "Sit/stand - manual crank", "White"],
  "state": "available",
  "purchaser": "id"
}
```

### 7. Verify alignment

Before finishing:

- Re-read the image and confirm it matches the named product/variant.
- Confirm `imageUrl` file exists under `public/img/`.
- Confirm `url` is the correct variant and shows a price close to `originalPrice`.
- Summarize for the user: name, retail link, originalPrice, asking price (50% by default), and the details bullets.

## Pricing strategy

- **Default asking price = 50% of `originalPrice`.** Apply this automatically; do not ask the user for a sale price on every item.
- Round half prices sensibly for display (prefer whole euros when the half is `.995`/near-integer; otherwise keep two decimals when that matches how other listings look).
- If the user requests a **bigger discount** (or any custom `price`), use that instead of 50%.
- Do not invent steeper discounts on your own.

## Ambiguity rules

- **Wrong/unclear photo**: ask for another angle or brand/model text from the label.
- **No priced retail page found**: report best candidates; do not invent `originalPrice`.

## Out of scope

- Do not redesign the page UI.
- Do not mark items sold/reserved unless asked.
- Do not commit or push unless the user asks.
