# Naam Punya Seva

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- A devotional web app called "Naam Punya Seva" (Name, Merit, Service)
- Daily prayers section with a list of common Hindu prayers/shlokas (Gayatri Mantra, Hanuman Chalisa, etc.)
- Rituals section with step-by-step guides for common puja rituals (morning puja, aarti, etc.)
- Daily schedule / panchang-style calendar showing auspicious times (sunrise, sunset, puja times)
- Personal prayer tracker — users can mark prayers as completed for the day
- Favorites — save prayers or rituals to a personal list
- A beautifully themed UI with warm saffron/gold/red devotional colors, Sanskrit-style typography

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend:
   - Store prayers (title, text in Hindi/Sanskrit, translation, category)
   - Store rituals (title, steps, description, category)
   - Store daily schedule items (name, time, description)
   - Track user prayer completions (prayer ID, date)
   - Track user favorites (prayer or ritual IDs)

2. Frontend:
   - Landing/home page with today's date, greeting, and daily devotional highlight
   - Prayers page: browse and read prayers with completion toggle
   - Rituals page: step-by-step ritual guides
   - Schedule page: today's puja schedule with times
   - Favorites page: bookmarked prayers/rituals
   - Warm saffron/gold devotional color theme, om symbol, lotus motifs

## UX Notes
- Warm, sacred aesthetic: saffron (#FF6B00), gold (#D4AF37), deep red (#8B0000), cream background
- Large readable text for Sanskrit/Hindi content
- Simple navigation with bottom tab or sidebar
- Mobile-friendly layout
- Soft card UI with gentle shadows, rounded corners
