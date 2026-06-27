
-- Drop overly permissive storage policies
DROP POLICY IF EXISTS "Anyone can upload cake reference images" ON storage.objects;
DROP POLICY IF EXISTS "Cake reference images are publicly readable" ON storage.objects;

-- INSERT: anyone may upload to cake-references, root-only, image extensions only
CREATE POLICY "Public can upload cake references (root only, images)"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'cake-references'
  AND position('/' in name) = 0
  AND lower(name) ~ '\.(jpg|jpeg|png|webp)$'
);

-- SELECT: admins only. Admin UI uses createSignedUrl which works with this.
CREATE POLICY "Admins can read cake references"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'cake-references'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can update cake references"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'cake-references'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'cake-references'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can delete cake references"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'cake-references'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Restrict has_role EXECUTE
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
