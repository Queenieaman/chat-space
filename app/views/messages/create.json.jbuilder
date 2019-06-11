json.(@message, :content, :image)
json.id         @message.id
json.content    @message.content 
json.date       @message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
json.user_name  @message.user.name
json.image      @message.image.url
json.created_at @message.created_at

