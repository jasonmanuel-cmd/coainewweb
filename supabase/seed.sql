insert into services (id, title, slug, description, features, order_index)
values
  (
    'svc_structural_audit',
    'Structural Digital Audit',
    'structural-digital-audit',
    'Expose code violations, speed leaks, and schema failures impacting visibility.',
    '["Lighthouse extraction","Schema diagnostics","RedScreen summary"]'::jsonb,
    1
  ),
  (
    'svc_aeo_geo',
    'AEO / GEO Authority Systems',
    'aeo-geo-authority-systems',
    'Machine-readable authority architecture for modern AI recommendation layers.',
    '["Entity mapping","JSON-LD layering","Local authority reinforcement"]'::jsonb,
    2
  ),
  (
    'svc_conversion',
    'Conversion Rebuild',
    'conversion-rebuild',
    'Turn passive pages into extraction-driven lead systems with direct response flow.',
    '["Audit-first UX","High-intent forms","Follow-up workflow mapping"]'::jsonb,
    3
  )
on conflict (id) do update set
  title = excluded.title,
  slug = excluded.slug,
  description = excluded.description,
  features = excluded.features,
  order_index = excluded.order_index;

insert into case_studies (id, title, slug, summary, proof_points)
values
  (
    'cs_bakersfield_electrical',
    'BakersfieldElectrical.com',
    'bakersfield-electrical',
    'Proof-of-concept showing ranking and visibility recovery through structural fixes.',
    '["Performance stability improved on mobile","Schema integrity corrected","Lead quality improved via audit-first funnel"]'::jsonb
  )
on conflict (id) do update set
  title = excluded.title,
  slug = excluded.slug,
  summary = excluded.summary,
  proof_points = excluded.proof_points;

insert into site_settings (id, site_name, tagline, primary_cta, secondary_cta, brand_colors)
values
  (
    'default',
    'Chaotically Organized AI',
    'Sovereign Infrastructure Blueprint',
    'Run RedScreen Audit',
    'View Proof Pad',
    '{"background":"#060b0d","panel":"#10181d","accent":"#62ffad","text":"#dcffe8"}'::jsonb
  )
on conflict (id) do update set
  site_name = excluded.site_name,
  tagline = excluded.tagline,
  primary_cta = excluded.primary_cta,
  secondary_cta = excluded.secondary_cta,
  brand_colors = excluded.brand_colors;
