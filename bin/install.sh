#!/usr/bin/bash

npm ci
# mv -f .env.frontend .env
npx supabase gen types typescript --project-id \"xasnhtflxlvxipgizzqv\" --schema public > types/supabase.ts
npm run build
