-- DELETED FROM THE SUPABASE
alter policy "Vendors can view weddings they're booked for"
on "public"."weddings"
to public
using (

78910
  (EXISTS ( SELECT 1
   FROM (vendor_bookings vb
     JOIN vendors v ON ((vb.vendor_id = v.id)))
  WHERE ((vb.wedding_id = weddings.id) AND (v.user_id = auth.uid()))))

);