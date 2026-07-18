# InstaSleuth

Upload your Instagram data export and see what's actually in it — who doesn't follow you back, who followed you first, your biggest fans, and more. Nothing is stored. Your file is processed and discarded the moment your results are returned.

<img width="1427" height="484" alt="InstaSleuth dashboard" src="https://github.com/user-attachments/assets/86040980-b5a1-404e-8f0a-bf5f16a85b5e" />

## Features

- **Not following back / doesn't follow you** — a filterable, searchable breakdown of your connections
- **Follow-first leaderboard** — see which mutuals you followed first, and which followed you first, ranked by the gap
- **Profile overview** — name, username, follower/following counts, pulled straight from your export
- **Zero data retention** — uploads are processed in a temporary, isolated directory that's deleted immediately after your request completes

## How it works

1. Request your data export from Instagram (Accounts Center → Your information and permissions → Export your information → JSON format)
2. Upload the zip to InstaSleuth
3. The backend extracts only the specific files it needs, parses them, and returns your results
4. Everything from that request — the zip, the extracted files, the parsed data — is deleted once the response is sent

No account. No login. No database.

## Tech stack

**Backend:** Python, FastAPI
**Frontend:** Astro, React, TypeScript, Tailwind CSS
**Hosting:** Cloudflare Pages (frontend), Render (backend)

## Running it locally

**Backend**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Copy `.env.example` to `.env` in `frontend/` and set `PUBLIC_API_URL` to your local backend URL.


## Privacy

InstaSleuth doesn't require an account, doesn't retain uploaded data after a request completes, and doesn't sell or share any data with third parties. Full details in [PRIVACY.md](./privacy) or on the [privacy page](https://instasleuth.pages.dev/privacy).

## Contributing

Issues and pull requests are welcome. This is a solo project built to learn and to be genuinely useful — if you find a bug or have an idea, open an issue.

## License

MIT License
