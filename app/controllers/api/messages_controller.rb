class Api::MessagesController < ApplicationController
  #::はnamespace。rubyのクラスをつなげる
  def index
    @group = Group.find(params[:group_id])
    #Groupモデルからgroup.idを見つけてGroup変数にいれる
    respond_to do |format|
      format.html
      format.json { @new_message = @group.messages.includes(:user).where('id > ?', params[:id]) }
      #メッセージ変数の中でidがあるものについてをnewmessage変数にいれる
    end
  end
end
