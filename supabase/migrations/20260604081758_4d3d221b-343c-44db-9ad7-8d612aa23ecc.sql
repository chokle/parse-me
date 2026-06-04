
CREATE TABLE public.intake_docs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  source text NOT NULL,
  status text NOT NULL DEFAULT 'in_review',
  fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  note text,
  reviewer_name text,
  reviewer_email text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz
);

CREATE TABLE public.audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_id uuid NOT NULL REFERENCES public.intake_docs(id) ON DELETE CASCADE,
  at timestamptz NOT NULL DEFAULT now(),
  actor_name text NOT NULL,
  actor_email text NOT NULL,
  action text NOT NULL,
  detail text,
  note text,
  bulk boolean NOT NULL DEFAULT false,
  field_key text,
  field_label text,
  before_value text,
  after_value text
);

CREATE INDEX audit_events_doc_id_idx ON public.audit_events(doc_id);
CREATE INDEX intake_docs_submitted_at_idx ON public.intake_docs(submitted_at DESC);

GRANT ALL ON public.intake_docs TO service_role;
GRANT ALL ON public.audit_events TO service_role;

ALTER TABLE public.intake_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
