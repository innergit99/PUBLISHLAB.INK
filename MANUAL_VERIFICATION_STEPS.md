
# Manual Verification Instructions: Niche Radar 2.0 (Phase 4)

## 1. Access the Dashboard
- Navigate to the main dashboard (http://localhost:3001).
- You should see the "Master Your Intent" hero section.

## 2. Navigate to Niche Radar
- Scroll down to the **"Core Publishing Factory"** section.
- Click on the **"Niche Radar"** card (Icon: Target/Red Gradient).
- *Alternatively*, if your intent is "Discover" or "Create", click the "Next Best Action" button if it recommends Niche Validation.

## 3. Verify the Interface (Visually)
- **Background**: Ensure the "Industrial Background" is rendering (dark slate color, animated grid/schematics).
- **Header**: "Niche Radar 2.0" should be visible with a globe icon showing "Global Scan".
- **Input Field**: A large glassmorphic input field.
- **Colors**: The primary accent should be Emerald Green (for 2.0 styling) or Red (if legacy parts remain, but we aimed for Emerald).

## 4. Run a Live Test
- Enter a query: `Cyberpunk Gardening`
- Click **"PING RADAR"**.
- Watch for:
    - Loading input animation (pulse).
    - Terminal logs appearing below the input (`[SCANNED_AMAZON_BS_NODES]`, etc.).

## 5. Verify the Report
- After ~3 seconds, the report section should slide up.
- **Verdict**: Should be "GO", "STOP", or "CAUTION".
- **Score**: A large number in a circle.
- **Grid**: 4 Metric Cards (Search Volume, Competition, Financial Matrix, Demand Signal).
- **Keywords**: A list of clickable keywords.
- **Aesthetic Gap**: Two text blocks describing the style vs the opportunity.

## 6. Copy Functionality
- Click on a Keyword.
- It should change to "COPIED" (green text).

## 7. Exit
- Use the back button or browser back to return to Dashboard.
