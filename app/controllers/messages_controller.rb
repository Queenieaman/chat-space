class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params) # messageインスタンスの生成
    @message.user_id = current_user.id
    if @message.save #もしMessageインスタンスを保存できたら
      respond_to do |format|
        format.html { redirect_to group_messages_path (params[:group_id])}  # リクエストがHTML形式であればリダイレクト
        format.json     #リクエストがJson形式であればリダイレクト
      end
    else 
      flash[:notice] = "メッセージを入力してください"
      redirect_to group_messages_path(params[:group_id])
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group #Messageインスタンスにgroupのアソシエーションをつける
    @group = Group.find(params[:group_id])
  end
end
