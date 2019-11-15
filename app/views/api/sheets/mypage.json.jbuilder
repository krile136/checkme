today = Time.now

json.array! @sheets do |sheet|
  json.id sheet.id
  json.title sheet.title
  json.is_public sheet.is_public
  json.is_cooperate sheet.is_cooperate
  json.is_secret sheet.is_secret
  json.is_pulled sheet.is_pulled
  json.pulling_number sheet.pulling_number
  json.last_view sheet.get_request_last_view(today)
  json.author "自分"
  json.requests sheet.cooperate_requests
end