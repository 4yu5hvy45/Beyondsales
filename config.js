// Beyond Branding Pitch Playbook: settings
//
// Leave both values empty to run in LOCAL mode: the app works straight away, but
// changes are saved only in this browser (good for trying it out, or for one person).
//
// Fill both in to run in SHARED mode with Supabase: everyone you invite signs in by
// email and sees the same leads, claims and notes, live. See README.md, step 2.
//
// Where to find them: Supabase dashboard > Project Settings > API
//   supabaseUrl     = "Project URL"           e.g. https://abcdefgh.supabase.co
//   supabaseAnonKey = "anon public" API key   (safe to put in a website; your
//                                               row-level security rules protect the data)

window.BB_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",

  // Shown in email footers and the header. Change to your own.
  studioName: "Beyond Branding",
  studioSite: "thebeyondbranding.com",
  founderName: "Ayush"
};
