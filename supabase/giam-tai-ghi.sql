-- Giảm tải ghi: không ghi lại khi nội dung không đổi, để chỗ trống trong trang để cập nhật nhanh, dọn rác thường xuyên hơn.
-- Chưa chạy trên production: chạy trong SQL Editor của Supabase khi sẵn sàng.
alter table public.cs_saves set (fillfactor = 70, autovacuum_vacuum_scale_factor = 0.02, autovacuum_vacuum_threshold = 20, autovacuum_analyze_scale_factor = 0.05);
alter table public.cs_players set (fillfactor = 80, autovacuum_vacuum_scale_factor = 0.05, autovacuum_vacuum_threshold = 20);

create or replace function public.cs_save_game(p_token uuid, p_state jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid := public.cs_player(p_token);
begin
  if v_id is null then raise exception 'NOT_LOGGED_IN'; end if;
  insert into public.cs_saves (player_id, state, updated_at) values (v_id, coalesce(p_state, 'null'::jsonb), now())
  on conflict (player_id) do update set state = excluded.state, updated_at = now()
  where public.cs_saves.state is distinct from excluded.state;
end;
$$;

create or replace function public.cs_save_meta(p_token uuid, p_meta jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid := public.cs_player(p_token);
begin
  if v_id is null then raise exception 'NOT_LOGGED_IN'; end if;
  update public.cs_players set meta = coalesce(p_meta, '{}'::jsonb)
  where id = v_id and meta is distinct from coalesce(p_meta, '{}'::jsonb);
end;
$$;

-- Dọn các phiên đã hết hạn hoặc đã đăng xuất
delete from public.cs_sessions where expires_at < now();
