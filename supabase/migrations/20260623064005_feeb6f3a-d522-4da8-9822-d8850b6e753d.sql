CREATE TYPE public.cake_request_status AS ENUM ('Pending', 'Contacted', 'Accepted', 'Rejected');

CREATE TABLE public.cake_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone_number text NOT NULL,
  preferred_date date,
  reference_image_url text,
  notes text,
  status public.cake_request_status NOT NULL DEFAULT 'Pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.cake_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.cake_requests TO authenticated;
GRANT ALL ON public.cake_requests TO service_role;

ALTER TABLE public.cake_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a cake request"
  ON public.cake_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view cake requests"
  ON public.cake_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cake requests"
  ON public.cake_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cake requests"
  ON public.cake_requests FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_cake_requests_updated_at
  BEFORE UPDATE ON public.cake_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX cake_requests_created_at_idx ON public.cake_requests (created_at DESC);

-- Storage policies for cake-references bucket (bucket created via storage tool)
CREATE POLICY "Anyone can upload cake reference images"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'cake-references');

CREATE POLICY "Cake reference images are publicly readable"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'cake-references');
