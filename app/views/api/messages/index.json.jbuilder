json.array! @new_message do |message|
  json.content    message.content
  json.image      message.image.url
  json.date       message.created_at.in_time_zone('Asia/Tokyo').strftime("%Y/%m/%d(%a) %H:%M")
  json.user_name  message.user.name
  json.id         message.id
end
