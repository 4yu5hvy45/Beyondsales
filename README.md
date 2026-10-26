# Beyond Branding Pitch Playbook: setup guide

A small web app for finding, pitching and tracking leads with your partners.
It is plain HTML and JavaScript, with no build step and no server code.

## What's in the folder

| File | What it is | Do you edit it? |
| --- | --- | --- |
| `index.html` | The whole app | Only to change campaigns, prices or message wording |
| `config.js` | Your settings: Supabase keys, studio name | **Yes**, once |
| `leads.js` | The first 35 leads, used in local mode | No |
| `schema.sql` | Creates the shared database and loads the 35 leads | Run it once in Supabase |
| `README.md` | This guide | No |

## How it saves data: two modes

| | Local mode | Shared mode (Supabase) |
| --- | --- | --- |
| Setup | None. Works as soon as it's hosted | About 15 minutes, free |
| Who sees changes | Only the browser you used | Everyone you invite, live |
| Sign-in | None | Email link, invited people only |
| Good for | Trying it out, working alone | You plus partners |

The app picks the mode by itself. If `config.js` has Supabase keys it uses shared mode; if not, it uses local mode.

---

## Step 1: Put it online (5 minutes)

Pick one. All three are free for this size of site.

**GitHub Pages**
1. On github.com, create a new repository (for example `bb-playbook`). Public is needed for free Pages.
2. Click **Add file → Upload files**, select all five files together (`index.html`, `config.js`, `leads.js`, `schema.sql`, `README.md`), drop them in, and click **Commit changes**. Keep them at the top level, not in a subfolder.
3. Go to **Settings → Pages → Build and deployment**. Set Source to **Deploy from a branch**, Branch to **main**, folder to **/ (root)**, then **Save**.
4. After 1–2 minutes your app is live at `https://YOUR-USERNAME.github.io/bb-playbook/`.
5. Use that link as the Site URL and Redirect URL in Supabase (step 2.4).

Note: a public repo means anyone can read these files, including the 35 leads in `leads.js` and `schema.sql`. If that matters, delete those two from the repo after you've run `schema.sql` in Supabase. The app works without them in shared mode. Or use Netlify, which doesn't need a public repo.

**Netlify Drop**
1. Go to app.netlify.com/drop and sign in.
2. Drag the whole `playbook` folder onto the page.
3. You get a link like `random-name.netlify.app`. In **Site configuration → Change site name** you can rename it, for example to `bb-playbook`.

**Vercel**
1. Install the Vercel CLI, or use vercel.com → Add New → Project and upload the folder.
2. Framework preset: **Other**. No build command. Output directory: `.`

**Your own domain (for example `leads.thebeyondbranding.com`)**
Host on Netlify or Vercel first, then add the custom domain in their dashboard and create the CNAME record they show you at your domain registrar.

You now have the app running in **local mode**. To share it with partners, do step 2.

## Step 2: Set up the shared database (Supabase, about 15 minutes)

1. **Create a project.** Go to supabase.com, sign up and create a new project. Choose the region closest to most users (London `eu-west-2` suits UK and US partners). Save the database password somewhere safe.
2. **Create the table and load the leads.** Open **SQL Editor → New query**, paste the whole of `schema.sql` and press **Run**. You should see "Success". **Table Editor → leads** now shows 35 rows.
3. **Lock down sign-ups.** Go to **Authentication → Sign In / Providers**:
   - Keep **Email** on.
   - Turn **off** "Allow new users to sign up". Only people you invite can then get in.
4. **Tell Supabase where the app lives.** Go to **Authentication → URL Configuration**:
   - **Site URL**: your app link, for example `https://bb-playbook.netlify.app`.
   - **Redirect URLs**: add the same link.
5. **Copy your keys into `config.js`.** In **Project Settings → API**, copy:
   - **Project URL** into `supabaseUrl`
   - the **anon public** key into `supabaseAnonKey`

   The anon key is designed to sit in a website. The security rules in `schema.sql` mean it can't read anything until someone signs in.
6. **Re-upload the folder** (drag it onto Netlify Drop again, or redeploy on Vercel).
7. **Invite yourself and your partners.** Go to **Authentication → Users → Invite user** and enter their email. They get an email, click the link, and they're in. After that they sign in on the app's sign-in screen and receive a new link each time.

The badge in the top-right corner now says **Shared**.

### Who can do what

| Person | Can |
| --- | --- |
| Anyone with the link, not invited | See the sign-in screen only |
| Invited partner | See all leads, copy pitches, claim leads, change status and notes, add leads |
| You, in the Supabase dashboard | Everything above, plus delete leads, remove partners, export data |

To remove a partner: **Authentication → Users → … → Delete user**.

## Everyday use

- **Add leads:** use the **Find leads** tab → **Add a lead**. It scores the lead and picks the track for you.
- **Back up:** in Supabase, open **Table Editor → leads → Export → CSV**. In local mode, use **Export leads (JSON)** at the bottom of Find leads.
- **Bulk-add leads I research for you:** I give you an SQL file of `insert` lines. Paste it into the SQL Editor and press Run.
- **Delete a lead:** go to Supabase **Table Editor**, select the row and delete it. The app has no delete button, so a partner can't wipe a lead by accident.

## Changing campaigns, prices or messages

Open `index.html` in any text editor and search for `const CAMPAIGNS`. Each campaign has its hook, sample, offer prices, proof line and call questions. The message templates are just below, under `function messages`. Save the file and re-upload it.

## Moving local-mode work into shared mode

1. In local mode, click **Export leads (JSON)**.
2. Send me the file and I'll turn it into an SQL insert for Supabase.

## Troubleshooting

| You see | Fix |
| --- | --- |
| "This email hasn't been invited yet" | Invite that email in Supabase → Authentication → Users |
| The sign-in link opens the wrong site | Fix the Site URL and Redirect URLs (step 2.4) |
| "Couldn't load leads: permission denied" | Run `schema.sql` again. The security rules are missing |
| Partners don't see each other's changes straight away | They will after a refresh. For live updates, check that `schema.sql` step 3 ran (Database → Publications → `supabase_realtime` includes `leads`) |
| Badge says "Local" but you set up Supabase | `config.js` didn't upload, or a key has a typo |

## Privacy and email rules (short version)

- Store only business contact details: business emails, business phones and public Instagram handles.
- Cold emails need your business postal address and an opt-out line. The app adds both. Fill in your address in the lead panel once.
- In the UK, email limited companies, not sole traders. Respect every "no".
