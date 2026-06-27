-- Status enum mirroring cake_requests
DO $$ BEGIN
  CREATE TYPE public.celebration_request_status AS ENUM ('Pending', 'Contacted', 'Accepted', 'Rejected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE public.celebration_requests (
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone_number text NOT NULL,
  event_type text NOT NULL,
  event_date date,
  guest_count integer,
  special_requirements text,
  status public.celebration_request_status NOT NULL DEFAULT 'Pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.celebration_requests TO authenticated;
GRANT INSERT ON public.celebration_requests TO anon;
GRANT ALL ON public.celebration_requests TO service_role;

ALTER TABLE public.celebration_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a celebration request"
  ON public.celebration_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view celebration requests"
  ON public.celebration_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update celebration requests"
  ON public.celebration_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete celebration requests"
  ON public.celebration_requests FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_celebration_requests_updated_at
  BEFORE UPDATE ON public.celebration_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX celebration_requests_created_at_idx ON public.celebration_requests (created_at DESC);
CREATE INDEX celebration_requests_status_idx ON public.celebration_requests (status);